import React, { Component } from 'react';
import cx from 'classnames';
import './style/ripple.less';

/**
 * 仿 material design ripple 效果
 */
class Ripple extends Component {
  componentDidMount() {
    if (this.element) this.element.addEventListener('click', this.createRipple);
  }

  componentWillUnmount() {
    if (this.element) {
      this.element.removeEventListener('click', this.createRipple);
      this.element = null;
    }
  }

  createRipple = e => {
    const pageX = e.x;
    const pageY = e.y;
    const btnWidth = this.element.clientWidth;
    const rect = this.element.getBoundingClientRect();
    const btnOffsetTop = rect.top;
    const btnOffsetLeft = rect.left;
    const posMouseX = pageX;
    const posMouseY = pageY;
    const rippleX = posMouseX - btnOffsetLeft;
    const rippleY = posMouseY - btnOffsetTop;

    const rippleAnimate = document.createElement('div');
    rippleAnimate.className = 'ripple-animate';
    const baseStyle = `
      top: ${rippleY - btnWidth}px; 
      left: ${rippleX - btnWidth}px; 
      width: ${btnWidth * 2}px; 
      height: ${btnWidth * 2}px;
    `;
    rippleAnimate.style.cssText = baseStyle;
    this.element.appendChild(rippleAnimate);

    requestAnimationFrame(function() {
      rippleAnimate.style.cssText =
        baseStyle +
        ' transform: scale(1); -webkit-transition: scale(1); opacity: 0;';
    });

    setTimeout(function() {
      rippleAnimate.remove();
    }, 700);
  };

  render() {
    const { children, type, ghost, onClick, ...otherProps } = this.props;
    return (
      <a
        ref={node => (this.element = node)}
        className={cx('ripple-btn', type, { ghost })}
        onClick={onClick}
        {...otherProps}
      >
        <span>{children}</span>
      </a>
    );
  }
}

export default Ripple;
