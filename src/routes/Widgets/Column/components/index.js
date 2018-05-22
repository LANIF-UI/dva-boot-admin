import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page column-page">
        <Content>
          <Panel title="说明">
            <h3>Column 语法</h3>
            <p>
              通过配制Column可同时生成我们页面中的三大块元素、搜索条（高级搜索）组件、新增修改的表单组件、带分页的数据表格组件。
              <a
                style={{ textDecoration: 'underline' }}
                href="https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/columns.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                [配置说明]
              </a>
            </p>
            <Button
              icon="bulb"
              type="primary"
              onClick={_ => this.history.push('/crud')}
            >
              CRUD页面
            </Button>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
