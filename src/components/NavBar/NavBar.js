import React, { Component } from 'react';
import Icon from '../Icon';
import { Popover } from 'antd';
import cx from 'classnames';
import './style/index.less';

class NavBar extends Component {
  static defaultProps = {
    fixed: true,
    theme: '', //'bg-dark',
  }

  render() {
    const {fixed, theme} = this.props;

    const classnames = cx(
      'navbar', 
      'navbar-shadow', 
      {
        'navbar-fixed-top': !!fixed,
        [theme]: !!theme,
      }
    );

    return (
      <header className={classnames}>
        <div className="navbar-branding">
          <a className="navbar-brand"><b>Absolute</b>Design</a>
          <span className="toggle_sidemenu_l">
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
              <a className="dropdown-toggle" href="pages_blank.html#">
                <Icon type="radio-tower" />
              </a>
            </Popover>
          </li>
        </ul>
      </header>
    );
  }
}

export default NavBar;