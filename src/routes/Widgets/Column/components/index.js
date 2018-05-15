import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
const { Content } = Layout;

@connect()
export default class ColumnPage extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page column-page">
        <Content>
          <Panel title="说明">
            
          </Panel>
        </Content>
      </Layout>
    );
  }
}
