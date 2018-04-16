import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import Icon from '../Icon';

class TopBar extends Component {
  render() {
    return (
      <div className="topbar">
        <div className="topbar-dropmenu">
        </div>
        <header className="topbar">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
          <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
        </header>
      </div>
    );
  }
}
 
export default TopBar;