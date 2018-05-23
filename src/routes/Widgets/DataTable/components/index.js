import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import { } from './columns';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="说明">
            <h3>DataTable 用法</h3>
            <p>
              DataTable通常结合<Link to="/column">Columns</Link>来使用，由Columns定义其数据结构，支持多种类型数据。
            </p>
          </Panel>
        </Content>
      </Layout>
    );
  }
}