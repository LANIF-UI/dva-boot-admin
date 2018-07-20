import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Button from 'components/Button';
import Panel from 'components/Panel';
const { Content } = Layout;
const Ripple = Button.Ripple;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page button-page">
        <Content>
          <Panel title="AntD Button">
            <Button type="primary">Primary</Button>&nbsp;
            <Button>Default</Button>&nbsp;
            <Button type="dashed">Dashed</Button>&nbsp;
            <Button type="danger">Danger</Button>
          </Panel>
          <Panel title="Ripple Button (Material Design)">
            <Ripple>Button</Ripple>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
