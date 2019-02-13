import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Button from 'components/Button';
import Panel from 'components/Panel';
import './index.less';
const { Content } = Layout;
const Ripple = Button.Ripple;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page button-page">
        <Content>
          <Panel title="AntD Button">
            <Button type="primary">Primary</Button>
            <Button tooltip="Tip!">Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="danger">Danger</Button>
          </Panel>
          <Panel title="Ripple Button (Material Design)">
            <div>
              <Ripple>Default</Ripple>
              <Ripple type="primary">Primary</Ripple>
              <Ripple type="danger">Danger</Ripple>
            </div>
            <div>
              <Ripple ghost>Default</Ripple>
              <Ripple ghost type="primary">Primary</Ripple>
              <Ripple ghost type="danger">Danger</Ripple>
            </div>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
