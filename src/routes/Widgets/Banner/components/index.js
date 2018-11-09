import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import BannerMng from 'components/BannerMng';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  onChange = datas => {
    console.log(datas);
  }

  render() {
    return (
      <Layout className="full-layout page banner-page">
        <Content>
          <BannerMng rowKey="abc" onChange={this.onChange} />
        </Content>
      </Layout>
    );
  }
}
