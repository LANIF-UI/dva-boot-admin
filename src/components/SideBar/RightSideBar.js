import React, { Component } from 'react';
import cx from 'classnames';
import { Layout, Drawer } from 'antd';
import './style/index.less';
const { Sider } = Layout;

class RightSideBar extends Component {
  static defaultProps = {
    fixed: true,
    theme: ''
  };

  render() {
    const { fixed, theme, collapsed, isMobile, onCollapse } = this.props;

    const classnames = cx('sidebar-right', {
      affix: !!fixed,
      'sidebar-right-close': collapsed,
      [theme]: !!theme
    });

    const siderBar = (
      <Sider
        className={classnames}
        width={300}
        collapsedWidth={0}
        collapsible
        collapsed={collapsed}
        trigger={null}
      >
        <div className="sidebar-right-content"></div>
      </Sider>
    );

    return isMobile ? (
      <Drawer
        className=""
        onClose={onCollapse}
        visible={!collapsed}
        placement="right"
        width={300}
      >
        {siderBar}
      </Drawer>
    ) : (
      siderBar
    );
  }
}

export default RightSideBar;
