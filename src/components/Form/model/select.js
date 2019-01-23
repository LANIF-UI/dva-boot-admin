import React from 'react';
import { Select } from 'antd';
import $$ from 'cmn-utils';
/**
 * 下拉菜单元件
 */
export default ({
  form,
  name,
  dict = [],
  formFieldOptions = {},
  record,
  initialValue,
  rules,
  onChange,
  normalize,
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

  if (getPopupContainer) {
    props.getPopupContainer = getPopupContainer;
  }

  return getFieldDecorator(name, formFieldOptions)(
    <Select {...props}>
      {dict.map((dic, i) => (
        <Select.Option key={dic.code} value={dic.code} title={dic.codeName}>
          {dic.codeName}
        </Select.Option>
      ))}
    </Select>
  );
};
