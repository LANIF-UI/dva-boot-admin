import React, { Component } from 'react';
import { connect, router } from 'dva';
import { Input, Button, Select, Row, Col, Popover, Progress, Layout, Form } from 'antd';
import './index.less';
import '../../Login/components/index.less';
import logoImg from 'assets/images/logo1.png';
import Success from './Success';
const { Link } = router;
const { Content } = Layout;

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
export default class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
    registerSuccess: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.register.status) {
      return {
        registerSuccess: true
      };
    }
    return null;
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
    if (!this.form) {
      return;
    }
    const value = this.form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = values => {
    const { dispatch } = this.props;
    const { prefix } = this.state;

    dispatch({
      type: 'register/submit',
      payload: {
        ...values,
        prefix
      }
    });
  };

  checkConfirm = (rule, value) => {
    if (value && value !== this.form.getFieldValue('password')) {
      this.setState({ confirmDirty: value });
      return Promise.reject('两次输入的密码不匹配!');
    } else {
      return Promise.resolve();
    }
  };

  checkPassword = (rule, value) => {
    if (!value) {
      this.setState({
        visible: !!value
      });
      return Promise.reject('请输入密码！');
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
        return Promise.reject('');
      } else {
        if (value && confirmDirty) {
          this.form.validateFields(['confirm'], { force: true });
        }
        return Promise.resolve();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value
    });
  };

  renderPasswordProgress = () => {
    if (!this.form) {
      return;
    }
    const value = this.form.getFieldValue('password');
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
    const { submitting } = this.props;
    const { count, prefix, help, visible, registerSuccess } = this.state;

    if (registerSuccess) {
      return <Success />;
    }
    return (
      <Layout className="full-layout register-page login-page">
        <Content>
          <Form ref={node => this.form = node} onSubmit={this.handleSubmit} className="login-form">
            <div className="user-img">
              <img src={logoImg} alt="logo" />
              <b>LANIF</b>
              <span>Admin</span>
            </div>
            <Form.Item name="mail" rules={[
              {
                required: true,
                message: '请输入邮箱地址！'
              },
              {
                type: 'email',
                message: '邮箱地址格式错误！'
              }
            ]}>
              <Input size="large" placeholder="邮箱" />
            </Form.Item>
            <Form.Item>
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
                <Form.Item name="password" help={help} noStyle rules={[
                  {
                    validator: this.checkPassword
                  }
                ]}>
                  <Input
                    size="large"
                    type="password"
                    placeholder="至少6位密码，区分大小写"
                  />
                </Form.Item>
              </Popover>
            </Form.Item>
            <Form.Item name="confirm" rules={[
              {
                required: true,
                message: '请确认密码！'
              },
              {
                validator: this.checkConfirm
              }
            ]}>
              <Input size="large" type="password" placeholder="确认密码" />
            </Form.Item>
            <Form.Item>
              <Input.Group compact>
                <Select
                  size="large"
                  value={prefix}
                  onChange={this.changePrefix}
                  style={{ width: '20%' }}
                >
                  <Select.Option value="86">+86</Select.Option>
                  <Select.Option value="87">+87</Select.Option>
                </Select>
                <Form.Item noStyle name="mobile" rules={[
                  {
                    required: true,
                    message: '请输入手机号！'
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！'
                  }
                ]}>
                  <Input
                    size="large"
                    style={{ width: '80%' }}
                    placeholder="11位手机号"
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item>
              <Row gutter={8}>
                <Col span={16}>
                  <Form.Item name="captcha" rules={[
                    {
                      required: true,
                      message: '请输入验证码！'
                    }
                  ]}>
                    <Input size="large" placeholder="验证码" />
                  </Form.Item>
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
            </Form.Item>
            <Form.Item>
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
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    );
  }
}
