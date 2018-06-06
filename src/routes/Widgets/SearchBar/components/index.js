import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Row, Col } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import SearchBar from 'components/SearchBar';
import {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6
} from './columns';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  onSearch(values, isReset) {
    console.log(values, isReset);
  }

  render() {
    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="说明">
            <h3>SearchBar 用法</h3>
            <p>
              SearchBar通常结合<Link to="/column">Columns</Link>来使用，由Columns定义其数据结构，支持多种类型数据
            </p>
          </Panel>
          <Panel title="行内搜索">
            <SearchBar columns={columns1} onSearch={this.onSearch} />
          </Panel>
          <Panel title="日期时间">
            <SearchBar columns={columns3} onSearch={this.onSearch} />
          </Panel>
          <Panel title="级联, 下拉树">
            <SearchBar columns={columns5} onSearch={this.onSearch} />
          </Panel>
          <Panel title="栅格样式&下拉框附加到表单上">
            <Row gutter={20}>
              <Col span={12}>
                <SearchBar
                  appendTo
                  columns={columns2}
                  type="grid"
                  onSearch={this.onSearch}
                  cols={{span: 8}}
                />
              </Col>
              <Col span={12}>
                <SearchBar
                  columns={columns3}
                  type="grid"
                  onSearch={this.onSearch}
                  cols={{span: 24}}
                />
              </Col>
            </Row>
          </Panel>
          <Panel title="多个条件">
            <SearchBar
              columns={columns4}
              type="grid"
              onSearch={this.onSearch}
            />
          </Panel>
          <Panel title="自定义类型">
            <SearchBar
              columns={columns6}
              type="grid"
              onSearch={this.onSearch}
            />
          </Panel>
        </Content>
      </Layout>
    );
  }
}
