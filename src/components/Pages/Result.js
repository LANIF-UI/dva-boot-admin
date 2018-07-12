import React from 'react';
import { Link } from 'dva/router';
import { Layout } from 'antd';
import Icon from '../Icon';
const { Content } = Layout;

export default ({ title, location }) => {
  return (
    <Layout className="full-layout result-page">
      <Content>
        <div className="center-block">
          <div className="result-header">
            <Icon type="check" /> {title}
          </div>
          <div className="result-body" />
          <div className="result-footer" />
        </div>
      </Content>
    </Layout>
  );
};
