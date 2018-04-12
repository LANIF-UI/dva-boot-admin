import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import './style.less';

@connect(({ login, loading }) => ({
  login,
  loading: loading.models.login,
}))
export default class Login extends Component {
  onLogin = () => {
    this.props.dispatch({
      type: 'login/login',
      payload: {
        name: document.querySelector("#name").value,
        password: document.querySelector("#password").value,
      }
    })
  }

  render() {
    const { loading, login } = this.props;
    const { loggedIn, message } = login;
    return (
      <div className="login-page">
        <Spin />
      </div>
    )
  }
}