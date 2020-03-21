import React, { Component } from 'react';
import { Breadcrumb, Row, Col } from 'antd';
import { router } from 'dva';
import Icon from '../Icon';
import cx from 'classnames';
import CSSAnimate from '../CSSAnimate';
import Mask from '../Mask';
import isEqual from 'react-fast-compare';
import './style/index.less';
const { Link } = router;

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoute: TopBar.getRouteLevel(props.location.pathname) || []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.currentRoute, prevState.currentRoute)) {
      return {
        currentRoute: TopBar.getRouteLevel(nextProps.location.pathname)
      };
    }

    return null;
  }

  static getRouteLevel = pathName => {
    const orderPaths = [];
    pathName.split('/').reduce((prev, next) => {
      const path = [prev, next].join('/');
      orderPaths.push(path);
      return path;
    });

    return orderPaths
      .map(item => window.dva_router_pathMap[item])
      .filter(item => !!item);
  };

  render() {
    const {
      expand,
      toggleRightSide,
      collapsedRightSide,
      onCollapse
    } = this.props;
    const { currentRoute } = this.state;
    const classnames = cx('topbar', {
      'topbar-expand': expand
    });

    return (
      <div className={classnames}>
        <div className="topbar-dropmenu">
          <Row gutter={22}>
            <Col xs={8} md={4}>
              <CSSAnimate
                className="animated-short"
                type={expand ? 'fadeInDown' : 'fadeOutUp'}
              >
                <a className="metro-tile">
                  <Icon type="message" />
                  <span className="metro-title">信息</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate
                className="animated-short"
                type={expand ? 'fadeInDown' : 'fadeOutUp'}
              >
                <a className="metro-tile">
                  <Icon type="user" />
                  <span className="metro-title">用户</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate
                className="animated-short"
                type={expand ? 'fadeInDown' : 'fadeOutUp'}
              >
                <a className="metro-tile">
                  <Icon type="headphones" />
                  <span className="metro-title">支持</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate
                className="animated-short"
                type={expand ? 'fadeInDown' : 'fadeOutUp'}
              >
                <a className="metro-tile">
                  <Icon type="equalizer" />
                  <span className="metro-title">设置</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate
                className="animated-short"
                type={expand ? 'fadeInDown' : 'fadeOutUp'}
              >
                <a className="metro-tile">
                  <Icon type="play" />
                  <span className="metro-title">视频</span>
                </a>
              </CSSAnimate>
            </Col>
            <Col xs={8} md={4}>
              <CSSAnimate
                className="animated-short"
                type={expand ? 'fadeInDown' : 'fadeOutUp'}
              >
                <a className="metro-tile">
                  <Icon type="image" />
                  <span className="metro-title">图片</span>
                </a>
              </CSSAnimate>
            </Col>
          </Row>
        </div>
        <header className="topbar-content">
          {currentRoute.length ? (
            <Breadcrumb>
              <Breadcrumb.Item className="first">
                <CSSAnimate className="inline-block" type="flipInX">
                  {currentRoute[currentRoute.length - 1].title}
                </CSSAnimate>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="icon">
                <Icon type="home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/">主页</Link>
              </Breadcrumb.Item>
              {currentRoute.map((item, index) => (
                <Breadcrumb.Item key={index}>
                  {index === currentRoute.length - 1 ? (
                    <CSSAnimate className="inline-block" type="flipInX">
                      {item.title}
                    </CSSAnimate>
                  ) : (
                    <Link to={item.path}>{item.title}</Link>
                  )}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          ) : null}
          <a
            className={cx('topbar-right', { collapse: collapsedRightSide })}
            onClick={toggleRightSide}
          >
            <Icon type="into" />
          </a>
        </header>
        <Mask
          visible={expand}
          onClose={onCollapse}
          getContainer={node => node.parentNode}
        />
      </div>
    );
  }
}

export default TopBar;
