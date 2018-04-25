import React, { Component } from 'react';
import { Breadcrumb, Row, Col } from 'antd';
import Icon from '../Icon';
import cx from 'classnames';
import CSSAnimate from '../CSSAnimate';
import './style/index.less';

class TopBar extends Component {
  render() {
    const { expand, toggleRightSide, collapsedRightSide } = this.props;
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
                  <Icon type="message" />
                  <span className="metro-title">信息</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" animationName={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <Icon type="user" />
                  <span className="metro-title">用户</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" animationName={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                <Icon type="headphones" />
                  <span className="metro-title">支持</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" animationName={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <Icon type="equalizer" />
                  <span className="metro-title">设置</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" animationName={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <Icon type="play" />
                  <span className="metro-title">视频</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" animationName={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <Icon type="image" />
                  <span className="metro-title">图片</span>
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
          <a className="topbar-right" onClick={toggleRightSide}>
            <Icon type={`${collapsedRightSide ? 'de' : 'in'}crease`} />
          </a>
        </header>
      </div>
    );
  }
}

export default TopBar;