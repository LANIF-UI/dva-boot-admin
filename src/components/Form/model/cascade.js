import React from 'react';
import { Cascader } from 'antd';
import $$ from 'cmn-utils';

/**
 * 级联表单元件
 * initialValue 初始值
 */
export default ({
  name,
  form,
  record,
  formFieldOptions = {},
  normalize,
  initialValue,
  rules,
  onChange,
  preview,
  getPopupContainer,
  placeholder,
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
    if (otherProps.options && initval) {
      const data = [];
      let level = 0;
      const loop = opts => {
        opts.forEach(item => {
          if (item.value === initval[level]) {
            data.push(item.label);
            if (item.children && initval[++level]) {
              loop(item.children);
            }
          }
        });
      };
      loop(otherProps.options);
      return <div style={otherProps.style}>{data.join(' / ')}</div>;
    }
    return null;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = (value, selectedOptions) =>
      onChange(form, value, selectedOptions); // form, value, selectedOptions
  }

  const props = {
    placeholder: placeholder || `请选择${otherProps.title}`,
    ...otherProps
  };

  if (getPopupContainer) {
    props.getPopupContainer = getPopupContainer;
  }

  return getFieldDecorator(name, formFieldOptions)(
    <Cascader {...props} />
  );
};
