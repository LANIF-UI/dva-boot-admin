import React from 'react';
import { Link } from 'dva/router';
import { Layout, Row, Col } from 'antd';
import Icon from '../Icon';
import errorImg from './style/images/error.gif';
const { Content } = Layout;

export default () => (
  <Layout className="full-layout page500">
    <Content>
      <Row className="error-block">
        <Col span={16}>
          <div className="center-block">
            <h1 className="error-title"> 500! </h1>
            <h2 className="error-subtitle">漂亮，我们出现了一个意想不到的失误...</h2>
            <h6>错误码: 500</h6>
          </div>
        </Col>
        <Col span={8}>
          <img src={errorImg} width="313" height="428" alt="error" />
        </Col>
      </Row>
      <Link to="/" className="backhome">
        <Icon type="home" />
      </Link>
    </Content>
  </Layout>
);
