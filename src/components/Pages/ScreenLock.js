import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import PatternLock from '../PatternLock';
import logoImg from 'assets/images/logo.png';
import './style/index.less';
const { Content } = Layout;

/**
 * 锁屏界面
 */
class ScreenLock extends PureComponent {
  render() {
    return (
      <Layout className="full-layout screen-lock-page">
        <Content>
          <div class="container">
            <div class="pattern-logo">
              <a href="">
                <img src="images/logo1.png" alt="" />
              </a>
            </div>
            <div class="patter-container">
              <span>Draw Your Pattern</span>
              <PatternLock />
            </div>
          </div>
          <div class="clock">
            <div id="Date" />

            <ul>
              <li id="hours"> </li>
              <li class="point">:</li>
              <li id="min"> </li>
              <li class="point">:</li>
              <li id="sec"> </li>
            </ul>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default ScreenLock;
