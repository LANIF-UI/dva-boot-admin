import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Row, Col, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Form from 'components/Form';
import PageHelper from '@/utils/pageHelper';
import $$ from 'cmn-utils';
import {
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6,
  columns7,
  columns8,
  columns9,
  createColumns10,
  createColumns11
} from './columns';
const { Content } = Layout;

@connect(({ form }) => ({
  form
}))
export default class extends BaseComponent {
  state = {
    pageData: PageHelper.create()
  };

  componentDidMount() {
    const { pageData } = this.state;
    const pageInfo = pageData.startPage(1, 10);

    $$.post('/datatable/getList', PageHelper.requestFormat(pageInfo)).then(resp => {
      const data = PageHelper.responseFormat(resp);
      const newPageData = Object.assign(pageData, data);
      this.setState({
        pageData: newPageData
      });
    });
  }

  onSubmit(values) {
    console.log(values);
  }

  onLoadData = treeNode => {
    const treeData = [...this.props.form.treeData];
    return new Promise(resolve => {
      this.props.dispatch({
        type: 'form/@request',
        afterResponse: resp => {
          const loop = data => {
            data.forEach(item => {
              if (item.children) {
                loop(item.children);
              } else if (treeNode.props.eventKey === item.key) {
                item.children = resp.data;
              }
            });
          };
          loop(treeData);
          resolve();
          return treeData;
        },
        payload: {
          valueField: 'treeData',
          url: '/tree/getAsyncTreeSelect',
          data: treeNode.props.eventKey
        }
      });
    });
  };

  onLoadTableData = ({ pageNum, pageSize }) => {
    const { pageData } = this.state;
    const pageInfo = pageData.jumpPage(pageNum, pageSize);

    return $$.post('/datatable/getList', PageHelper.requestFormat(pageInfo)).then(resp => {
      const data = PageHelper.responseFormat(resp);
      return Object.assign(pageData, data);
    });
  }

  render() {
    const { treeData } = this.props.form;

    const record1 = {
      id: 123,
      roleType: '2', // 类型不能错，不能是数字的2
      roleName: '管理员'
    };
    const columns10 = createColumns10(this, treeData);
    const columns11 = createColumns11(this, this.state.pageData);
    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="说明">
            <h3>Form 用法</h3>
            <p>
              Form通常结合<Link to="/column">Columns</Link>来使用，由Columns定义其数据结构，
              支持多种类型数据(<code>
                cascade，date，editor，text，textarea，password，select，transfer，transferTree，treeSelect，table,
                custom(自定义)
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
              <Panel title="级联&下拉树">
                <Form columns={columns10} onSubmit={this.onSubmit} />
              </Panel>
            </Col>

            <Col span={12}>
              <Panel title="下拉框绑定到容器中，滚动时不会串位">
                <Form appendTo columns={columns1} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="自定义类型">
                <Form columns={columns9} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="Table类型，用于大数据量选择">
                <Form columns={columns11} onSubmit={this.onSubmit} />
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
