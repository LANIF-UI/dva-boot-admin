import './styles/tabs.less';
import React from 'react';
import { Layout, Tabs, Dropdown, Button, Menu, Icon } from 'antd';
import BaseComponent from 'components/BaseComponent';
import { Switch } from 'dva/router';
const { Content } = Layout;
const TabPane = Tabs.TabPane;

function getTitle(pathName) {
  const map = window.dva_router_pathMap[pathName];
  return <div className="tab-title">{map ? map.title : 'Tag'}</div>;
}

export default class UserLayout extends BaseComponent {
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
      panes
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      childRoutes,
      location: { pathname }
    } = this.props;
    const { panes } = this.state;
    const nextpathname = nextProps.location.pathname;
    if (pathname !== nextpathname) {
      let newPanes = [];
      const existPane = panes.some(item => item.key === nextpathname);
      if (!existPane) {
        newPanes = panes.concat(
          childRoutes.filter(item => item.key === nextpathname)
        );
      } else {
        newPanes = panes;
      }

      this.setState({
        activeKey: nextpathname,
        panes: newPanes
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
    const { panes, activeKey } = this.state;

    return (
      <Layout className="full-layout tabs-layout">
        <Content>
          <Switch>
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
          </Switch>
        </Content>
      </Layout>
    );
  }
}
