import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cssAnimate, { isCssAnimationSupported } from 'css-animation';
import cx from 'classnames';
import omit from 'object.omit';

class CSSAnimate extends Component {
  componentDidMount() {
    const { animationName, callback } = this.props;
    this.animate(animationName, callback);
  }

  componentDidUpdate(prevProps, prevState) {
    const { animationName, callback } = this.props;
    this.animate(animationName, callback);
  }

  animate = (animationName, callback) => {
    const node = ReactDOM.findDOMNode(this);

    if (isCssAnimationSupported) {
      cssAnimate(node, animationName, callback);
    } else {
      console.warn('不支持css动画');
    }
  }

  render() {
    const { className, children, ...otherProps } = this.props;
    const classnames = cx(
      'animated',
      className
    );
    const divProps = omit(otherProps, ['animationName', 'callback']);

    return (
      <div className={classnames} {...divProps}>
        {children}
      </div>
    );
  }
}

export default CSSAnimate;