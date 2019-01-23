import React from 'react';
import { Radio } from 'antd';
import $$ from 'cmn-utils';
const RadioGroup = Radio.Group;
/**
 * 单选框
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
  buttonStyle,
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
    formFieldOptions.onChange = e => onChange(form, e.target.value, e); // form, value
  }

  let RadioComp = Radio;
  if (buttonStyle === 'solid') RadioComp = Radio.Button;

  return getFieldDecorator(name, formFieldOptions)(
    <RadioGroup {...otherProps}>
      {dict.map((dic, i) => (
        <RadioComp key={dic.code} value={dic.code} title={dic.codeName}>
          {dic.codeName}
        </RadioComp>
      ))}
    </RadioGroup>
  );
};
