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

  render() {
    const {fixed, theme, onCollapseLeftSide, collapsed} = this.props;

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
          <li>
            <a className="sidebar-menu-toggle" href="dashboard.html#">
              <Icon type="ruby" />
            </a>
          </li>
          <li>
            <a className="topbar-menu-toggle" href="dashboard.html#">
              <Icon type="wand" />
            </a>
          </li>
          <li className="hidden-xs">
            <a className="request-fullscreen toggle-active" href="dashboard.html#">
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
  <ul class="dropdown-menu list-group dropdown-persist">
    <li class="list-group-item">
      <a href="pages_blank.html#" class="animated animated-short fadeInUp">
        <span class="fa fa-envelope"></span> 信息
        <span class="label label-warning">2</span>
      </a>
    </li>
    <li class="list-group-item">
      <a href="pages_blank.html#" class="animated animated-short fadeInUp">
        <span class="fa fa-user"></span> 好友
        <span class="label label-warning">6</span>
      </a>
    </li>
    <li class="list-group-item">
      <a href="pages_blank.html#" class="animated animated-short fadeInUp">
        <span class="fa fa-gear"></span> 帐户设置 </a>
    </li>
    <li class="list-group-item">
      <a href="pages_blank.html#" class="animated animated-short fadeInUp">
        <span class="fa fa-power-off"></span> 退出 </a>
    </li>
  </ul>
)

export default NavBar;