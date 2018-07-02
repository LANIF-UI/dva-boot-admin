import React, { Component } from 'react';
import WaterFall from 'components/WaterFall';
import LazyLoad from 'components/LazyLoad';
import { Layout, Card } from 'antd';
import './index.less';
const { Meta } = Card;
const { Content } = Layout;


class Gallery extends Component {
  state = {
    dataSource: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
  };

  componentDidMount() {
    const self = this;
    document.addEventListener('lazybeforeunveil', ({target}) => {
      self.water.layout();
    });
  }
  
  render() {
    const { dataSource } = this.state;
    return (
      <Layout className="full-layout gallery-page">
        <Content>
          <WaterFall
            ref="waterFall"
            className="gallery-water-fall"
            dataSource={dataSource}
            columnWidth={240}
            fitWidth
            gutter={16}
            getInstance={water => this.water = water}
            render={item => (
              <Card
                hoverable
                cover={
                  <LazyLoad dataSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
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
