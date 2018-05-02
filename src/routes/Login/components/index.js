import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Layout, Button, Icon, Input, Checkbox } from 'antd';
import logoImg from 'assets/images/logo1.png';
import './style.less';
const { Content } = Layout;
const FormItem = Form.Item;

@connect(({ login, loading }) => ({
  login,
  loading: loading.models.login
}))
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { loading, login, form } = this.props;
    const { loggedIn, message } = login;
    const { getFieldDecorator } = form;

    return (
      <Layout className="full-layout login-page">
        <Content>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="user-img">
              <img src={logoImg} alt="logo" />
              <b>LANIF</b>
              <span>Admin</span>
            </div>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入您的用户名!' }]
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="用户名"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入您的密码!' }]
              })(
                <Input
                  size="large"
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>记住我</Checkbox>)}
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
              <div className="new-user">
                新用户？<a href="">现在注册</a>
              </div>
            </FormItem>
          </Form>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(Login);
