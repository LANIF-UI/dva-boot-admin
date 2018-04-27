import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import './index.less';

@connect(({ work, loading }) => ({
  work,
  loading: loading.models.work,
}))
export default class Work extends BaseComponent {
  state = {
    record: null,
    visible: false,
    rows: [],
    persons: [],
    treeData: [],
  }

  componentDidMount() {
  }

  render() {
    return (
      <Layout className="full-layout work-page">
      </Layout>
    )
  }
}