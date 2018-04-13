import React, { Component } from 'react';
import Icon from '../Icon';
import './style/index.less';
import cx from 'classnames';

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
          <a className="navbar-brand"><b>Absolute</b>Admin</a>
          <span className="toggle_sidemenu_l">
            <Icon type="lines" />
          </span>
        </div>
        <div className="nav navbar-nav navbar-left clearfix">
          <a className="request-fullscreen toggle-active">
            <Icon type="screen-full" />
          </a>
        </div>
        <form className="navbar-form navbar-search clearfix">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="全文检索" />
          </div>
        </form>
        <ul className="nav navbar-nav navbar-right clearfix">
          <li>
            <div className="navbar-btn btn-group">
              <a className="topbar-menu-toggle btn">
                <Icon type="wand" />
              </a>
            </div>
          </li>
        </ul>
      </header>
    );
  }
}

export default NavBar;