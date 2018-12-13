import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { isArray } from 'cmn-utils/lib/utils';
const ROOT = 'antui-print-container';
/**
 * 打印页面中的指定组件，
 * fork自：
 *   https://github.com/gregnb/react-to-print
 *   https://github.com/jasonday/printThis
 */
class Print extends PureComponent {
  static propTypes = {
    content: PropTypes.any.isRequired, // 可以是 string | React组件 | DOM 元素
    trigger: PropTypes.node, // print controller area
    debug: PropTypes.bool, // debug
    doctypeString: PropTypes.string, // enter a different doctype for older markup
    importCSS: PropTypes.bool, // import parent page css
    importStyle: PropTypes.bool, // import style tags
    pageTitle: PropTypes.string, // add title to print page
    loadCSS: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // path to additional css file - use an array [] for multiple
    formValues: PropTypes.bool, // preserve input/form values
    removeScripts: PropTypes.bool, // remove script tags from print content
    beforePrint: PropTypes.func, // function called before iframe is filled
    afterPrint: PropTypes.func, // function called before iframe is removed
    printDelay: PropTypes.number, //
    canvas: PropTypes.bool // copy canvas content
  };

  static defaultProps = {
    debug: false,
    trigger: <button>打印</button>,
    doctypeString: '<!DOCTYPE html>',
    importCSS: true,
    importStyle: true,
    pageTitle: '',
    loadCSS: '',
    formValues: true,
    removeScripts: false,
    beforePrint: null,
    afterPrint: null,
    printDelay: 333,
    canvas: false
  };

  constructor(props) {
    super();
    this.container = this.createContainer(props);
    this.iframe = this.createFrame(props);
  }

  componentDidMount() {
    this.normalElement();
  }

  componentDidUpdate(prevProps, prevState) {
    this.normalElement();
  }

  componentWillUnmount() {
    // remove iframe after print
    this.iframe.parentNode.removeChild(this.iframe);
  }

  normalElement = () => {
    const { content } = this.props;

    if (typeof content === 'string') {
      // html string
      this.element = document.createElement('div');
      this.element.innerHTML = content;
    } else if (content instanceof Element) {
      // real dom element
      this.element = content;
    } else if (
      !React.isValidElement(content) &&
      ReactDOM.findDOMNode(content)
    ) {
      this.element = ReactDOM.findDOMNode(content);
    }
  };

  /**
   * create container
   */
  createContainer = props => {
    let container = document.querySelector('#' + ROOT);
    if (container) return container;
    else {
      container = document.createElement('div');
      container.id = ROOT;
      document.body.appendChild(container);
      if (!props.debug) {
        assign(container.style, {
          position: 'absolute',
          width: '0px',
          height: '0px',
          left: '-600px',
          top: '-600px',
          overflow: 'hidden'
        });
      }
      return container;
    }
  };

  /**
   * create print iframe
   */
  createFrame = props => {
    const strFrameName = 'printThis-' + new Date().getTime();

    let printI = document.createElement('iframe');
    printI.name = 'printIframe';
    printI.id = strFrameName;

    if (
      window.location.hostname !== document.domain &&
      navigator.userAgent.match(/msie/i)
    ) {
      // Ugly IE hacks due to IE not inheriting document.domain from parent
      // checks if document.domain is set by comparing the host name against document.domain
      /* eslint-disable no-script-url, no-useless-concat */
      const iframeSrc =
        'javascript:document.write("<head><script>document.domain=\\"' +
        document.domain +
        '\\";</s' +
        'cript></head><body></body>")';
      printI.className = 'MSIE';
      printI.src = iframeSrc;
    }
    this.container.appendChild(printI);

    return printI;
  };

