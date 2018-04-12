import React from 'react';
import {TreeSelect} from 'antd';
/**
 * 下拉树菜单元件
 */
export const TreeSelectForm = ({form, name, formFieldOptions = {}, 
  children, record, initialValue, rules, onChange, ...otherProps}) => {
  // --
  const { getFieldDecorator } = form;

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }
  
  // 如果存在初始值
  if (initval !== null && typeof (initval) !== "undefined") {
    formFieldOptions.initialValue = initval;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof otherProps.onChange === "function") {
    formFieldOptions.onChange = value => otherProps.onChange(form, value); // form, value
  }

  return getFieldDecorator(name, formFieldOptions)(
    <TreeSelect treeDefaultExpandAll {...otherProps}>
      {children}
    </TreeSelect>
  );
};

export default TreeSelectForm;