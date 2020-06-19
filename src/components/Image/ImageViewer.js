import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import { Spin } from 'antd';
import './style/index.less';

/**
 * 预览
 */
const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'antui-icon-full-screen'
  },
  ORIGINAL: {
    name: 'original',
    icon: 'antui-icon-c-scale-to-original'
  }
};

const mousewheelEventName = "onwheel" in document.createElement("div") ? "wheel" : // 各个厂商的高版本浏览器都支持"wheel"
  document.onmousewheel !== undefined ? "mousewheel" : // Webkit 和 IE一定支持"mousewheel"
    "DOMMouseScroll";

class ImageViewer extends React.Component {
  static propTypes = {
    dataList: PropTypes.array,
    onSwitch: PropTypes.func,
    onClose: PropTypes.func,
    initialIndex: PropTypes.number,
    visible: PropTypes.bool
  };

  static defaultProps = {
    initialIndex: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: props.initialIndex,
      loading: true,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: true
      }
    }
  }

  componentDidMount() {
    this.deviceSupportInstall();
    this.wrapper.focus();
  }

  componentWillUnmount() {
    this.deviceSupportUninstall();
  }

  onMouseDown = e => {
    if (this.loading || e.button !== 0) return;
    const { transform } = this.state;
    const { offsetX, offsetY } = transform;
    const startX = e.pageX;
    const startY = e.pageY;
    this._dragHandler = rafThrottle(ev => {
      transform.offsetX = offsetX + ev.pageX - startX;
      transform.offsetY = offsetY + ev.pageY - startY;
      this.setState({
        transform
      })
    });

    document.addEventListener('mousemove', this._dragHandler)
    document.addEventListener('mouseup', ev => {
      document.removeEventListener("mousemove", this._dragHandler);
    })

    e.preventDefault();
  }

  handleActions = (action, options = {}) => {
    if (this.loading) return;
    const { zoomRate, rotateDeg, enableTransition } = {
      zoomRate: 0.2,
      rotateDeg: 90,
      enableTransition: true,
      ...options
    };
    const { transform } = this.state;
    switch (action) {
      case 'zoomOut':
        if (transform.scale > 0.2) {
          transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
        }
        break;
      case 'zoomIn':
        transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
        break;
      case 'clocelise':
        transform.deg += rotateDeg;
        break;
      case 'anticlocelise':
        transform.deg -= rotateDeg;
        break;
      default:
        break;
    }
    transform.enableTransition = enableTransition;
    this.setState({
      transform
    })
  }

  prev = () => {
    if (this.isFirst && !this.infinite) return;

    const len = this.props.dataList.length;
    this.setState({
      currentIndex: (this.state.currentIndex - 1 + len) % len,
      loading: true,
    })
  }

  next = () => {
    if (this.isLast && !this.infinite) return;

    const len = this.props.dataList.length;
    this.setState({
      currentIndex: (this.state.currentIndex + 1) % len,
      loading: true,
    })
  }

  imgStyle = () => {
    const { scale, deg, offsetX, offsetY, enableTransition } = this.state.transform;
    const { loading } = this.state;
    const style = {
      transform: `scale(${scale}) rotate(${deg}deg) translateZ(0)`,
      transition: enableTransition ? 'all .3s ease-out' : '',
      filter: `blur(${loading ? '16px' : '0'})`,
      marginLeft: `${offsetX}px`,
      marginTop: `${offsetY}px`,
      maxWidth: '1000%',
      maxHeight: '1000%'
    };
    if (this.state.mode === Mode.CONTAIN) {
      style.maxWidth = style.maxHeight = '100%';
    }
    return style;
  }

  deviceSupportInstall = () => {
    this._keyDownHandler = rafThrottle(e => {
      const keyCode = e.keyCode;
      switch (keyCode) {
        // ESC
        case 27:
          this.props.onClose();
          break;
        // SPACE
        case 32:
          this.toggleMode();
          break;
        // LEFT_ARROW
        case 37:
          this.prev();
          break;
        // UP_ARROW
        case 38:
          this.handleActions('zoomIn');
          break;
        // RIGHT_ARROW
        case 39:
          this.next();
          break;
        // DOWN_ARROW
        case 40:
          this.handleActions('zoomOut');
          break;
        default:
          break;
      }
    });

    this._mouseWheelHandler = rafThrottle(e => {
      const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
      if (delta > 0) {
        this.handleActions('zoomIn', {
          zoomRate: 0.1,
          enableTransition: true
        });
      } else {
        this.handleActions('zoomOut', {
          zoomRate: 0.1,
          enableTransition: true
        });
      }
    });

    document.addEventListener('keydown', this._keyDownHandler);
    document.addEventListener(mousewheelEventName, this._mouseWheelHandler);
  }

  deviceSupportUninstall() {
    document.removeEventListener('keydown', this._keyDownHandler);
    document.removeEventListener(mousewheelEventName, this._mouseWheelHandler);
    this._keyDownHandler = null;
    this._mouseWheelHandler = null;
  }

  toggleMode = () => {
    if (this.loading) return;
    const modeNames = Object.keys(Mode);
    const modeValues = Object.values(Mode);
    const index = modeValues.indexOf(this.state.mode);
    const nextIndex = (index + 1) % modeNames.length;

    this.setState({
      mode: Mode[modeNames[nextIndex]],
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: true
      }
    })
  }

  handleImgLoad = (e) => {
    this.setState({
      loading: false,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: true
      }
    })
  }

  handleImgError = (e) => {
    e.target.alt = '加载失败';
    this.setState({
      loading: false
    })
  }

  render() {
    const { dataList, onClose, onSwitch } = this.props;
    const { currentIndex } = this.state;

    return (
      <div className="antui-image-viewer__wrapper" tabIndex="-1" ref={node => this.wrapper = node}>
        <div className="antui-image-viewer__mask"></div>
        <span className="antui-image-viewer__close" onClick={onClose}>
          <Icon type="CloseCircleOutlined" antd />
        </span>

        {dataList.length === 1 ? null : (
          <>
            <span className="antui-image-viewer__prev" onClick={this.prev}>
              <Icon type="LeftCircleOutlined" antd />
            </span>
            <span className="antui-image-viewer__next" onClick={this.next}>
              <Icon type="RightCircleOutlined" antd />
            </span>
          </>
        )}

        <div className="antui-image-viewer__actions">
          <div className="antui-image-viewer__actions__inner">
            <Icon type="ZoomOutOutlined" antd onClick={e => this.handleActions('zoomOut')} />
            <Icon type="ZoomInOutlined" antd onClick={e => this.handleActions('zoomIn')} />
            <i className="antui-image-viewer__actions__divider"></i>
            <Icon type="ExpandOutlined" antd onClick={this.toggleMode} />
            <i className="antui-image-viewer__actions__divider"></i>
            <Icon type="UndoOutlined" antd onClick={e => this.handleActions('anticlocelise')} />
            <Icon type="RedoOutlined" antd onClick={e => this.handleActions('clocelise')} />
          </div>
        </div>

        <div className="antui-image-viewer__canvas">
          <Spin size="large" spinning={this.state.loading} />
          <img
            alt=""
            src={dataList[currentIndex]}
            style={this.imgStyle()}
            className="antui-image-viewer__img"
            onMouseDown={this.onMouseDown}
            onLoad={this.handleImgLoad}
            onError={this.handleImgError}
          />
        </div>
      </div>
    );
  }
}

export function rafThrottle(fn) {
  let locked = false;
  return function (...args) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(_ => {
      fn.apply(this, args);
      locked = false;
    });
  };
}

export default ImageViewer;