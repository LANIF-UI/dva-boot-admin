import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import Form from '../Form';
import cx from 'classnames';
import './style/index.less';

class ModalForm extends Component {
  static propTypes = {
    title: PropTypes.string,
    record: PropTypes.object,
    visible: PropTypes.bool,
    columns: PropTypes.array,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    modalOpts: PropTypes.object,
    formOpts: PropTypes.object,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({
        visible: nextProps.visible
      });
    }
  }

  closeModal = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
      return;
    }
    this.setState({
      visible: false
    });
  };

  onSubmit = () => {
    const { record, onSubmit } = this.props;
    this.refs.form.validateFields((error, value) => {
      if (error) {
        console.log(error);
        return;
      }
      onSubmit && onSubmit(value, record);
    });
  };

  render() {
    const {
      title,
      record,
      className,
      columns,
      onCancel,
      onSubmit,
      modalOpts,
      formOpts,
      loading,
      full,
      preview
    } = this.props;

    const classname = cx(className, 'antui-modalform', { 'full-modal': full });
    const modalProps = {
      className: classname,
      confirmLoading: loading,
      visible: this.state.visible,
      style: { top: 20 },
      title: title || (record ? '编辑内容' : '新增内容'),
      // maskClosable: true,
      destroyOnClose: true,
      onCancel: this.closeModal,
      footer: [
        onCancel && (
          <Button key="back" onClick={this.closeModal}>
            取消
          </Button>
        ),
        onSubmit && (
          <Button key="submit" type="primary" onClick={this.onSubmit}>
            确定
          </Button>
        )
      ],
      ...modalOpts
    };

    const formProps = {
      ref: 'form',
      columns,
      onSubmit,
      record,
      preview,
      footer: false,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 17 }
      },
      ...formOpts
    };

    return (
      <Modal {...modalProps}>
        <Form {...formProps} />
      </Modal>
    );
  }
}

export default ModalForm;
