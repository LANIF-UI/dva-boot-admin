import React, { Component } from 'react';
import { Breadcrumb, Row, Col } from 'antd';
import { Link } from 'dva/router';
import Icon from '../Icon';
import cx from 'classnames';
import CSSAnimate from '../CSSAnimate';
import Mask from '../Mask';
import './style/index.less';

class TopBar extends Component {
  render() {
    const { expand, toggleRightSide, collapsedRightSide, onCollapse, currentMenu } = this.props;
    const classnames = cx('topbar', {
      'topbar-expand': expand,
    });

    return (
      <div className={classnames}>
        <div className="topbar-dropmenu">
          <Row gutter={22}>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" type={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <Icon type="message" />
                  <span className="metro-title">信息</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" type={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <Icon type="user" />
                  <span className="metro-title">用户</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" type={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                <Icon type="headphones" />
                  <span className="metro-title">支持</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" type={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <Icon type="equalizer" />
                  <span className="metro-title">设置</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" type={expand ? "fadeInDown" : "fadeOutUp"}>
                <a className="metro-tile">
                  <Icon type="play" />
                  <span className="metro-title">视频</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate className="animated-short" type={expand ? "fadeInDown" : "fadeOutUp"}>
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
            <Breadcrumb.Item className="first">{currentMenu.name}</Breadcrumb.Item>
            <Breadcrumb.Item className="icon"><Icon type="home" /></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/">主页</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{currentMenu.name}</Breadcrumb.Item>
          </Breadcrumb>
          <a className={cx("topbar-right", {"collapse": collapsedRightSide})} onClick={toggleRightSide}>
            <Icon type="into" />
          </a>
        </header>
        <Mask visible={expand} onClose={onCollapse} getContainer={node => node.parentNode} />
      </div>
    );
  }
}

export default TopBar;