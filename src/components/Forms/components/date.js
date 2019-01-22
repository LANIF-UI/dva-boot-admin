import React from 'react';
import { DatePicker, TimePicker } from 'antd';
import $$ from 'cmn-utils';
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
/**
 * 日期，时间元件
 */
export default ({
  name,
  form,
  type,
  record,
  initialValue,
  rules,
  formFieldOptions = {},
  format,
  onChange,
  normalize,
  preview,
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
      if ($$.isArray(initval)) {
        formFieldOptions.initialValue = initval.map(item => moment.isMoment(item) ? item : moment(item))
      } else {
        formFieldOptions.initialValue = moment.isMoment(initval) ? initval : moment(initval);
      }
    }
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  let Component = DatePicker;

  const props = {
    ...otherProps
  };

  if (getPopupContainer) {
    props.getCalendarContainer = getPopupContainer;
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
    case 'month':
      Component = MonthPicker;
      break;
    case 'time':
      Component = TimePicker;
      break;
    default:
      break;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = (date, dateString) =>
      onChange(form, date, dateString);
  }

  if (format) props.format = format;
  else if (type === 'month') props.format = 'YYYY-MM';
  else if (type === 'datetime' || type === 'date~')
    props.format = 'YYYY-MM-DD HH:mm:ss';
  else if (type === 'time') props.format = 'HH:mm:ss';
  else props.format = 'YYYY-MM-DD';

  if (preview) {
    return (
      <div style={otherProps.style}>
        {initval ? formFieldOptions.initialValue.format(props.format) : ''}
      </div>
    );
  }

  return getFieldDecorator(name, formFieldOptions)(<Component {...props} />);
};
