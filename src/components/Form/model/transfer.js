import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transfer, Modal, Select } from 'antd';
import $$ from 'cmn-utils';

const Option = Select.Option;
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
    const { value, dataSource } = props;
    this.state = {
      value: value || [],
      dataSource: dataSource,
      visible: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevProps.value) {
      this.setState({ value: this.props.value });
    }
  }

  triggerChange = (nextTargetKeys, direction, moveKeys) => {
    const { modal, onChange } = this.props;
    this.setState({ value: nextTargetKeys });

    if (onChange && !modal) {
      onChange(nextTargetKeys);
    }
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
    const { onChange } = this.props;
    const { value } = this.state;
    this.setState({
      visible: false
    });
    if (onChange) {
      onChange(value);
    }
  };

  onSelectChange = (value, option) => {
    const { onChange } = this.props;
    this.setState({
      value
    });
    onChange && onChange(value);
  };

  render() {
    const { title, modal, placeholder, ...otherProps } = this.props;
    const { dataSource, value, visible } = this.state;

    const comp = (
      <Transfer
        {...otherProps}
        dataSource={dataSource}
        titles={['源', '目标']}
        targetKeys={value}
        onChange={this.triggerChange}
        render={item => item.title || item.label}
      />
    );

    if (modal || otherProps.disabled) {
      return (
        <div>
          <div onClick={otherProps.disabled ? () => {} : this.showModal}>
            <Select
              readOnly
              disabled={!!otherProps.disabled}
              mode="multiple"
              open={false}
              value={otherProps.value}
              onChange={this.onSelectChange}
              placeholder={placeholder}
            >
              {otherProps.value &&
                dataSource
                  .filter(item => otherProps.value.indexOf(item.key) !== -1)
                  .map(item => (
                    <Option key={item.key} value={item.key}>
                      {item.title || item.label}
                    </Option>
                  ))}
            </Select>
          </div>
          <Modal
            className="antui-transfer-modal"
            title={'请选择' + title}
            visible={visible}
            onOk={this.onSubmit}
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
  placeholder,
  getPopupContainer,
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

  const props = {
    placeholder: placeholder || `请选择${otherProps.title}`,
    ...otherProps
  };

  return getFieldDecorator(name, formFieldOptions)(
    <TransferControlled dataSource={dataSource} {...props} />
  );
};
