import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ImageViewer from './ImageViewer';
import './style/index.less';

/**
 * 图片组件，支持预览等功能
 */
class Image extends React.Component {
  static propTypes = {
    previewList: PropTypes.array,
    onSwitch: PropTypes.func,
    onClose: PropTypes.func,
    initialIndex: PropTypes.number
  };

  state = {
    showViewer: false
  }

  onShowViewer = () => {
    if (!this.preview) {
      return;
    }

    this.prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.setState({
      showViewer: true
    })
  }

  onCloseViewer = () => {
    document.body.style.overflow = this.prevOverflow;
    this.setState({
      showViewer: false
    })
  }

  render() {
    const { src, previewList, onSwitch, initialIndex, ...props } = this.props;
    const { showViewer } = this.state;

    this.preview = Array.isArray(previewList) && previewList.length;
    return (
      <div className="antui-image" {...props}>
        <img
          src={src}
          alt=""
          onClick={this.onShowViewer}
          className={
            cx("antui-image__inner", { "antui-image__preview": this.preview })
          }
        />
        {this.preview && showViewer ? (
          <ImageViewer
            initialIndex={initialIndex}
            dataList={previewList}
            visible={showViewer}
            onClose={this.onCloseViewer}
          />
        ) : null}
      </div>
    );
  }
}

export default Image;