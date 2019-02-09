import React from 'react';
import { connect } from 'dva';
import { Link, Switch } from 'dva/router';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import './index.less';
const { Content, Header } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    const {routerData} = this.props;
    const {childRoutes} = routerData;
    return (
      <Layout className="full-layout page level-route-page">
        <Header>
          <Link className="sub-route-link" to="/level-route">一级跳转</Link>
          <Link className="sub-route-link" to="/level-route/sub-route">二级跳转</Link>
        </Header>
        <Content>
          <Switch>{childRoutes}</Switch> 
        </Content>
      </Layout>
    );
  }
}
