import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import './index.less';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page <%=namespace %>-page">
        <Content>Route created success, happy work!</Content>
      </Layout>
    );
  }
}
