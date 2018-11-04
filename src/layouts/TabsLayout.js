import './styles/tabs.less';
import React from 'react';
import { Layout, Tabs, Dropdown, Button, Menu, Icon } from 'antd';
import BaseComponent from 'components/BaseComponent';
import { Switch, Route } from 'dva/router';
import NotFound from 'components/Pages/404';

const { Content } = Layout;
const TabPane = Tabs.TabPane;

function getTitle(pathName) {
  const map = window.dva_router_pathMap[pathName];
  return <div className="tab-title">{map ? map.title : 'Tag'}</div>;
}

export default class TabsLayout extends BaseComponent {
  constructor(props) {
    const {
      childRoutes,
      location: { pathname }
    } = props;
    super(props);
    this.newTabIndex = 0;
    const panes = childRoutes.filter(item => item.key === pathname);
    this.state = {
      activeKey: panes.length ? panes[0].key : '/notfound',
      panes,
      noMatch: !panes.length
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      childRoutes,
      location: { pathname }
    } = this.props;
    let { panes } = this.state;
    const nextpathname = nextProps.location.pathname;
    if (pathname !== nextpathname) {
      let noMatch;
      let newPanes = [];
      const existPane = panes.some(item => item.key === nextpathname);
      if (!existPane) {
        const nextPanes = childRoutes.filter(item => item.key === nextpathname);
        noMatch = !nextPanes.length;
        newPanes = panes.concat(nextPanes);
      } else {
        newPanes = panes;
        noMatch = false;
      }

      this.setState({
        activeKey: nextpathname,
        panes: newPanes,
        noMatch
      });
    }
  }

  onChange = activeKey => {
    this.history.push(activeKey);
  };

  onRemove = targetKey => {
    let { activeKey, panes } = this.state;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newpanes = panes.filter(pane => pane.key !== targetKey);
    if (newpanes.length && activeKey === targetKey) {
      activeKey = lastIndex >= 0 ? newpanes[lastIndex].key : newpanes[0].key;
    }
    this.setState({ panes: newpanes, activeKey }, () => {
      if (activeKey !== targetKey) this.onChange(activeKey);
    });
  };

  onRemoveOther = () => {
    let { activeKey, panes } = this.state;
    const newpanes = panes.filter(pane => pane.key === activeKey);
    this.setState({ panes: newpanes });
  };

  onRemoveAll = () => {
    this.setState({ panes: [], activeKey: null });
  };

  onTabsActions = ({ key }) => {
    let { activeKey } = this.state;
    switch (key) {
      case 'close':
        this.onRemove(activeKey);
        break;
      case 'closeother':
        this.onRemoveOther();
        break;
      case 'closeall':
        this.onRemoveAll();
        break;
      default:
        break;
    }
  };

  render() {
    const { panes, activeKey, noMatch } = this.state;

    return (
      <Layout className="full-layout tabs-layout">
        <Content>
          <Switch>
            {noMatch ? (
              <Route component={NotFound} />
            ) : (
              <Tabs
                hideAdd
                type="editable-card"
                className="lanif-tabs-content"
                tabBarExtraContent={
                  <Dropdown
                    overlay={
                      <Menu onClick={this.onTabsActions}>
                        <Menu.Item key="close">关闭当前</Menu.Item>
                        <Menu.Item key="closeother">关闭其它</Menu.Item>
                        <Menu.Item key="closeall">关闭所有</Menu.Item>
                      </Menu>
                    }
                  >
                    <Button type="primary" ghost>
                      操作
                      <Icon type="down" />
                    </Button>
                  </Dropdown>
                }
                onEdit={this.onRemove}
                onChange={this.onChange}
                activeKey={activeKey}
              >
                {panes.map(item => (
                  <TabPane tab={getTitle(item.key)} key={item.key}>
                    {item}
                  </TabPane>
                ))}
              </Tabs>
            )}
          </Switch>
        </Content>
      </Layout>
    );
  }
}
