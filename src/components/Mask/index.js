import './style/index.less';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import cssAnimate, { isCssAnimationSupported } from 'css-animation';
import cx from 'classnames';
import Icon from '../Icon';

const noop = () => {};

class Mask extends PureComponent {
  static defaultProps = {
    prefixCls: 'basic-mask',
    maskClosable: true,
  }

  componentDidMount() {
    const { visible } = this.props;
    this.toggle(visible);
  }

  componentDidUpdate(prevProps, prevState) {
    const { visible } = this.props;
    this.toggle(visible);
  }

  toggle = (visible) => {
    const node = ReactDOM.findDOMNode(this);
    if (visible) node.style.display = 'block';

    if (isCssAnimationSupported) {
      cssAnimate(node, `fade${visible ? 'In' : 'Out'}`, _ => {
        node.style.display = visible ? 'block' : 'none';
      });
    } else {
      node.style.display = visible ? 'block' : 'none';
    }
  }

  onClick = e => {
    const { onClose, prefixCls } = this.props;

    if ((e.target.classList.contains(prefixCls) || e.target.classList.contains(prefixCls + '-close')) && onClose) {
      onClose(e);
    }
  }

  render() {
    const { children, className, prefixCls, closable, maskClosable } = this.props;
    return (
      <div className={cx(prefixCls, 'animated', 'animated-short', className)} onClick={maskClosable ? this.onClick : noop}>
        {closable ? <Icon className={`${prefixCls}-close`} type="close" antd onClick={this.onClick} /> : null}
        {children}
      </div>
    );
  }
}

export default Mask;