import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Editor from 'components/Editor';
import Panel from 'components/Panel';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  state = {
    html: '',
  }
  onChange = html => {
    this.setState({
      html
    });
  }
  
  render() {
    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="富文本">
            <p>富文本使用<a href="https://github.com/wangfupeng1988/wangEditor">wangEditor</a>，具体参数可以到其网站查看。</p>
            <Editor onChange={this.onChange} />
            <p><b>HTML: </b>{this.state.html}</p>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
