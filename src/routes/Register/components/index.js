import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Popover,
  Progress,
  Layout
} from 'antd';
import './index.less';
import '../../Login/components/index.less';
import logoImg from 'assets/images/logo1.png';
import Success from './Success';
const { Content } = Layout;

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: <div style={{ color: '#52c41a' }}>强度：强</div>,
  pass: <div style={{ color: '#faad14' }}>强度：中</div>,
  poor: <div style={{ color: '#f5222d' }}>强度：太短</div>
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception'
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit']
}))
@Form.create()
export default class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
    registerSuccess: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.register.status) {
      this.setState({
        registerSuccess: true
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      const { prefix } = this.state;
      if (!err) {
        dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            prefix
          }
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value
      });
      callback('error');
    } else {
      this.setState({
        help: ''
      });
      const { visible, confirmDirty } = this.state;
      if (!visible) {
        this.setState({
          visible: !!value
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <Progress
        status={passwordProgressMap[passwordStatus]}
        className={`progress-${passwordStatus}`}
        strokeWidth={6}
        percent={value.length * 10 > 100 ? 100 : value.length * 10}
        showInfo={false}
      />
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible, registerSuccess } = this.state;

    if (registerSuccess) {
      return <Success />;
    }
    return (
      <Layout className="full-layout register-page login-page">
        <Content>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="user-img">
              <img src={logoImg} alt="logo" />
              <b>LANIF</b>
              <span>Admin</span>
            </div>
            <FormItem>
              {getFieldDecorator('mail', {
                rules: [
                  {
                    required: true,
                    message: '请输入邮箱地址！'
                  },
                  {
                    type: 'email',
                    message: '邮箱地址格式错误！'
                  }
                ]
              })(<Input size="large" placeholder="邮箱" />)}
            </FormItem>
            <FormItem help={help}>
              <Popover
                content={
                  <div style={{ padding: '4px 0' }}>
                    {passwordStatusMap[this.getPasswordStatus()]}
                    {this.renderPasswordProgress()}
                    <div style={{ marginTop: 10 }}>
                      请至少输入 6 个字符。请不要使用容易被猜到的密码。
                    </div>
                  </div>
                }
                overlayStyle={{ width: 240 }}
                placement="right"
                visible={visible}
              >
                {getFieldDecorator('password', {
                  rules: [
                    {
                      validator: this.checkPassword
                    }
                  ]
                })(
                  <Input
                    size="large"
                    type="password"
                    placeholder="至少6位密码，区分大小写"
                  />
                )}
              </Popover>
            </FormItem>
            <FormItem>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认密码！'
                  },
                  {
                    validator: this.checkConfirm
                  }
                ]
              })(<Input size="large" type="password" placeholder="确认密码" />)}
            </FormItem>
            <FormItem>
              <InputGroup compact>
                <Select
                  size="large"
                  value={prefix}
                  onChange={this.changePrefix}
                  style={{ width: '20%' }}
                >
                  <Option value="86">+86</Option>
                  <Option value="87">+87</Option>
                </Select>
                {getFieldDecorator('mobile', {
                  rules: [
                    {
                      required: true,
                      message: '请输入手机号！'
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误！'
                    }
                  ]
                })(
                  <Input
                    size="large"
                    style={{ width: '80%' }}
                    placeholder="11位手机号"
                  />
                )}
              </InputGroup>
            </FormItem>
            <FormItem>
              <Row gutter={8}>
                <Col span={16}>
                  {getFieldDecorator('captcha', {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码！'
                      }
                    ]
                  })(<Input size="large" placeholder="验证码" />)}
                </Col>
                <Col span={8}>
                  <Button
                    className="getCaptcha"
                    size="large"
                    disabled={count}
                    onClick={this.onGetCaptcha}
                  >
                    {count ? `${count} s` : '获取验证码'}
                  </Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button
                size="large"
                loading={submitting}
                className="register-form-button"
                type="primary"
                htmlType="submit"
              >
                注册
              </Button>
              <Link className="fr" to="/sign/login">
                使用已有账户登录
              </Link>
            </FormItem>
          </Form>
        </Content>
      </Layout>
    );
  }
}
