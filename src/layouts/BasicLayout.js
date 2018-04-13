import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import { Switch } from 'dva/router';
import { Notification } from 'components';
import NavBar from 'components/NavBar';
import './styles/basic.less';
const { Content, Header, Sider } = Layout;

@connect()
export default class BasicLayout extends React.PureComponent {
  componentDidMount() {
  }

  render() {
    const { routerData } = this.props;
    const { childRoutes } = routerData;
    let allpath = this.props.location.pathname + this.props.location.search;
    if (allpath.indexOf('details?type=1') !== -1) {
      allpath = '/workCheck?type=1';
    } else if (allpath.indexOf('details?type=2') !== -1) {
      allpath = '/workCheck?type=2';
    }

    return (
      <Layout className="full-layout basic-layout">
        <Header>
          <NavBar />
        </Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>
            <Switch>
              {childRoutes}
            </Switch>
          </Content>
        </Layout>
        <Notification />
      </Layout>
    );
  }
}