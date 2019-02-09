import React, { Component, Fragment } from 'react';
import { Result } from 'components/Pages';
import { Layout, Button } from 'antd';
const { Content } = Layout;

export default class extends Component {
  render() {
    const actions = (
      <Fragment>
        <Button type="primary">返回列表</Button>
        <Button>查看项目</Button>
        <Button>打 印</Button>
      </Fragment>
    );

    const footer = (
      <Fragment>
        <p>
          <a>Need More Help?</a>
        </p>
        <p>
          Misc question two? <a>Response Link</a>
        </p>
      </Fragment>
    );

    const extra = <div>Yoursite.com</div>;
    
    return (
      <Layout className="full-layout result-page">
        <Content>
          <Result
            title="提交成功"
            type="success"
            actions={actions}
            footer={footer}
            extra={extra}
            description={'Need support? We\'re here to help!'}
          >
            提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用
            Message 全局提示反馈即可。
            本文字区域可以展示简单的补充说明，如果有类似展示
            “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。
          </Result>
        </Content>
      </Layout>
    );
  }
}
