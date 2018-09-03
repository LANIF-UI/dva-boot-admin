import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import assign from 'object-assign';
import { isArray } from 'cmn-utils/lib/utils';

/**
 * 打印页面中的指定组件，fork自 https://github.com/jasonday/printThis
 */
class Print extends Component {
  static propTypes = {
    content: PropTypes.any, // 可以是 string | node | element
    debug: PropTypes.bool,
    doctypeString: PropTypes.string,
    importCSS: PropTypes.bool,
    importStyle: PropTypes.bool,
    pageTitle: PropTypes.string,
    formValues: PropTypes.bool,
    removeScripts: PropTypes.bool,
  }

  static defaultProps = {
    doctypeString: '<!DOCTYPE html>', // enter a different doctype for older markup
    importCSS: true,                  // import parent page css
    importStyle: false,               // import style tags
    pageTitle: "",                    // add title to print page
    loadCSS: "",                      // path to additional css file - use an array [] for multiple
    formValues: true,                 // preserve input/form values
    removeScripts: false,             // remove script tags from print content
  }

  componentDidMount() {
    const { content } = this.props;

    this.container = this.createContainer();
    this.iframe = this.createFrame();

    if (typeof content === 'string') {          // html string
      this.element = document.createElement('div');
      this.element.innerHTML = content;
    } else if (React.isValidElement(content)) { // <div>bla,bla,bal...</div>
      React.cloneElement(content, {
        ref: node => this.element = node
      });
      ReactDOM.createPortal(this.props.children, this.container);
    } else if (content instanceof Element) {    // real dom element
      this.element = content;
    }

    setTimeout(this.setContent, 333);  
  }

  /**
   * create container
   */
  createContainer = () => {
    let container = document.querySelector('#antui-print-container');
    if (container) return container;
    else {
      container = document.createElement('div');
      container.id = 'antui-print-container';
      document.body.appendChild(container);
      return container;
    }
  }

  /**
   * create print iframe
   */
  createFrame = (props) => {
    const { debug } = props;
    const strFrameName = "printThis-" + (new Date()).getTime();

    let printI = document.createElement('iframe');
    printI.name = "printIframe";
    printI.id = strFrameName;

    if (window.location.hostname !== document.domain && navigator.userAgent.match(/msie/i)) {
      // Ugly IE hacks due to IE not inheriting document.domain from parent
      // checks if document.domain is set by comparing the host name against document.domain
      /* eslint-disable no-script-url, no-useless-concat */
      const iframeSrc = "javascript:document.write(\"<head><script>document.domain=\\\"" + document.domain + "\\\";</s" + "cript></head><body></body>\")";
      printI.className = "MSIE";
      printI.src = iframeSrc;
    }
    this.container.appendChild(printI);

    if (!debug) {
      assign(printI.style, {
        position: "absolute",
        width: "0px",
        height: "0px",
        left: "-600px",
        top: "-600px"
      });
    };
    return printI;
  }

  // set html content for iframe
  setContent = () => {
    const { doctypeString, importCSS, importStyle, pageTitle, loadCSS, canvas, beforePrint } = this.props;
    if (doctypeString){
      setDocType(this.iframe, doctypeString);
    }

    const doc = this.iframe.document || this.iframe.contentDocument || this.iframe;
    const head = doc.querySelector('head');
    const body = doc.querySelector('body');

    // import page stylesheets
    if (importCSS) {
      document.querySelectorAll('link[rel=stylesheet]').forEach(item => {
        const href = item.getAttribute('href');
        if (href) {
          const media = item.getAttribute('media') || 'all';
          setLink(head, href, media);
        }
      })
    }

    // import style tags
    if (importStyle) {
      document.querySelectorAll('style').forEach(item => {
        head.appendChild(item);
      })
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
        })
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
      this.element.querySelectorAll('canvas').forEach(item => {
        item.setAttribute('data-printthis', canvasId++);
      })
    }

    appendBody(body, this.element);

    if (canvas) {
      // Re-draw new canvases by referencing the originals
      body.querySelectorAll('canvas').forEach(item => {
        const cid = item.getAttribute('data-printthis');
        const src = document.querySelector('[data-printthis="' + cid + '"]');

        item.getContext('2d').drawImage(src[0], 0, 0);
        src.removeAttribute('data-printthis');
      });
    }

    // attach event handler function to beforePrint event
    function attachOnBeforePrintEvent(iframe, beforePrintHandler) {
      const win = iframe.contentWindow || iframe.contentDocument || iframe;

      if (typeof beforePrintHandler === "function") {
        if ('matchMedia' in win) {
            win.matchMedia('print').addListener((mql) => {
              if(mql.matches)  beforePrintHandler();
            });
        } else {
            win.onbeforeprint = beforePrintHandler;
        }
      }
    }
    attachOnBeforePrintEvent(this.iframe, beforePrint);
  }

  savePrint = node => {
    this.print = node;
  };

  // print it
  handlePrint = () => {

  }

  render() {
    return React.cloneElement(this.props.trigger(), {
      ref: this.savePrint,
      onClick: this.handlePrint
    });
  }
}

// Add doctype to fix the style difference between printing and render
function setDocType(iframe, doctype){
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

function appendBody(body, element) {
  const { formValues, removeScripts } = this.props;
  // Clone for safety and convenience
  const content = element.cloneNode(true);

  if (formValues) {
      // Copy original select and textarea values to their cloned counterpart
      // Makes up for inability to clone select and textarea values with clone(true)
      copyValues(element, content, 'select, textarea');
  }

  if (removeScripts) {
      content.querySelectorAll('script').forEach(item => {
        item.parentNode.removeChild(item);
      })
  }

  body.appendChild(content);
}

// Copies values from origin to clone for passed in elementSelector
function copyValues(origin, clone, elementSelector) {
  const originalElements = origin.querySelectorAll(elementSelector);

  clone.querySelectorAll(elementSelector).forEach((item, index) => {
    item.value = originalElements[index].value;
  });
}

export default Print;
