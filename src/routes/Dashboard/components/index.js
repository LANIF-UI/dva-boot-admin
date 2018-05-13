import React from 'react';
import { connect } from 'dva';
import { Layout, Col, Row } from 'antd';
import Icon from 'components/Icon';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Charts, { Bar } from 'components/Charts';
import { Axis, Geom, Tooltip } from 'bizcharts';
import './index.less';
const { Content } = Layout;

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
                <Bar data={salesData} scale={salesCols} />
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
