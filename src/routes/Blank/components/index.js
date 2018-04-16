import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import './index.less';

@connect()
export default class Blank extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout blank-page">
        Blank Page
      </Layout>
    )
  }
}