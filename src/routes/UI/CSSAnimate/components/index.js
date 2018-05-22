import React from 'react';
import { connect } from 'dva';
import { Layout, Tabs } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Icon from 'components/Icon';
import './index.less';
const { Content, Sider } = Layout;
const TabPane = Tabs.TabPane;

@connect()
export default class extends BaseComponent {
  render() {
    const sidebarStyle = {
      borderRight: '1px solid #ddd',
      background: '#f5f5f5'
    };
    return (
      <Layout className="full-layout page css-animate-page">
        <Sider width={350} style={sidebarStyle}>
          <div>
            <h4>使用 Animations.CSS</h4>
            <ul className="icon-list">
              <li>
                <Icon type="exclamation-circle" antd />
                <b> Author:</b> Daniel Eden.
              </li>
              <li>
                <p>
                  <Icon type="exclamation-circle" antd />
                  <b>Website:</b>
                  <a href="http://daneden.github.io/animate.css/">www.github.com/animate</a>
                </p>
              </li>
            </ul>
          </div>
          <Tabs onChange={this.onChange} type="card">
            <TabPane tab="进场" key="1">进入</TabPane>
            <TabPane tab="退场" key="2">退出</TabPane>
            <TabPane tab="效果" key="3">效果</TabPane>
            <TabPane tab="用法" key="4">用法</TabPane>
          </Tabs>
        </Sider>
        <Content />
      </Layout>
    );
  }
}
