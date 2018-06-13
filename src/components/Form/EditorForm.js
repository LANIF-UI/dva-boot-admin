import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from '../Editor';
import $$ from 'cmn-utils';

class EditorControlled extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    const {value, ...otherProps} = props;
    this.state = {
      value
    };
    this.otherProps = otherProps;
  }

  componentWillReceiveProps(nextProps) {
    const {value, ...otherProps} = nextProps;
    if (value) {
      this.otherProps = otherProps;
      this.setState({ value });
    }
  }

  triggerChange = (value) => {
    this.setState({ value });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const {value} = this.state;

    return (
      <Editor
        value={value}
        onChange={this.triggerChange}
        {...this.otherProps}
      />
    );
  }
}

/**
 * EditorForm组件
 */
export default ({form, name, formFieldOptions = {}, record, initialValue, rules, onChange, normalize, preview, ...otherProps}) => {
  const { getFieldDecorator } = form;

  let initval = initialValue;
  
  if (record) {
    initval = record[name];
  }
  
  // 如果存在初始值
  if (initval !== null && typeof (initval) !== "undefined") {
    if ($$.isFunction(normalize)) {
      formFieldOptions.initialValue = normalize(initval);
    } else {
      formFieldOptions.initialValue = initval;
    }
  }

  if (preview) {
    return <div style={otherProps.style} dangerouslySetInnerHTML={{__html: initval || ''}}></div>;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === "function") {
    formFieldOptions.onChange = value => onChange(form, value); // form, value
  }

  return getFieldDecorator(name, formFieldOptions)(
    <EditorControlled {...otherProps} />
  );
};