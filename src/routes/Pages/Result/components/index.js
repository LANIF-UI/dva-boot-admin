import React, { Component } from 'react';
import { Result } from 'components/Pages';
import { Layout } from 'antd';
const { Content } = Layout;

export default class extends Component {
  render() {
    return (
      <Layout className="full-layout result-page">
        <Content>
          <Result title="提交成功">

          </Result>
        </Content>
      </Layout>
    );
  }
}
