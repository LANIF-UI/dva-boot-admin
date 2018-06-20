import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Tag } from 'antd';
import TransferTree from '../TransferTree';
import $$ from 'cmn-utils';

/**
 *  formItem: {
      type: 'transfer',
      modal: true,
      dataSource: employees,
      normalize: (value) => value.map(item => item.key)
    }
 */
class TransferTreeControlled extends Component {
  static propTypes = {
    value: PropTypes.array,
    dataSource: PropTypes.array,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { value, dataSource } = props;
    this.state = {
      value: value,
      dataSource: dataSource,
      visible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  triggerChange = (targetKeys, targetNodes) => {
    this.setState({ value: targetNodes });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(targetNodes);
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  hideModal = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { modal, ...otherProps } = this.props;
    const { dataSource, value } = this.state;
    const comp = (
      <TransferTree
        {...otherProps}
        dataSource={dataSource}
        targetNodes={value}
        onChange={this.triggerChange}
      />
    );

    if (modal) {
      return (
        <div>
          <Button onClick={this.showModal}>请选择{otherProps.title}</Button>

          {value && value.length ? (
            <div className="transfer-tree-value-list">
              {value.map((item, index) => <Tag key={index}>{item.title}</Tag>)}
            </div>
          ) : null}

          <Modal
            className="antui-transfer-modal"
            title={'请选择' + otherProps.title}
            visible={this.state && this.state.visible}
            width={modal.width || 480}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            okText="确定"
            cancelText="取消"
            {...modal}
          >
            {comp}
          </Modal>
        </div>
      );
    }

    return comp;
  }
}

/**
 * TransferTreeForm组件
 */
export default ({
  form,
  name,
  dict,
  formFieldOptions = {},
  record,
  initialValue,
  rules,
  onChange,
  dataSource,
  normalize,
  ...otherProps
}) => {
  const { getFieldDecorator } = form;

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }

  // 如果存在初始值
  if (initval !== null && typeof initval !== 'undefined') {
    if ($$.isFunction(normalize)) {
      formFieldOptions.initialValue = normalize(initval);
    } else {
      formFieldOptions.initialValue = initval;
    }
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = value => onChange(form, value); // form, value
  }

  return getFieldDecorator(name, formFieldOptions)(
    <TransferTreeControlled dataSource={dataSource} {...otherProps} />
  );
};
