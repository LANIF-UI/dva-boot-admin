import React, { Component } from 'react';
import { Breadcrumb, Row, Col } from 'antd';
import Icon from '../Icon';
import cx from 'classnames';
import './style/index.less';

class TopBar extends Component {
  render() {
    const { expand } = this.props;
    const classnames = cx(
      'topbar',
      {
        'topbar-expand': expand
      }
    );

    return (
      <div className={classnames}>
        <div className="topbar-dropmenu">
          {!expand ? null : (
            <Row gutter={22}>
              <Col span={4}>
                <a class="metro-tile animated animated-short fadeInDown">
                  <span class="metro-icon glyphicon glyphicon-inbox"></span>
                  <p class="metro-title">Messages</p>
                </a>
              </Col>
              <Col span={4}>
                <a class="metro-tile animated animated-short fadeInDown">
                  <span class="metro-icon glyphicon glyphicon-inbox"></span>
                  <p class="metro-title">Messages</p>
                </a>
              </Col>
              <Col span={4}>
                <a class="metro-tile animated animated-short fadeInDown">
                  <span class="metro-icon glyphicon glyphicon-inbox"></span>
                  <p class="metro-title">Messages</p>
                </a>  
              </Col>
              <Col span={4}>
                <a class="metro-tile animated animated-short fadeInDown">
                  <span class="metro-icon glyphicon glyphicon-inbox"></span>
                  <p class="metro-title">Messages</p>
                </a>
              </Col>
              <Col span={4}>
                <a class="metro-tile animated animated-short fadeInDown">
                  <span class="metro-icon glyphicon glyphicon-inbox"></span>
                  <p class="metro-title">Messages</p>
                </a>  
              </Col>
              <Col span={4}>
                <a class="metro-tile animated animated-short fadeInDown">
                  <span class="metro-icon glyphicon glyphicon-inbox"></span>
                  <p class="metro-title">Messages</p>
                </a>
              </Col>
            </Row>
          )}
        </div>
        <header className="topbar-content">
          <Breadcrumb>
            <Breadcrumb.Item className="first">用户中心</Breadcrumb.Item>
            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">主页</a></Breadcrumb.Item>
            <Breadcrumb.Item>用户中心</Breadcrumb.Item>
          </Breadcrumb>
          <a className="topbar-right">
            <Icon type="right-square-o" antd />
          </a>
        </header>
      </div>
    );
  }
}
 
export default TopBar;