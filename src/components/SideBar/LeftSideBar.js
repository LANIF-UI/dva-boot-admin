import React, { Component } from 'react';
import cx from 'classnames';
import { Menu, Layout, Switch, Select } from 'antd';
import Icon from '../Icon';
import './style/index.less';
const Option = Select.Option;
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LeftSideBar extends Component {
  static defaultProps = {
    fixed: true,
    theme: '',
  }

  render() {
    const {fixed, theme, collapsed, onCollapse, leftCollapsedWidth, showHeader} = this.props;

    const classnames = cx(
      'sidebar-left',
      'sidebar-default',
      {
        'affix': !!fixed,
        'sidebar-left-sm': collapsed,
        'show-header': collapsed ? false : showHeader,
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
            <div className="userlogged clearfix">
              <Icon type="woman" />
              <div className="user-details">
                <span>Mike Mayers</span>
                <div className="dropdown">
                  <Select 
                    size="small" 
                    defaultValue="online"
                    dropdownClassName="sidebar-header-dropdown"
                  >
                    <Option value="online"><span className="user online"></span>在线</Option>
                    <Option value="busy"><span className="user busy"></span>忙碌</Option>
                    <Option value="invisible"><span className="user invisible"></span>隐身</Option>
                    <Option value="offline"><span className="user offline"></span>离线</Option>
                  </Select>
                </div>
              </div>
            </div>
          </header>
          <Menu
            onClick={this.handleClick}
            inlineCollapsed={collapsed}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme={theme}
          >
            <Menu.Item key="dashboard">
              <Icon type="dashboard" antd />
              <span>仪表盘</span>
            </Menu.Item>
            <SubMenu key="sub1" title={<span><Icon antd type="mail" /><span>Navigation One</span></span>}>
              <MenuItemGroup key="g1" title="Item 1">
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup key="g2" title="Item 2">
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon antd type="appstore" /><span>Navigation Two</span></span>}>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon antd type="setting" /><span>Navigation Three</span></span>}>
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
          <div className="sidebar-toggle-mini">
            {collapsed && leftCollapsedWidth !== 0 ? <Switch checked={collapsed} onChange={onCollapse} size="small" /> : null}
          </div>
        </div>
      </Sider>
    )
  }
}

export default LeftSideBar;