  // set html content for iframe
  setContent = () => {
    const {
      doctypeString,
      importCSS,
      importStyle,
      pageTitle,
      loadCSS,
      canvas,
      beforePrint
    } = this.props;
    if (doctypeString) {
      setDocType(this.iframe, doctypeString);
    }

    const doc =
      this.iframe.document || this.iframe.contentDocument || this.iframe;
    const head = doc.querySelector('head');
    const body = doc.querySelector('body');

    // import page stylesheets
    if (importCSS) {
      [].forEach.call(
        document.querySelectorAll('link[rel=stylesheet]'),
        item => {
          const href = item.getAttribute('href');
          if (href) {
            const media = item.getAttribute('media') || 'all';
            setLink(head, href, media);
          }
        }
      );
    }

    // import style tags
    if (importStyle) {
      [].forEach.call(document.querySelectorAll('style'), item => {
        head.appendChild(item.cloneNode(true));
      });
    }

    // add title of the page
    if (pageTitle) {
      const title = document.createElement('title');
      title.innerText(pageTitle);
      head.appendChild(title);
    }

    // import additional stylesheet(s)
    if (loadCSS) {
      if (isArray(loadCSS)) {
        loadCSS.forEach(item => {
          setLink(head, item);
        });
      } else {
        setLink(head, loadCSS);
      }
    }

    const pageHtml = document.querySelector('html');
    doc.querySelector('html').setAttribute('style', pageHtml.style.cssText);

    if (canvas) {
      // add canvas data-ids for easy access after cloning.
      let canvasId = 0;
      // .addBack('canvas') adds the top-level element if it is a canvas.
      [].forEach.call(this.element.querySelectorAll('canvas'), item => {
        item.setAttribute('data-printthis', canvasId++);
      });
    }

    appendBody(body, this.element, this.props);

    if (canvas) {
      // Re-draw new canvases by referencing the originals
      [].forEach.call(body.querySelectorAll('canvas'), item => {
        const cid = item.getAttribute('data-printthis');
        const src = document.querySelector('[data-printthis="' + cid + '"]');

        item.getContext('2d').drawImage(src, 0, 0);
        src.removeAttribute('data-printthis');
      });
    }

    // attach event handler function to beforePrint event
    function attachOnBeforePrintEvent(iframe, beforePrintHandler) {
      const win = iframe.contentWindow || iframe.contentDocument || iframe;

      if (typeof beforePrintHandler === 'function') {
        if ('matchMedia' in win) {
          win.matchMedia('print').addListener(mql => {
            if (mql.matches) beforePrintHandler();
          });
        } else {
          win.onbeforeprint = beforePrintHandler;
        }
      }
    }
    attachOnBeforePrintEvent(this.iframe, beforePrint);
  };

  savePrint = node => {
    this.print = node;
  };

  // print it
  handlePrint = () => {
    const { afterPrint } = this.props;

    this.setContent();
    // proper method
    if (document.queryCommandSupported('print')) {
      this.iframe.contentWindow.document.execCommand('print', false, null);
    } else {
      this.iframe.contentWindow.focus();
      this.iframe.contentWindow.print();
    }

    // after print callback
    if (typeof afterPrint === 'function') {
      afterPrint();
    }
  };

  render() {
    const { content } = this.props;
    return (
      <React.Fragment>
        {React.isValidElement(content) ? (
          <Rootless container={this.container}>
            {React.cloneElement(content, {
              ref: node => (this.element = node)
            })}
          </Rootless>
        ) : null}
        {React.cloneElement(this.props.trigger, {
          ref: this.savePrint,
          onClick: this.handlePrint
        })}
      </React.Fragment>
    );
  }
}

const Rootless = ({ children, container }) =>
  ReactDOM.createPortal(children, container);

// Add doctype to fix the style difference between printing and render
function setDocType(iframe, doctype) {
  const doc = iframe.document || iframe.contentDocument || iframe;
  doc.open();
  doc.write(doctype);
  doc.close();
}

// set html link tag
function setLink(head, href, media) {
  const link = document.createElement('link');
  link.href = href;
  if (media) link.media = media;
  link.rel = 'stylesheet';
  link.type = 'text/css'; // no need for HTML5
  head.appendChild(link);
}

function appendBody(body, element, props) {
  const { formValues, removeScripts } = props;
  // Clone for safety and convenience
  const _element = ReactDOM.findDOMNode(element);
  const content = _element.cloneNode(true);

  if (formValues) {
    // Copy original select and textarea values to their cloned counterpart
    // Makes up for inability to clone select and textarea values with clone(true)
    copyValues(_element, content, 'select, textarea');
  }

  if (removeScripts) {
    [].forEach.call(content.querySelectorAll('script'), item => {
      item.parentNode.removeChild(item);
    });
  }

  body.appendChild(content);
}

// Copies values from origin to clone for passed in elementSelector
function copyValues(origin, clone, elementSelector) {
  const originalElements = origin.querySelectorAll(elementSelector);

  [].forEach.call(clone.querySelectorAll(elementSelector), (item, index) => {
    item.value = originalElements[index].value;
  });
}

export default Print;
