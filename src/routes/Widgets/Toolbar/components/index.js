import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Icon } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import createColumns from './columns';
import './index.less';
const { Content } = Layout;

/**
 * 工具条
 */
@connect()
export default class extends BaseComponent {
  render() {
    const columns = createColumns(this);

    const searchBarProps = {
      columns,
      onSearch: (values) => {
        console.log(values)
      }
    };

    return (
      <Layout className="full-layout page toolbar-page">
        <Content>
          <Panel title="基本用法">
            <Toolbar 
              className="toolbar-demo"
              appendLeft={
                <Button.Group>
                  <Button type="primary"><Icon type="plus" />新增</Button>
                  <Button><Icon type="delete" />删除</Button>
                </Button.Group>
              }
            />
          </Panel>
          <Panel title="组合SearchBar">
            <Toolbar 
              className="toolbar-demo"
              appendLeft={
                <Button.Group>
                  <Button type="primary"><Icon type="plus" />新增</Button>
                  <Button><Icon type="delete" />删除</Button>
                </Button.Group>
              }
            >
              <SearchBar {...searchBarProps} />
            </Toolbar>
          </Panel>
          <Panel title="组合SearchBar，并可下拉展示更多">
            <Toolbar 
              className="toolbar-demo"
              appendLeft={
                <Button.Group>
                  <Button type="primary"><Icon type="plus" />新增</Button>
                  <Button><Icon type="delete" />删除</Button>
                </Button.Group>
              }
              pullDown={
                <SearchBar type="grid" {...searchBarProps} />
              }
            >
              <SearchBar {...searchBarProps} group='1' />
            </Toolbar>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
