import React, { Component } from 'react';
import Icon from '../Icon';
import { Popover, Badge, Avatar } from 'antd';
import { Link } from 'dva/router';
import cx from 'classnames';
import './style/index.less';
import logoImg from 'assets/images/logo.png';
import SearchBox from './SearchBox';

/**
 * 其本本局头部区域
 */
class NavBar extends Component {
  state = {
    openSearchBox: false,
  }

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

  onCloseSearchBox = () => {
    this.setState({
      openSearchBox: false,
    });
  }

  onOpenSearchBox = () => {
    this.setState({
      openSearchBox: true,
    })
  }

  render() {
    const { openSearchBox } = this.state;
    const { fixed, theme, onCollapseLeftSide, collapsed,
      onExpandTopBar, toggleSidebarHeader, user } = this.props;

    const classnames = cx(
      'navbar',
      {
        'navbar-fixed-top': !!fixed,
        'navbar-sm': collapsed,
        ['bg-' + theme]: !!theme,
      }
    );

    return (
      <header className={classnames}>
        <div className="navbar-branding">
          <Link className="navbar-brand" to="/">
            <img src={logoImg} alt="logo" /><b>LANIF</b>Admin
          </Link>
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
            <a onClick={onExpandTopBar}>
              <Icon type="wand" />
            </a>
          </li>
          <li onClick={this.toggleFullScreen}>
            <a className="request-fullscreen">
              <Icon type="screen-full" />
            </a>
          </li>
          <li className="mini-search" onClick={this.onOpenSearchBox}>
            <a>
              <Icon type="search" antd />
            </a>
          </li>
        </ul>
        <form className="navbar-form navbar-search clearfix">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="全文检索" onClick={this.onOpenSearchBox} />
          </div>
        </form>
        <ul className="nav navbar-nav navbar-right clearfix">
          <li>
            <a href="https://github.com/LANIF-UI/dva-boot-admin">
              <Icon type="github" antd />
            </a>
          </li>
          <li className="dropdown">
            <Popover placement="bottomRight" title={'通知'} 
              overlayClassName={cx("navbar-popup", {[theme]: !!theme})} content={''} trigger="click">
              <a className="dropdown-toggle">
                <Icon type="radio-tower" />
              </a>
            </Popover>
          </li>
          <li className="dropdown">
            <Popover placement="bottomRight" title={`WELCOME ${user.userName}`} 
              overlayClassName={cx("navbar-popup", {[theme]: !!theme})} content={<UserDropDown />} trigger="click">
              <a className="dropdown-toggle">
                <Badge dot><Avatar src={require('assets/images/avatar.jpg')}>{user.userName}</Avatar></Badge>
              </a>
            </Popover>
          </li>
        </ul>
        <SearchBox visible={openSearchBox} onClose={this.onCloseSearchBox} />
      </header>
    );
  }
}

const UserDropDown = (props) => (
  <ul className="dropdown-menu list-group dropdown-persist">
    <li className="list-group-item">
      <a className="animated animated-short fadeInUp">
        <Icon type="mail" /> 信息
        <Badge count={5} className="label" />
      </a>
    </li>
    <li className="list-group-item">
      <a className="animated animated-short fadeInUp">
        <Icon type="users" /> 好友
        <Badge count={6} className="label" />
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
    <li className="list-group-item dropdown-footer">
      <Link to="/sign/login">
        <Icon type="poweroff" /> 退出 
      </Link>
    </li>
  </ul>
)

export default NavBar;