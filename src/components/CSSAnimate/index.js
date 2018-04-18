import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cssAnimate, { isCssAnimationSupported } from 'css-animation';

class CSSAnimate extends Component {
  componentDidMount() {
    const { animationName, callback } = this.props;
    this.toggle(animationName, callback);
  }

  componentDidUpdate(prevProps, prevState) {
    const { animationName, callback } = this.props;
    this.toggle(animationName, callback);
  }

  toggle = (animationName, callback) => {
    const node = ReactDOM.findDOMNode(this);

    if (isCssAnimationSupported) {
      cssAnimate(node, animationName, callback);
    } else {
      console.warn('不支持css动画');
    }
  }

  render() {
    const {className, children, animationName, callback, ...otherProps} = this.props;
    return (
      <div className="animated" {...otherProps}>
        {children}
      </div>
    );
  }
}

export default CSSAnimate;