import './style/index.less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import cx from 'classnames';
import Icon from '../Icon';
const { Content, Sider } = Layout;

class SideLayout extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    width: PropTypes.number,
    title: PropTypes.string,
    sideContent: PropTypes.node,
    children: PropTypes.node,
    fixed: PropTypes.bool,
  };

  static defaultProps = {
    prefixCls: 'antui-side-layout',
    width: 180
  };

  state = {
    openSide: true
  }

  toggle = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      openSide: !this.state.openSide
    });
  }

  render() {
    const { prefixCls, className, sideContent, children, title, width } = this.props;
    const { openSide } = this.state;
    return (
      <Layout className={cx(prefixCls, className)}>
        <Sider
          trigger={null}
          collapsible
          collapsed={!openSide}
          collapsedWidth={0}
          width={width}
        >
          <a
            className="side-handle"
            onClick={this.toggle}
          >
            <Icon antd type={openSide ? 'caret-left' : 'caret-right'} />
          </a>
          <div className="side-body" style={{width}}>
            <div className="side-panel">
              <div className="panel-header">
                <Icon antd type="folder" />&nbsp;
                <strong>{title}</strong>
              </div>
              <div className="panel-body">{sideContent}</div>
            </div>
          </div>
        </Sider>
        <Content>{children}</Content>
      </Layout>
    );
  }
}

export default SideLayout;
