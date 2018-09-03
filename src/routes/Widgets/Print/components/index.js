import React from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Print from 'components/Print';
const { Content } = Layout;

@connect()
export default class Blank extends BaseComponent {
  render() {
    const htmlText = `
      <table>
        <tr>
          <th>姓名</th>
          <th>年级</th>
        </tr>
        <tr>
          <td>张三</td>
          <td>一年级</td>
        </tr>
        <tr>
          <td>王五</td>
          <td>二年级</td>
        </tr>
      </table>
    `
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
        <Button icon="setting">Button</Button>
      </div>
    )
    return (
      <Layout className="full-layout page print-page">
        <Content>
          <Panel title="说明">
            <h3>Print 用法</h3>
            <p>
              支持打印组件，打印HTML文本，dom元素
            </p>
          </Panel>
          <Row gutter={20}>
            <Col span={8}>
              <Panel title="字符串">
                <div>今晚打老虎</div>
                <Print
                  trigger={<Button icon="printer">打印</Button>}
                  content={'今晚打老虎'}
                />
              </Panel>
            </Col>
            <Col span={8}>
              <Panel title="HTML文本">
                <div>{htmlText}</div>
                <Print
                  trigger={<Button icon="printer">打印</Button>}
                  content={htmlText}
                />
              </Panel>
            </Col>
            <Col span={8}>
              <Panel title="React组件">
                <div>{comps}</div>
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
