import React, { Component } from 'react';
import { Layout } from 'antd';
import CSSAnimate from 'components/CSSAnimate';
import Icon from 'components/Icon';
import './index.less';
const { Content, Sider } = Layout;

class SideLayout extends Component {
  render() {
    const { title, site, author, sideContent, children } = this.props;
    const sidebarStyle = {
      borderRight: '1px solid #ddd',
      background: '#f5f5f5'
    };
    return (
      <Layout className="full-layout charts-page">
        <Sider
          width={350}
          className="charts-page-sider"
          style={sidebarStyle}
        >
          <div className="header">
            <h3>{title}</h3>
            <ul className="icon-list">
              <li>
                <Icon type="exclamation-circle" antd />
                <b>作者：</b>{author}
              </li>
              <li>
                <p>
                  <Icon type="exclamation-circle" antd />
                  <b>网站：</b>
                  <a href={site}>
                    {site}
                  </a>
                </p>
              </li>
            </ul>
          </div>
          <div className="side-list">
            {sideContent}
          </div>
        </Sider>
        <Content>
          <CSSAnimate id="animateMe" type="fadeInLeft">
            {children}
          </CSSAnimate>
        </Content>
      </Layout>
    );
  }
}

export default SideLayout;