import React from 'react';
import { connect } from 'dva';
import { Layout, Col, Row } from 'antd';
import Icon from 'components/Icon';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Charts from 'components/Charts';
import './index.less';
const { Content } = Layout;

@connect()
export default class Dashboard extends BaseComponent {
  render() {
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
              <Panel title="数据面板组件">
                <Charts />
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
