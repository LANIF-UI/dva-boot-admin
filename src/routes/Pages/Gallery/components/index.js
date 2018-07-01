import React, { Component } from 'react';
import WaterFall from 'components/WaterFall';
import { Layout, Card } from 'antd';
import './index.less';
const { Meta } = Card;
const { Content } = Layout;

class Gallery extends Component {
  state = {
    dataSource: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
  };
  render() {
    const { dataSource } = this.state;
    return (
      <Layout className="full-layout gallery-page">
        <Content>
          <WaterFall
            className="gallery-water-fall"
            dataSource={dataSource}
            columnWidth={240}
            fitWidth
            gutter={16}
            render={item => (
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            )}
          />
        </Content>
      </Layout>
    );
  }
}

export default Gallery;
