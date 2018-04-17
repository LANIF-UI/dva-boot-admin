import React, { Component } from 'react';
import { Breadcrumb, Row, Col } from 'antd';
import Icon from '../Icon';
import cx from 'classnames';
import './style/index.less';

class TopBar extends Component {
  render() {

    const classnames = cx(
      'topbar'
    );

    return (
      <div className={classnames}>
        <div className="topbar-dropmenu">
          <Row gutter={22}>
            <Col span={6}>
              <a href="pages_blank.html#" class="metro-tile">
                <span class="metro-icon glyphicon glyphicon-inbox"></span>
                <p class="metro-title">Messages</p>
              </a>
            </Col>
            <Col span={6}>
              <a href="pages_blank.html#" class="metro-tile">
                <span class="metro-icon glyphicon glyphicon-inbox"></span>
                <p class="metro-title">Messages</p>
              </a>
            </Col>
            <Col span={6}>
              <a href="pages_blank.html#" class="metro-tile">
                <span class="metro-icon glyphicon glyphicon-inbox"></span>
                <p class="metro-title">Messages</p>
              </a>  
            </Col>
            <Col span={6}>
              <a href="pages_blank.html#" class="metro-tile">
                <span class="metro-icon glyphicon glyphicon-inbox"></span>
                <p class="metro-title">Messages</p>
              </a>
            </Col>
          </Row>
        </div>
        <header className="topbar-content">
          <Breadcrumb>
            <Breadcrumb.Item className="first">用户中心</Breadcrumb.Item>
            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">主页</a></Breadcrumb.Item>
            <Breadcrumb.Item>用户中心</Breadcrumb.Item>
          </Breadcrumb>
          <a class="topbar-right">
            <Icon type="right-square-o" antd />
          </a>
        </header>
      </div>
    );
  }
}
 
export default TopBar;