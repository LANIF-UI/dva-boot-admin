import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Row, Col, Tree } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import SideLayout from 'components/SideLayout';
import DataTable from 'components/DataTable';
import { columns1, columns2, columns3, columns4 } from './columns';
import './index.less';
const { Content } = Layout;
const Pagination = DataTable.Pagination;
const TreeNode = Tree.TreeNode;

@connect(({ datatable, loading }) => ({
  datatable,
  loading: loading.models.datatable
}))
export default class extends BaseComponent {
  componentDidMount() {
    const { dispatch, datatable } = this.props;
    const { pageData, pageDataSort } = datatable;

    dispatch({
      type: 'datatable/@request',
      payload: {
        valueField: 'pageData',
        url: '/datatable/getList',
        pageInfo: pageData.startPage(1, 10)
      }
    });

    dispatch({
      type: 'datatable/@request',
      afterResponse: resp => resp.data,
      payload: {
        valueField: 'deptTreeData',
        url: '/tree/getDept'
      }
    });

    dispatch({
      type: 'datatable/@request',
      afterResponse: resp => resp.data,
      payload: {
        valueField: 'dataList',
        url: '/datatable/frontPaging'
      }
    });

    dispatch({
      type: 'datatable/@request',
      payload: {
        valueField: 'pageDataSort',
        url: '/datatable/getList',
        pageInfo: pageDataSort.startPage(1, 10)
      }
    });
  }

  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  };

  onSelectTreeNode = (selectedKeys, info) => {
    console.log('onSelect', selectedKeys);

    // 模拟请求
    const { dispatch, datatable } = this.props;
    const { pageData } = datatable;
    dispatch({
      type: 'datatable/@request',
      payload: {
        valueField: 'pageData',
        url: '/datatable/getList',
        pageInfo: pageData.startPage(1, 10)
      }
    });
  };

  render() {
    const { datatable, loading } = this.props;
    const { pageData, deptTreeData, dataList, pageDataSort } = datatable;
    const dataTableProps1 = {
      loading,
      columns: columns1,
      rowKey: 'id',
      dataItems: pageData,
      onChange: ({ pageNum, pageSize }) => {}
    };

    const dataTableProps2 = {
      loading,
      columns: columns1,
      rowKey: 'id',
      dataItems: pageData,
      selectType: 'checkbox',
      showNum: true,
      isScroll: true
    };

    const dataTableProps3 = {
      loading,
      columns: columns2,
      rowKey: 'id',
      dataItems: pageData,
      isScroll: true
    };

    const dataTableProps4 = {
      loading,
      columns: columns3,
      rowKey: 'id',
      selectType: 'radio',
      dataItems: pageData,
      showNum: true
    };

    const dataTableProps5 = {
      loading,
      columns: columns1,
      rowKey: 'id',
      dataItems: dataList,
      showNum: true
    };

    const dataTableProps6 = {
      loading,
      columns: columns4,
      rowKey: 'id',
      dataItems: pageDataSort,
      onChange: ({ pageNum, pageSize, sorter }) => {
        this.props.dispatch({
          type: 'datatable/@request',
          payload: {
            valueField: 'pageDataSort',
            url: '/datatable/getList',
            pageInfo: pageDataSort.sortBy(sorter).jumpPage(pageNum, pageSize),
          }
        });
      },
      isScroll: true
    };

    return (
      <Layout className="full-layout page datatable-page">
        <Content>
          <Panel title="说明">
            <h3>DataTable 用法</h3>
            <p>
              DataTable通常结合<Link to="/column">Columns</Link>
              来使用，由Columns定义其数据结构，支持多种类型数据，扩展自antd的Table组件，可以使用Table的api。
            </p>
          </Panel>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="基本用法">
                <DataTable {...dataTableProps1} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="内部分页">
                <DataTable pagination {...dataTableProps1} />
              </Panel>
            </Col>
          </Row>
          <Panel title="外部分页">
            <DataTable {...dataTableProps1} />
            <div className="footer">
              <Pagination {...dataTableProps1} />
            </div>
          </Panel>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="行号,初始值">
                <DataTable {...dataTableProps2} selectedRowKeys={[1, 2, 4]} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="列提示&宽度">
                <DataTable {...dataTableProps3} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={6}>
              <Panel title="数据字典&单选">
                <DataTable {...dataTableProps4} />
              </Panel>
            </Col>
            <Col span={18}>
              <Panel title="左侧树联动">
                <SideLayout
                  title="组织机构"
                  sideContent={
                    <Tree onSelect={this.onSelectTreeNode}>
                      {this.renderTreeNodes(deptTreeData)}
                    </Tree>
                  }
                >
                  <DataTable {...dataTableProps1} />
                </SideLayout>
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={10}>
              <Panel title="前台分页" height={500} scroll>
                <DataTable pagination={{ pageSize: 20 }} {...dataTableProps5} />
              </Panel>
            </Col>
            <Col span={14}>
              <Panel title="排序" height={500} scroll>
                <DataTable {...dataTableProps6} />
                <div className="footer">
                  <Pagination {...dataTableProps6} />
                </div>
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
