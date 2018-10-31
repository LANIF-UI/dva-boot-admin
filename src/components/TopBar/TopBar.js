import React, { Component } from 'react';
import { Breadcrumb, Row, Col } from 'antd';
import { Link } from 'dva/router';
import Icon from '../Icon';
import cx from 'classnames';
import CSSAnimate from '../CSSAnimate';
import Mask from '../Mask';
import './style/index.less';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoute: this.getRouteLevel(props.location.pathname) || []
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentRoute = this.getRouteLevel(nextProps.location.pathname);

    this.setState({
      currentRoute
    });
  }

  getRouteLevel = pathName => {
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
                {currentRoute[currentRoute.length - 1].title}
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
                    item.title
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
