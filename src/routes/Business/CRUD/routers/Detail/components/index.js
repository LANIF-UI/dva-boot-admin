import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page blank-page">
        <Content>详情页</Content>
      </Layout>
    );
  }
}
