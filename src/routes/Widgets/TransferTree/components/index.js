import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import TransferTree from 'components/TransferTree';
import $$ from 'cmn-utils';
import './index.less';
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
    return $$.post('/tree/getAsyncSearchData', { search: searchText }).then(
      ({ data }) => data
    );
  };

  // 自定义样式树
  onCustomLoadData = treeNode => {
    const { customAsyncDataSource } = this.props.transferTree;
    return new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
        return customAsyncDataSource;
      }
      this.props.dispatch({
        type: 'transferTree/@request',
        afterResponse: ({ data }) => {
          treeNode.props.dataRef.children = data;
          resolve();
          return customAsyncDataSource;
        },
        payload: {
          valueField: 'customAsyncDataSource',
          url: '/tree/getCustomAsyncData',
          data: treeNode.props.eventKey
        }
      });
    });
  };

  onCustomChange = (targetKeys, targetNodes, e) => {
    if (e === 'OutOfMaxSize') {
      this.notice.warn("最多只能选择2人哦！");
    }
  };

  render() {
    const {
      dataSource,
      asyncDataSource,
      customAsyncDataSource
    } = this.props.transferTree;
    const { loading } = this.props;
    return (
      <Layout className="full-layout page transfer-tree-page">
        <Content>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="树型穿缩框">
                <TransferTree dataSource={dataSource} loading={loading} />
              </Panel>
            </Col>
            <Col span={12}>
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
            <Col span={12}>
              <Panel title="默认值 targetNodes">
                <TransferTree
                  dataSource={dataSource}
                  loading={loading}
                  targetNodes={[
                    { key: '341522', title: '霍邱县' },
                    { key: '340506', title: '博望区' }
                  ]}
                  showSearch
                />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="MAX & ICON">
                <TransferTree
                  className="my-theme"
                  titleText="组织架构"
                  dataSource={customAsyncDataSource}
                  loadData={this.onCustomLoadData}
                  asyncSearch={this.onAsyncSearch}
                  loading={loading}
                  max={2}
                  onChange={this.onCustomChange}
                  treeRender={item =>
                    typeof item.gender !== 'undefined' ? (
                      <span className="flex" style={{ alignItems: 'center' }}>
                        <span className={item.gender ? 'man' : 'woman'}></span>
                        <span>{item.title}</span>
                      </span>
                    ) : (
                      item.title
                    )
                  }
                  listRender={item => (
                    <div className="flex">
                      <span className={item.gender ? 'man' : 'woman'}></span>
                      <span>{item.title}</span>
                    </div>
                  )}
                />
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
