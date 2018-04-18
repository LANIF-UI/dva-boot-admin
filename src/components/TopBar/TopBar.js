import React, { Component } from 'react';
import { Breadcrumb, Row, Col } from 'antd';
import Icon from '../Icon';
import cx from 'classnames';
import CSSAnimate from '../CSSAnimate';
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
          <Row gutter={22}>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" animationName={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <span className="metro-icon glyphicon glyphicon-inbox"></span>
                  <p className="metro-title">Messages</p>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" animationName={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <span className="metro-icon glyphicon glyphicon-inbox"></span>
                  <p className="metro-title">Messages</p>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" animationName={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <span className="metro-icon glyphicon glyphicon-inbox"></span>
                  <p className="metro-title">Messages</p>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" animationName={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <span className="metro-icon glyphicon glyphicon-inbox"></span>
                  <p className="metro-title">Messages</p>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" animationName={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <span className="metro-icon glyphicon glyphicon-inbox"></span>
                  <p className="metro-title">Messages</p>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" animationName={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <span className="metro-icon glyphicon glyphicon-inbox"></span>
                  <p className="metro-title">Messages</p>
                </a>
              </CSSAnimate>
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
          <a className="topbar-right">
            <Icon type="right-square-o" antd />
          </a>
        </header>
      </div>
    );
  }
}

export default TopBar;