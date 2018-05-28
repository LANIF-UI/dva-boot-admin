import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Row, Col, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Form from 'components/Form';
import {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6,
  columns7,
  columns8,
  columns9
} from './columns';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  onSubmit(values) {
    console.log(values);
  }

  render() {
    const record1 = {
      id: 123,
      roleType: '2', // 类型不能错，不能是数字的2
      roleName: '管理员'
    };

    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="说明">
            <h3>Form 用法</h3>
            <p>
              Form通常结合<Link to="/column">Columns</Link>来使用，由Columns定义其数据结构，
              支持多种类型数据(<code>
                cascade，date，editor，text，textarea，password，select，transfer，transferTree，treeSelect，custom(自定义)
              </code>)， 扩展自antd的Form组件，可以使用其api。
            </p>
          </Panel>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="简单用法">
                <Form columns={columns1} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="赋值">
                <Form
                  columns={columns1}
                  record={record1}
                  onSubmit={this.onSubmit}
                />
              </Panel>
            </Col>
          </Row>
          <Panel title="行内样式">
            <Form type="inline" columns={columns1} onSubmit={this.onSubmit} />
          </Panel>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="初始值">
                <Form columns={columns2} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="表单验证">
                <Form columns={columns3} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="用户登录">
                <Form columns={columns4} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="用户注册">
                <Form columns={columns5} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="日期时间">
                <Form columns={columns6} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="多列（使用col和formItemLayout）">
                <Form columns={columns7} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="自定义提交按钮">
                <Form
                  ref="form"
                  columns={columns5}
                  footer={
                    <Button
                      style={{ display: 'block', margin: '0 auto' }}
                      size="large"
                      onClick={this.onCustomSubmit}
                    >
                      注册
                    </Button>
                  }
                />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="穿梭框">
                <Form columns={columns8} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="自定义类型">
                <Form columns={columns9} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
