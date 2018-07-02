import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lazySizes from 'lazysizes';
import cx from 'classnames';
import $$ from 'cmn-utils';

class LazyLoad extends Component {
  static propTypes = {
    src: PropTypes.string,
    dataSizes: PropTypes.string,
    dataSrc: PropTypes.string,
    dataSrcSet: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    className: PropTypes.string,
    iframe: PropTypes.bool
  };

  static defaultProps = {
    src:
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    dataSizes: 'auto',
    iframe: false
  };

  componentWillUpdate (nextProps) {
    let propsChanged = false;
    for (let propName of [
      'src',
      'dataSizes',
      'dataSrc',
      'dataSrcSet',
      'className',
      'iframe'
    ]) {
      let prop =
        propName === 'dataSrcSet'
          ? this.handleSrcSet(this.props[propName])
          : this.props[propName];
      let nextProp =
        propName === 'dataSrcSet'
          ? this.handleSrcSet(nextProps[propName])
          : nextProps[propName];
      if (prop !== nextProp) {
        propsChanged = true;
        break;
      }
    }
    if (propsChanged && lazySizes) {
      if (lazySizes.hC(this.node, 'lazyloaded')) {
        lazySizes.rC(this.node, 'lazyloaded');
      }
    }
  }

  handleSrcSet(dataSrcSet) {
    if ($$.isArray(dataSrcSet)) {
      return dataSrcSet.join(',');
    } else if (typeof dataSrcSet === 'string') {
      return dataSrcSet
    } else {
      return null;
    }
  }

  componentDidUpdate = () => {
    if (!lazySizes) {
      return;
    }
    if (!lazySizes.hC(this.node, 'lazyloaded') && !lazySizes.hC(this.node, 'lazyload')) {
      lazySizes.aC(this.node, 'lazyload');
    }
  };


  render() {
    const {
      src,
      dataSizes,
      dataSrc,
      dataSrcSet,
      className,
      iframe,
      title,
      alt,
      ...otherProps
    } = this.props;

    const classNames = cx('lazyload', className);

    const lazyProps = { ...otherProps, src };
    if (dataSrc) lazyProps['data-src'] = dataSrc;
    if (dataSizes) lazyProps['data-sizes'] = dataSizes;
    if (dataSrcSet) {
      lazyProps['data-srcset'] = this.handleSrcSet(dataSrcSet);
    }

    if (iframe) {
      return <iframe ref={node => this.node = node} className={classNames} title={title} {...lazyProps} />;
    }
    return <img ref={node => this.node = node} className={className} alt={alt} {...lazyProps} />;
  }
}

export default LazyLoad;
