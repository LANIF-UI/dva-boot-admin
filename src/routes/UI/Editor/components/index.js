import React from 'react';
import { connect } from 'dva';
import { Layout, Button, message } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Editor from 'components/Editor';
import Panel from 'components/Panel';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  state = {
    html: ''
  };
  onChange = html => {
    this.setState({
      html
    });
  };

  render() {
    return (
      <Layout className="full-layout page">
        <Content>
          <Panel title="富文本">
            <p>
              富文本使用
              <a href="https://github.com/wangfupeng1988/wangEditor">
                wangEditor
              </a>
              ，具体参数可以到其网站查看。
            </p>
            <p>
              <Button.Group>
                <Button
                  type="primary"
                  onClick={e =>
                    this.setState({ newHtml: '<div>今天也要快乐啊！</div>' })
                  }
                >
                  设置值
                </Button>
                <Button onClick={e => message.success(this.state.html)}>
                  获取值
                </Button>
                <Button onClick={e => this.setState({ newHtml: '' })}>
                  清空值
                </Button>
              </Button.Group>
            </p>
            <Editor onChange={this.onChange} value={this.state.newHtml} />
            <b>HTML: </b>
            {this.state.html}
          </Panel>
        </Content>
      </Layout>
    );
  }
}
