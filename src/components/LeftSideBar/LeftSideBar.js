import React, { Component } from 'react';
import cx from 'classnames';
import { Menu, Icon, Layout, Switch } from 'antd';
import './style/index.less';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LeftSideBar extends Component {
  static defaultProps = {
    fixed: true,
    theme: '',
  }

  render() {
    const {fixed, theme, collapsed, onCollapsed, leftCollapsedWidth} = this.props;

    const classnames = cx(
      'sidebar-left',
      'sidebar-default',
      {
        'affix': !!fixed,
        'sidebar-left-sm': collapsed,
        'sidebar-left-close': leftCollapsedWidth === 0,
        [theme]: !!theme,
      }
    );

    return (
      <Sider
        className={classnames}
        width={230}
        collapsedWidth={leftCollapsedWidth + .1}
        collapsible
        collapsed={collapsed}
        trigger={null}
      >
        <div className="sidebar-left-content">
          <header className="sidebar-header">

          </header>
          <Menu
            onClick={this.handleClick}
            inlineCollapsed={collapsed}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
          >
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
              <MenuItemGroup key="g1" title="Item 1">
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup key="g2" title="Item 2">
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
          <div className="sidebar-toggle-mini">
            {collapsed && leftCollapsedWidth !== 0 ? <Switch checked={collapsed} onChange={onCollapsed} size="small" /> : null}
          </div>
        </div>
      </Sider>
    )
  }
}

export default LeftSideBar;