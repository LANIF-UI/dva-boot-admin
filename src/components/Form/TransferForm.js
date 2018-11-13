import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transfer, Modal, Button } from 'antd';
import $$ from 'cmn-utils';

/**
 *  formItem: {
      type: 'transfer',
      modal: true,
      dataSource: employees,
      normalize: (value) => value.map(item => item.key)
    }
 */
class TransferControlled extends Component {
  static propTypes = {
    value: PropTypes.array,
    dataSource: PropTypes.array,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    const { value, dataSource, ...otherProps } = props;
    this.state = {
      value: value,
      dataSource: dataSource,
      visible: false
    };
    this.otherProps = otherProps;
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({ value });
    }
  }

  triggerChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ value: nextTargetKeys });
  };

  showModal = () => {
    this.setState({
      visible: true,
      value: this.props.value
    });
  };

  hideModal = () => {
    this.setState({
      visible: false
    });
  };

  onSubmit = () => {
    this.setState({
      visible: false
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.state.value);
    }
  }

  render() {
    const propsValue = this.props.value;
    const { dataSource, value } = this.state;

    const comp = (
      <Transfer
        {...this.otherProps}
        dataSource={dataSource}
        titles={['源', '目标']}
        targetKeys={value}
        onChange={this.triggerChange}
        render={item => item.title || item.label}
      />
    );

    if (this.otherProps.modal) {
      return (
        <div>
          <Button onClick={this.showModal}>
            { propsValue && propsValue.length > 0
              ? dataSource.filter(item => propsValue.includes(item.key))
                .map(item => item.title || item.label).join(', ')
              : <span>请选择{this.otherProps.title}</span>
            }
          </Button>
          <Modal
            className="antui-transfer-modal"
            title={'请选择' + this.otherProps.title}
            visible={this.state && this.state.visible}
            onOk={this.onSubmit}
            onCancel={this.hideModal}
            okText="确定"
            cancelText="取消"
            {...this.otherProps.modal}
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
 * TransferForm组件
 */
export default ({
  form,
  name,
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
    <TransferControlled dataSource={dataSource} {...otherProps} />
  );
};
