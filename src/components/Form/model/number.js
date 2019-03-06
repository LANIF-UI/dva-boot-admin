import React from 'react';
import { InputNumber } from 'antd';
import $$ from 'cmn-utils';
/**
 * 数字输入框元件
 */
export default ({
  form,
  name,
  formFieldOptions = {},
  record,
  initialValue,
  normalize,
  rules,
  onChange,
  preview,
  placeholder,
  getPopupContainer,
  type,
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

  if (preview) {
    return <div style={otherProps.style}>{initval || ''}</div>;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = value => onChange(form, value); // form, value, event
  }

  delete otherProps.render;

  const props = {
    placeholder: placeholder || `请输入${otherProps.title}`,
    ...otherProps
  };

  return getFieldDecorator(name, formFieldOptions)(<InputNumber {...props} />);
};
