import React from 'react';
import { Layout, Row, Col } from 'antd';
import Icon from '../Icon';
import cx from 'classnames';
const { Content } = Layout;

const type2icon = {
  success: 'check',
  error: 'close',
  warning: 'exclamation',
  info: 'info'
};
/**
 * 结果展示组件
 */
export default ({
  title, // 标题
  extra, // 标题右边的内容
  icon, // 标题左边的图标,
  type, // 默认图标 success error warning info
  description, // 标题下方的文字
  actions, // 内容里面下方的按钮
  footer, // 内容下方的文字
  style,
  children, // 正文
  className
}) => {
  const classNames = cx('full-layout', 'result-fragment', className);

  let titleIcon = icon;
  if (type && type2icon[type] && !icon) {
    titleIcon = <Icon type={type2icon[type]} />;
  }

  return (
    <Layout className={classNames} style={style}>
      <Content>
        <div className="center-block">
          <div className="result-header">
            <Row type="flex" align="bottom">
              <Col span={extra ? 16 : 24}>
                <div className={cx('title', type)}>
                  {titleIcon} {title}
                </div>
              </Col>
              <Col span={extra ? 8 : 0}>
                <div className="extra">{extra}</div>
              </Col>
            </Row>
            {description ? (
              <div className="description">{description}</div>
            ) : null}
          </div>
          <div className="result-body">
            {children}
            {actions ? <div className="action-btns">{actions}</div> : null}
          </div>
          <div className="result-footer">{footer}</div>
        </div>
      </Content>
    </Layout>
  );
};
