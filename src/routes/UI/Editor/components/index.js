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
    html: '',
    htmlEditor: ''
  };
  onChange = html => {
    this.setState({
      html
    });
  };

  // 会返回 wangEditor 的实例， 与他的onChange函数，注意这个是他的onChange
  onLoaded = editor => {
    this.editor = editor;
  };

  onChangeNative = html => {
    this.setState({
      htmlEditor: html
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
          </Panel>

          <Panel title="wangEditor 方式">
            <p>
              建议使用这种方式，在onLoaded里取得原生对象操作编辑器
            </p>
            <p>
              <Button.Group>
                <Button
                  type="primary"
                  onClick={e => this.editor.txt.html('<p>今天也要快乐啊！</p>')}
                >
                  设置值
                </Button>
                <Button onClick={e => message.success(this.editor.txt.html())}>
                  获取值
                </Button>
                <Button onClick={e => this.editor.txt.html('')}>清空值</Button>
              </Button.Group>
            </p>
            <Editor onLoaded={this.onLoaded} onChange={this.onChangeNative} />
            <b>HTML: </b>
            {this.state.htmlEditor}
          </Panel>

          <Panel title="完全控制">
            <p>
              完全控制方式，使用简单，不涉及原生API调用，但是用户体验没有上面那种好
            </p>
            <p>
              <Button.Group>
                <Button
                  type="primary"
                  onClick={e =>
                    this.setState({ html: '<div>今天也要快乐啊！</div>' })
                  }
                >
                  设置值
                </Button>
                <Button onClick={e => message.success(this.state.html)}>
                  获取值
                </Button>
                <Button onClick={e => this.setState({ html: '' })}>
                  清空值
                </Button>
              </Button.Group>
            </p>
            <Editor onChange={this.onChange} value={this.state.html} />
            <b>HTML: </b>
            {this.state.html}
          </Panel>
        </Content>
      </Layout>
    );
  }
}
