import './style/index.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cssAnimate, { isCssAnimationSupported } from 'css-animation';

class Mask extends Component {
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

  render() {
    return (
      <div className="basic-mask animated animated-short" onClick={this.props.onClick}>
      </div>
    );
  }
}

export default Mask;