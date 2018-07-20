import React, { Component } from 'react';
import './style/ripple.less';

/**
 * 仿 material design ripple 效果
 */
class Ripple extends Component {
  static defaultProps = {
    color: 'rgba(255, 255, 255, 0.4)',
    eventName: 'click'
  };

  state = {
    mouseMove: false,
    ripples: []
  };

  componentDidMount() {
    const eventName = this.props.eventName;
    if (this.element)
      this.element.addEventListener(eventName, this.createRipple);
  }

  componentWillUnmount() {
    const eventName = this.props.eventName;
    if (this.element) {
      this.element.removeEventListener(eventName, this.createRipple);
      this.element = null;
    }
  }

  createRipple = e => {
    const { eventName, color } = this.props;
    const pageX = eventName.match(/touch/) ? e.changedTouches[0].pageX : e.x;
    const pageY = eventName.match(/touch/) ? e.changedTouches[0].pageY : e.y;
    const btnWidth = this.element.clientWidth;
    const rect = this.element.getBoundingClientRect();
    const btnOffsetTop = rect.top;
    const btnOffsetLeft = rect.left;
    const posMouseX = pageX;
    const posMouseY = pageY;
    const rippleX = posMouseX - btnOffsetLeft;
    const rippleY = posMouseY - btnOffsetTop;

    const rippleAnimate = document.createElement('span');
    rippleAnimate.className = 'ripple-animate';
    const baseStyle = `
      top: ${rippleY - btnWidth}px; 
      left: ${rippleX - btnWidth}px; 
      width: ${btnWidth * 2}px; 
      height: ${btnWidth * 2}px; 
      background: ${color};
    `;
    rippleAnimate.style.cssText = baseStyle;
    this.element.appendChild(rippleAnimate);

    requestAnimationFrame(function() {
      rippleAnimate.style.cssText = baseStyle + ' transform: scale(1); opacity: 0;';
    });

    setTimeout(function() {
      rippleAnimate.remove();
    }, 700);
  };

  render() {
    const { children } = this.props;
    return (
      <a ref={node => (this.element = node)} className="ripple-btn">
        {children}
      </a>
    );
  }
}

export default Ripple;
