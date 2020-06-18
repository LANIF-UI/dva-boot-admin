import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Image from 'components/Image';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page base-component-page">
        <Content>
          <Panel title="Image / 图片">
            <p>图片相关组件</p>
          </Panel>
          <Panel title="图片预览">
            <Image
              style={{ width: 200 }}
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              previewList={[
                'https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=600',
                'https://images.pexels.com/photos/39493/animals-cat-girl-happiness-39493.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=600'
              ]}
            />
          </Panel>
        </Content>
      </Layout>
    );
  }
}
