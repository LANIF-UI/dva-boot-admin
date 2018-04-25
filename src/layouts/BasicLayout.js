import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import { Switch } from 'dva/router';
import { Notification } from 'components';
import NavBar from 'components/NavBar';
import { LeftSideBar, RightSideBar } from 'components/SideBar';
import TopBar from 'components/TopBar';
import Mask from 'components/Mask';
import './styles/basic.less';
const { Content, Header } = Layout;

/**
 * 基本部局
 * @author weiq
 */
@connect()
export default class BasicLayout extends React.PureComponent {
  state = {
    collapsedLeftSide: false, // 左边栏开关控制
    leftCollapsedWidth: 60, // 左边栏宽度
    expandTopBar: false,  // 头部多功能区开合
    showSidebarHeader: false,  // 左边栏头部开关 
    collapsedRightSide: true,  // 右边栏开关
  };

  componentDidMount() {}

  /**
   * 顶部左侧菜单图标收缩控制
   */
  onCollapseLeftSide = _ => {
    const collapsedLeftSide = this.state.leftCollapsedWidth === 0
        ? true
        : !this.state.collapsedLeftSide;
    const collapsedRightSide = this.state.collapsedRightSide || !collapsedLeftSide

    this.setState({
      collapsedLeftSide,
      collapsedRightSide,
      leftCollapsedWidth: 60,
    });
  };

  /**
   * 完全关闭左边栏，即宽为0
   */
  onCollapseLeftSideAll = _ => {
    this.setState({
      collapsedLeftSide: true,
      leftCollapsedWidth: 0
    });
  };

  /**
   * 展开面包屑所在条中的多功能区
   */
  onExpandTopBar = _ => {
    this.setState({
      expandTopBar: true
    });
  };

  /**
   * 与上面相反
   */
  onCollapseTopBar = _ => {
    this.setState({
      expandTopBar: false
    });
  };

  /**
   * 切换左边栏中头部的开合
   */
  toggleSidebarHeader = _ => {
    this.setState({
      showSidebarHeader: !this.state.showSidebarHeader
    });
  };

  /**
   * 切换右边栏
   */
  toggleRightSide = _ => {
    this.setState({
      collapsedLeftSide: this.state.collapsedRightSide,
      collapsedRightSide: !this.state.collapsedRightSide
    });
  };

  render() {
    const {
      collapsedLeftSide,
      leftCollapsedWidth,
      expandTopBar,
      showSidebarHeader,
      collapsedRightSide
    } = this.state;
    const { routerData } = this.props;
    const { childRoutes } = routerData;

    return (
      <Layout className="full-layout basic-layout">
        <Header>
          <NavBar
            collapsed={collapsedLeftSide}
            onCollapseLeftSide={this.onCollapseLeftSide}
            onExpandTopBar={this.onExpandTopBar}
            toggleSidebarHeader={this.toggleSidebarHeader}
          />
        </Header>
        <Layout>
          <LeftSideBar
            collapsed={collapsedLeftSide}
            leftCollapsedWidth={leftCollapsedWidth}
            showHeader={showSidebarHeader}
            onCollapsed={this.onCollapseLeftSideAll}
          />
          <Content>
            <Layout className="full-layout">
              <Header>
                <TopBar
                  expand={expandTopBar}
                  toggleRightSide={this.toggleRightSide}
                  collapsedRightSide={collapsedRightSide}
                />
              </Header>
              <Content>
                <Switch>{childRoutes}</Switch>
              </Content>
            </Layout>
          </Content>
          <RightSideBar collapsed={collapsedRightSide} />
        </Layout>
        <Notification />
        <Mask visible={expandTopBar} onClick={this.onCollapseTopBar} />
      </Layout>
    );
  }
}
