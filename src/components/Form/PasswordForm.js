import React from 'react';
import PropTypes from 'prop-types';
import {Input, Form, Col} from 'antd';
/**
 * 密码控件
 */
export default class PasswordForm extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    name: PropTypes.string,
    formFieldOptions: PropTypes.object,
    rules: PropTypes.array,
    placeholder: PropTypes.string,
    ComponentCol: PropTypes.node,
    ComponentItem: PropTypes.node,
    formItemLayout: PropTypes.object,
    col: PropTypes.object,
    repeat: PropTypes.bool,
    type: PropTypes.string,
  }

  state = {
    confirmDirty: false
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue(this.props.name)) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields([this.props.name + "_repeat"], { force: true });
    }
    callback();
  }

  render() {
    const {form, name, formFieldOptions = {}, rules, placeholder, type,
      formItemLayout, col, repeat, ...otherProps} = this.props;
    
    const { getFieldDecorator } = form;

    // 如果有rules
    formFieldOptions.rules = [
      {
        required: true, message: `请输入${otherProps.title}`,
      }, {
        validator: this.checkConfirm,
      }
    ];

    if (rules && rules.length) {
      formFieldOptions.rules.concat(rules);
    }

    let ComponentCol = type === "inline" ? "div" : Col;

    return (
      <div className="col-item col-item-password-wrap">
        <ComponentCol className="col-item col-item-password" {...col}>
          <Form.Item {...formItemLayout} label={otherProps.title} hasFeedback className="col-item-content">
            {getFieldDecorator(name, formFieldOptions)(
              <Input type="password" placeholder={placeholder} />
            )}
          </Form.Item>
        </ComponentCol>
        {repeat ? (
          <ComponentCol className="col-item col-item-repeat-password" {...col}>
            <Form.Item {...formItemLayout} label={"确认" + otherProps.title} hasFeedback className="col-item-content">
              {getFieldDecorator(name + "_repeat", {
                rules: [{
                  required: true, message: `请再次输入${otherProps.title}`,
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input 
                  type="password" 
                  onBlur={this.handleConfirmBlur} 
                  placeholder="两次输入需保持一致"
                />
              )}
            </Form.Item>
          </ComponentCol>
        ) : null}
      </div>
    );
  }
}