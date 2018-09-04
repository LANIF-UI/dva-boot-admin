import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Print from 'components/Print';
const { Content } = Layout;

@connect()
export default class Blank extends BaseComponent {
  saveRef = node => {
    this.element1 = node;
  };

  render() {
    const comps = (
      <div>
        <table>
          <thead>
            <tr>
              <th>姓名</th>
              <th>年级</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>张三</td>
              <td>一年级</td>
            </tr>
            <tr>
              <td>王五</td>
              <td>二年级</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    return (
      <Layout className="full-layout page print-page">
        <Content>
          <Panel title="说明" ref={this.saveRef}>
            <h3>Print 用法</h3>
            <p>支持打印组件，打印HTML文本，dom元素，未渲染的React组件等</p>
          </Panel>
          <Row gutter={20}>
            <Col span={8}>
              <Panel title="字符串 & HTML文本">
                <div>{`<span style="color: red">今晚打老虎</span>`}</div>
                <br />
                <Print content={`<span style="color: red">今晚打老虎</span>`} />
              </Panel>
            </Col>
            <Col span={8}>
              <Panel title="ref 对应的 DOM 元素 | React 节点">
                <div>将打印顶部说明内容</div>
                <br />
                {this.element1 ? (
                  <Print
                    importStyle
                    trigger={<Button icon="printer">打印</Button>}
                    content={this.element1}
                  />
                ) : null}
              </Panel>
            </Col>
            <Col span={8}>
              <Panel title="未渲染的React组件">
                <div>{comps}</div>
                <br />
                <Print
                  importStyle
                  trigger={<Button icon="printer">打印</Button>}
                  content={comps}
                />
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
