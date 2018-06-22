import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import { normal, antdNotice } from 'components/Notification';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page base-component-page">
        <Content>
          <Panel title="Notification / 通知">
            <p>我们默认包含了两种通知样式，当您的组件继承于BaseCompoent时，可使用this.notice发出config.js中配置的默认通知样式，或者可以通过实现Notification接口实现自已的通知类</p>
          </Panel>
          <Panel title="Normal notice">
            <Button.Group>
              <Button onClick={_ => normal.success('I‘m Hero')}>成功</Button> 
              <Button onClick={_ => normal.error('I‘m Hero')}>失败</Button> 
              <Button onClick={_ => normal.warning('I‘m Hero')}>注意</Button> 
              <Button onClick={_ => normal.info('I‘m Hero')}>通知</Button> 
            </Button.Group>
          </Panel>
          <Panel title="Antd notice">
            <Button.Group>
              <Button onClick={_ => antdNotice.success('I‘m Hero')}>成功</Button> 
              <Button onClick={_ => antdNotice.error('I‘m Hero')}>失败</Button> 
              <Button onClick={_ => antdNotice.warning('I‘m Hero')}>注意</Button> 
              <Button onClick={_ => antdNotice.info('I‘m Hero')}>通知</Button> 
            </Button.Group>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
