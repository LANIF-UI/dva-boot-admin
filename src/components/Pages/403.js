import React from 'react';
import { router } from 'dva';
import { Layout, Row, Col } from 'antd';
import Icon from '../Icon';
import errorImg from './style/images/error403.svg';
const { Link } = router;
const { Content } = Layout;

export default () => (
  <Layout className="full-layout page403">
    <Content>
      <Row className="error-block">
        <Col span={16}>
          <div className="center-block">
            <h1 className="error-title"> 403! </h1>
            <h2 className="error-subtitle">抱歉，你无权访问该页面...</h2>
            <h6>错误码: 403</h6>
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
