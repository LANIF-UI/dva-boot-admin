import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import './index.less';
const { Content } = Layout;

@connect()
export default class Blank extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout blank-page">
        <Content>空白页</Content>
      </Layout>
    );
  }
}
