import React, { Component } from 'react';
import Icon from '../Icon';
import { Popover, Badge, Avatar } from 'antd';
import cx from 'classnames';
import './style/index.less';

class NavBar extends Component {
  static defaultProps = {
    fixed: true,
    theme: '', //'bg-dark',
  }

  toggleFullScreen() {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  render() {
    const {fixed, theme, onCollapseLeftSide, collapsed, onExpandTopBar, toggleSidebarHeader} = this.props;

    const classnames = cx(
      'navbar', 
      'navbar-shadow', 
      {
        'navbar-fixed-top': !!fixed,
        'navbar-sm': collapsed,
        [theme]: !!theme,
      }
    );

    return (
      <header className={classnames}>
        <div className="navbar-branding">
          <a className="navbar-brand"><b>LANIF</b>Admin</a>
          <span className="toggle_sidemenu_l" onClick={onCollapseLeftSide}>
            <Icon type="lines" />
          </span>
        </div>
        <ul className="nav navbar-nav navbar-left clearfix">
          {collapsed ? null : (
            <li>
              <a className="sidebar-menu-toggle" onClick={toggleSidebarHeader}>
                <Icon type="ruby" />
              </a>
            </li>
          )}
          <li>
            <a className="topbar-menu-toggle" onClick={onExpandTopBar}>
              <Icon type="wand" />
            </a>
          </li>
          <li className="hidden-xs" onClick={this.toggleFullScreen}>
            <a className="request-fullscreen toggle-active">
              <Icon type="screen-full" />
            </a>
          </li>
        </ul>
        <form className="navbar-form navbar-search clearfix">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="全文检索" />
          </div>
        </form>
        <ul className="nav navbar-nav navbar-right clearfix">
          <li className="dropdown">
            <Popover placement="bottomRight" title={'通知'} 
              overlayClassName="navbar-popup" content={''} trigger="click">
              <a className="dropdown-toggle">
                <Icon type="radio-tower" />
              </a>
            </Popover>
          </li>
          <li className="dropdown">
            <Popover placement="bottomRight" title={'WELCOME 魏小雨'} 
              overlayClassName="navbar-popup" content={<UserDropDown />} trigger="click">
              <a className="dropdown-toggle">
                <Badge dot><Avatar src={require('assets/images/avatar.jpg')}>小雨</Avatar></Badge>
              </a>
            </Popover>
          </li>
        </ul>
      </header>
    );
  }
}

const UserDropDown = (props) => (
  <ul className="dropdown-menu list-group dropdown-persist">
    <li className="list-group-item">
      <a className="animated animated-short fadeInUp">
        <Icon type="mail" /> 信息
        <span className="label label-warning">2</span>
      </a>
    </li>
    <li className="list-group-item">
      <a className="animated animated-short fadeInUp">
        <Icon type="users" /> 好友
        <span className="label label-warning">6</span>
      </a>
    </li>
    <li className="list-group-item">
      <a className="animated animated-short fadeInUp">
        <Icon type="gear" /> 帐户设置 
      </a>
    </li>
    <li className="list-group-item">
      <a className="animated animated-short fadeInUp">
        <Icon type="ring" /> 通知 
      </a>
    </li>
    <li className="dropdown-footer">
      <a href="dashboard.html#" className="">
        <Icon type="poweroff" /> 退出 
      </a>
    </li>
  </ul>
)

export default NavBar;