import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import './index.less';

@connect()
export default class Dashboard extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout dashboard-page">
        <Panel title="数据面板组件" width={300} />
      </Layout>
    )
  }
}