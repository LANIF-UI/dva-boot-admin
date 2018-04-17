import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import { Switch } from 'dva/router';
import { Notification } from 'components';
import NavBar from 'components/NavBar';
import LeftSideBar from 'components/LeftSideBar';
import TopBar from 'components/TopBar';
import './styles/basic.less';
const { Content, Header } = Layout;

@connect()
export default class BasicLayout extends React.PureComponent {
  state = {
    collapsedLeftSide: false,
    leftCollapsedWidth: 60,
    expandTopBar: false,
  };

  componentDidMount() {}

  onCollapseLeftSide = _ => {
    this.setState({
      collapsedLeftSide:
        this.state.leftCollapsedWidth === 0
          ? true
          : !this.state.collapsedLeftSide,
      leftCollapsedWidth: 60
    });
  };

  onCollapseLeftSideAll = _ => {
    this.setState({
      collapsedLeftSide: true,
      leftCollapsedWidth: 0
    });
  };

  onExpandTopBar = _ => {
    this.setState({
      expandTopBar: true
    })
  }

  onCollapseTopBar = _ => {
    this.setState({
      expandTopBar: false
    })
  }

  render() {
    const { collapsedLeftSide, leftCollapsedWidth, expandTopBar } = this.state;
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
          <NavBar
            collapsed={collapsedLeftSide}
            onCollapseLeftSide={this.onCollapseLeftSide}
            onExpandTopBar={this.onExpandTopBar}
          />
        </Header>
        <Layout>
          <LeftSideBar
            collapsed={collapsedLeftSide}
            leftCollapsedWidth={leftCollapsedWidth}
            onCollapsed={this.onCollapseLeftSideAll}
          />
          <Content>
            <Layout className="full-layout">
              <Header>
                <TopBar expand={expandTopBar}/>
              </Header>
              <Content>
                <Switch>{childRoutes}</Switch>
              </Content>
            </Layout>
          </Content>
        </Layout>
        <Notification />
        {expandTopBar ? <div className="basic-mask animated fadeIn" onClick={this.onCollapseTopBar} /> : null}
      </Layout>
    );
  }
}
