import React from 'react';
import Drag from './Drag';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
class BuildTitle extends React.Component {
  updateTransform = transformStr => {
    this.modalDom.style.transform = transformStr;
  };
  componentDidMount() {
    this.modalDom = document.getElementsByClassName(
      'ant-modal-wrap' //modal的class是ant-modal-wrap
    )[0];
  }
  render() {
    const { title } = this.props;
    return (
      <Drag updateTransform={this.updateTransform}>
        <div>{title}</div>
      </Drag>
    );
  }
}
export default class AntdModalDrag extends React.Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  render() {
    const title = <BuildTitle title="Basic Modal" />;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open
        </Button>
        <Modal
          title={title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.state.text}</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
