import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import TransferTree from 'components/TransferTree';
import $$ from 'cmn-utils';
const { Content } = Layout;

@connect(({ transferTree, loading }) => ({
  transferTree,
  loading: loading.models.transferTree
}))
export default class extends BaseComponent {
  onLoadData = treeNode => {
    const { asyncDataSource } = this.props.transferTree;
    return new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
        return asyncDataSource;
      }
      this.props.dispatch({
        type: 'transferTree/@request',
        afterResponse: ({ data }) => {
          treeNode.props.dataRef.children = data;
          resolve();
          return asyncDataSource;
        },
        payload: {
          valueField: 'asyncDataSource',
          url: '/tree/getAsyncData',
          data: treeNode.props.eventKey
        }
      });
    });
  };

  onAsyncSearch = searchText => {
    return $$.post('/tree/getAsyncSearchData', {search: searchText}).then(({data}) => data);
  }

  render() {
    const { dataSource, asyncDataSource } = this.props.transferTree;
    const { loading } = this.props;
    return (
      <Layout className="full-layout page transfer-tree-page">
        <Content>
          <Row gutter={20}>
            <Col span="12">
              <Panel title="树型穿缩框">
                <TransferTree dataSource={dataSource} loading={loading} />
              </Panel>
            </Col>
            <Col span="12">
              <Panel title="异步树型穿缩框">
                <TransferTree
                  dataSource={asyncDataSource}
                  loadData={this.onLoadData}
                  asyncSearch={this.onAsyncSearch}
                  loading={loading}
                  showSearch
                />
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span="12">
              <Panel title="默认值 targetNodes">
                <TransferTree
                  dataSource={dataSource}
                  loading={loading}
                  targetNodes={[
                    { key: '110101', title: '东城区' },
                    { key: '110102', title: '西城区' }
                  ]}
                  showSearch
                />
              </Panel>
            </Col>
            <Col span="12" />
          </Row>
        </Content>
      </Layout>
    );
  }
}
