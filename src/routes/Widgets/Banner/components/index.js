import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import BannerMng from 'components/BannerMng';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  state = {
    dataSource: [
      {title: '1', link: '/abc', file: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-599347.jpg'},
      {title: '2', link: '/abd', file: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-255412.jpg'},
      {title: '3', link: '/abe', file: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-94129.jpg'},
      {title: '4', link: '/abf', file: 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-205394.jpg'}
    ]
  }

  onChange = datas => {
    console.log(datas);
  }

  render() {
    const { dataSource } = this.state;
    return (
      <Layout className="full-layout page banner-page">
        <Content>
          <BannerMng dataSource={dataSource} onChange={this.onChange} />
          <br />
          <BannerMng onChange={this.onChange} />
        </Content>
      </Layout>
    );
  }
}
