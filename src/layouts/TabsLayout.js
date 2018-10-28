import './styles/tabs.less';
import React from 'react';
import { Layout, Tabs } from 'antd';
import BaseComponent from 'components/BaseComponent';
import { Switch } from 'dva/router';
const { Content } = Layout;
const TabPane = Tabs.TabPane;

function getTitle(pathName) {
  const map = window.dva_router_pathMap[pathName];
  return map ? map.title : 'Tag';
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

  render() {
    const { childRoutes } = this.props;
    const { panes, activeKey } = this.state;

    console.log(childRoutes);
    return (
      <Layout className="full-layout tabs-layout">
        <Content>
          <Switch>
            <Tabs
              hideAdd
              type="editable-card"
              className="lanif-tabs-content"
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
