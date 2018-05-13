import React from 'react';
import { connect } from 'dva';
import { Layout, Col, Row } from 'antd';
import Icon from 'components/Icon';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import { Bar } from 'components/Charts';
import './index.less';
const { Content } = Layout;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect()
export default class Dashboard extends BaseComponent {
  render() {
    const salesData = [
      { x: '1951 年', y: 38 },
      { x: '1952 年', y: 52 },
      { x: '1956 年', y: 61 },
      { x: '1957 年', y: 145 },
      { x: '1958 年', y: 48 },
      { x: '1959 年', y: 38 },
      { x: '1960 年', y: 38 },
      { x: '1962 年', y: 38 },
    ];
    const salesCols = {
      'y': { tickInterval: 20 },
    };

    return (
      <Layout className="full-layout page dashboard-page">
        <Content>
          <Row gutter={20}>
            <Col span={6}>
              <Panel className="qq" header={false} cover>
                <Icon type="qq" antd />
                <h2>
                  <b>523</b>
                </h2>
                <h5 className="text-muted">QQ</h5>
              </Panel>
            </Col>
            <Col span={6}>
              <Panel className="wechat" header={false} cover>
                <Icon type="wechat" antd />
                <h2>
                  <b>99+</b>
                </h2>
                <h5 className="text-muted">微信</h5>
              </Panel>
            </Col>
            <Col span={6}>
              <Panel className="skype" header={false} cover>
                <Icon type="skype" antd />
                <h2>
                  <b>2</b>
                </h2>
                <h5 className="text-muted">skype</h5>
              </Panel>
            </Col>
            <Col span={6}>
              <Panel className="github" header={false} cover>
                <Icon type="github" antd />
                <h2>
                  <b>999</b>
                </h2>
                <h5 className="text-muted">github</h5>
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col>
              <Panel title="数据面板组件" height={300}>
                <div className="flex">
                  <div className="flex-auto-hidden flex flex-column">
                    <h4 className="flex-none">销售额分布</h4>
                    <div className="flex-auto-hidden">
                      <Bar data={salesData} scale={salesCols} />  
                    </div>
                  </div>
                  <div className="flex-none sales-order">
                    <h4>门店销售额排名</h4>
                    <ul>
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span>{i + 1}</span>
                          <span>{item.title}</span>
                          <span>{item.total}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
