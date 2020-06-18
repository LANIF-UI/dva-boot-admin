import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import cx from 'classnames';
import './style/index.less';
import $$ from 'cmn-utils';

/**
 * 预览
 */
class ImageViewer extends React.Component {
  static propTypes = {
    dataList: PropTypes.array,
    onSwitch: PropTypes.func,
    onClose: PropTypes.func,
    initialIndex: PropTypes.number,
    visible: PropTypes.bool
  };

  static defaultProps = {
    initialIndex: 0
  }

  transform = {
    scale: 1,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    enableTransition: false
  };

  constructor(props) {
    super(props);
    this.state = {
      currentImg: props.dataList[props.initialIndex],
      currentIndex: props.initialIndex
    }
  }

  onMouseDown = e => {
    if (this.loading || e.button !== 0) return;
    const { offsetX, offsetY } = this.transform;
    const startX = e.pageX;
    const startY = e.pageY;
    this._dragHandler = rafThrottle(ev => {
      this.transform.offsetX = offsetX + ev.pageX - startX;
      this.transform.offsetY = offsetY + ev.pageY - startY;
    });

    document.addEventListener('mousemove', this._dragHandler)
    document.addEventListener('mouseup', ev => {
      document.removeEventListener("mousemove", this._dragHandler);
    })

    e.preventDefault();
  }

  render() {
    const { dataList, onSwitch, initialIndex } = this.props;
    const { currentImg } = this.state;

    return (
      <div className="antui-image-viewer__wrapper">
        <div className="antui-image-viewer__mask"></div>
        <span className="antui-image-viewer__close">
          <Icon type="CloseCircleOutlined" antd />
        </span>

        {dataList.length === 1 ? null : (
          <>
            <span className="antui-image-viewer__prev" onClick={this.onPrev}>
              <Icon type="LeftCircleOutlined" antd />
            </span>
            <span className="antui-image-viewer__next" onClick={this.onNext}>
              <Icon type="RightCircleOutlined" antd />
            </span>
          </>
        )}

        <div className="antui-image-viewer__actions">
          <div className="antui-image-viewer__actions__inner">
            <Icon type="ZoomOutOutlined" antd />
            <Icon type="ZoomInOutlined" antd />
            <i className="antui-image-viewer__actions__divider"></i>
            <Icon type="ExpandOutlined" antd />
            <i className="antui-image-viewer__actions__divider"></i>
            <Icon type="UndoOutlined" antd />
            <Icon type="RedoOutlined" antd />
          </div>
        </div>

        <div className="antui-image-viewer__canvas">
          <img
            alt=""
            src={currentImg}
            className="antui-image-viewer__img"
            onMouseDown={this.onMouseDown}
          />
        </div>
      </div>
    );
  }
}

export function rafThrottle(fn) {
  let locked = false;
  return function(...args) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(_ => {
      fn.apply(this, args);
      locked = false;
    });
  };
}

export default ImageViewer;