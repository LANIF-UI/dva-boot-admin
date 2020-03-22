import './styles/tabs.less';
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Layout, Tabs, Dropdown, Button, Menu } from 'antd';
import { router } from 'dva';
import NotFound from 'components/Pages/404';
const { Switch, Route, withRouter } = router;
const { Content } = Layout;
const TabPane = Tabs.TabPane;

function getTitle(pathName) {
  const map = window.dva_router_pathMap[pathName];
  return <div className="tab-title">{map ? map.title : 'Tag'}</div>;
}

@withRouter
export default class TabsLayout extends React.PureComponent {
  constructor(props) {
    const {
      location: { pathname }
    } = props;
    super(props);
    this.state = this.setCurPanes(pathname, []);
  }
  
  componentDidUpdate(prevProps, prevState) {
    const pathname = prevProps.location.pathname;
    const nextpathname = this.props.location.pathname;
    if (pathname !== nextpathname) {
      const newState = this.setCurPanes(nextpathname);
      this.setState(newState);
    }
  }

  setCurPanes = (pathName, _panes) => {
    const { childRoutes } = this.props;
    let panes = _panes || this.state.panes;
    const existPane = panes.some(item => item.key === pathName);
    if (existPane) {
      return {
        activeKey: pathName,
        panes,
        noMatch: false
      };
    } else {
      const nextPanes = childRoutes.filter(item => item.key === pathName);
      if (nextPanes.length) {
        return {
          activeKey: pathName,
          panes: panes.concat(nextPanes),
          noMatch: false
        };
      } else if (
        window.dva_router_pathMap[pathName] &&
        window.dva_router_pathMap[pathName].parentPath
      ) {
        // childRoutes中如果没有(分两种情况,确实没有,或可能是一个子路由在subChildRoute中)
        // 如果是子路由
        const parentPath = window.dva_router_pathMap[pathName].parentPath;
        return this.setCurPanes(parentPath, panes);
      } else {
        return {
          activeKey: pathName,
          panes: panes,
          noMatch: true
        };
      }
    }
  };

  onChange = activeKey => {
    this.props.history.push(activeKey);
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
                      <DownOutlined />
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
