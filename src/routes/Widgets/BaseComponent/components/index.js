import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page base-component-page">
        <Content>
          <Panel title="说明">
            <h2>BaseComponent</h2>
            <p>所有路由页面都可以使用的基类，可以提取公共方法放到此类中，如基本的CRUD方法，路由跳转，基本弹窗等</p>
            <h3>Notice</h3>
            <Button.Group>
              <Button onClick={_ => this.notice.success('I‘m Hero')}>成功</Button> 
              <Button onClick={_ => this.notice.error('I‘m Hero')}>失败</Button> 
              <Button onClick={_ => this.notice.warning('I‘m Hero')}>注意</Button> 
              <Button onClick={_ => this.notice.info('I‘m Hero')}>通知</Button> 
            </Button.Group>
            <h3>Router</h3>
            <Button onClick={_ => this.history.push('/')}>回到首页</Button>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
