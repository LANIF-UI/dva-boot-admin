import React from 'react';
import {DatePicker, TimePicker} from 'antd';
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

  let props = {
    ...otherProps
  }

  switch (type) {
    case 'date':
      break;
    case 'datetime':
      if (!props.showTime) {
        props.showTime = true;
      }
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

  if (format) props.format = format;
  else if (type === 'datetime' || type === 'date~') props.format = "YYYY-MM-DD HH:mm:ss";
  else if (type === 'time') props.format = "HH:mm:ss";
  else props.format = "YYYY-MM-DD";

  return getFieldDecorator(name, formFieldOptions)(
    <Component {...props} />
  );
};