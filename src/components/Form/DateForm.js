import React from 'react';
import {DatePicker, TimePicker} from 'antd';
import objectAssign from 'object-assign';
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
/**
 * 日期，时间元件
 */
export default ({name, form, type, record, initialValue, rules, formFieldOptions = {}, format, ...otherProps}) => {
  const { getFieldDecorator } = form;
  
  let initval = initialValue;
  
  if (record) {
    initval = record[name];
  }
  
  // 如果存在初始值
  if (initval !== null && typeof (initval) !== "undefined") {
    formFieldOptions.initialValue = moment(initval);
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  let Component = DatePicker;

  switch (type) {
    case 'date':
    case 'datetime':
      break;
    case 'date~':
      Component = RangePicker;
      break;
    case 'monthDate':
      Component = MonthPicker;
      break;
    case 'time':
      Component = TimePicker;
      break;
    default:
      break;
  }

  let _format = "";

  if (format) _format = format;
  else if (type === 'datetime' || type === 'date~') _format = "YYYY-MM-DD HH:mm:ss";
  else if (type === 'time') _format = "HH:mm:ss";
  else _format = "YYYY-MM-DD";

  return getFieldDecorator(name, formFieldOptions)(
    <Component {...objectAssign({format: _format}, otherProps)} />
  );
};