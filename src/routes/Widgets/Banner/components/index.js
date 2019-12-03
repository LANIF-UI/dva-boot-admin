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
      {title: '1', link: '/abc', file: 'https://files.vlad.studio/sequoia/joy/merry_xmas_moon/thumbs/1024x1024.jpg'},
      {title: '2', link: '/abd', file: 'https://files.vlad.studio/sequoia/joy/autumn_gradient/thumbs/1024x1024.jpg'},
      {title: '3', link: '/abe', file: 'https://files.vlad.studio/sequoia/joy/tinyliving/thumbs/1024x1024.jpg'},
      {title: '4', link: '/abf', file: 'https://files.vlad.studio/sequoia/joy/little_quetzal/thumbs/1024x1024.jpg'}
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
