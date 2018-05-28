import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Row, Col } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import DataTable from 'components/DataTable';
import { columns1, columns2, columns3 } from './columns';
import './index.less';
const { Content } = Layout;
const Pagination = DataTable.Pagination;

@connect(({ datatable, loading }) => ({
  datatable,
  loading: loading.models.datatable
}))
export default class extends BaseComponent {
  componentWillMount() {
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
  }

  render() {
    const { datatable, loading } = this.props;
    const { pageData } = datatable;
    const dataTableProps1 = {
      loading,
      columns: columns1,
      rowKey: 'id',
      dataItems: pageData,
      onChange: ({pageNum, pageSize}) => {},
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
      isScroll: true,
    };

    const dataTableProps4 = {
      loading,
      columns: columns3,
      rowKey: 'id',
      selectType: 'radio',
      dataItems: pageData,
      showNum: true,
    };

    return (
      <Layout className="full-layout page datatable-page">
        <Content>
          <Panel title="说明">
            <h3>DataTable 用法</h3>
            <p>
              DataTable通常结合<Link to="/column">Columns</Link>来使用，由Columns定义其数据结构，支持多种类型数据，扩展自antd的Table组件，可以使用Table的api。
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
              <Panel title="行号">
                <DataTable {...dataTableProps2} />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="列提示&宽度">
                <DataTable {...dataTableProps3} />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="数据字典&单选">
                <DataTable {...dataTableProps4} />
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
