import React from 'react';
import { connect } from 'dva';
import { PrinterOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Print from 'components/Print';
import EC from 'components/Charts/ECharts/EC';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Report from './Report';
import Dynamic from './Dynamic';
const { Content } = Layout;

@connect()
export default class Blank extends BaseComponent {
  state = {
    element1: null,
    element2: null
  };

  saveElement1 = node => {
    this.setState({
      element1: node
    });
  };

  saveElement2 = node => {
    this.setState({
      element2: node
    });
  };

  getOption = () => ({
    title: {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  render() {
    const { element1, element2 } = this.state;
    const comps = (
      <div>
        <table border="1" style={{width: '100%'}}>
          <thead>
            <tr>
              <th style={{textAlign: 'center', color: 'aqua'}}>姓名</th>
              <th style={{textAlign: 'center', color: 'aqua'}}>年级</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{textAlign: 'center'}}>张三</td>
              <td style={{textAlign: 'center'}}>一年级</td>
            </tr>
            <tr>
              <td style={{textAlign: 'center'}}>王五</td>
              <td style={{textAlign: 'center'}}>二年级</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    return (
      <Layout className="full-layout page print-page">
        <Content>
          <Panel title="说明" ref={this.saveElement1}>
            <h3>Print 用法</h3>
            <p>支持打印组件，打印HTML文本，dom元素，未渲染的React组件等</p>
          </Panel>
          <Row gutter={20}>
            <Col span={12}>
              <Panel title="字符串 & HTML文本">
                <div>{`<span style="color: red">今晚打老虎</span>`}</div>
                <br />
                <Print content={`<span style="color: red">今晚打老虎</span>`} />
              </Panel>
              <Panel title="未渲染的React组件">
                <div>{comps}</div>
                <br />
                <Print
                  trigger={<Button icon={<PrinterOutlined />}>打印</Button>}
                  content={comps}
                />
              </Panel>
              <Panel title="报表示例">
                <div>点击按钮打印一份报表</div>
                <br />
                <Print
                  trigger={<Button icon={<PrinterOutlined />}>打印</Button>}
                  content={<Report />}
                />
              </Panel>
              <Panel title="动态获取内容">
                <div>打印 EMOJI</div>
                <br />
                <Print
                  trigger={<Button icon={<PrinterOutlined />}>打印</Button>}
                  content={<Dynamic />}
                />
              </Panel>
            </Col>
            <Col span={12}>
              <Panel title="ref 对应的 DOM 元素 | React 节点">
                <div>将打印顶部说明内容</div>
                <br />
                {element1 ? (
                  <Print
                    trigger={<Button icon={<PrinterOutlined />}>打印</Button>}
                    content={element1}
                  />
                ) : null}
              </Panel>
              <Panel title="Canvas图表">
                <div style={{ height: 300 }}>
                  <EC option={this.getOption()} ref={this.saveElement2} />
                </div>
                <br />
                {element2 ? (
                  <Print
                    canvas
                    trigger={<Button icon={<PrinterOutlined />}>打印</Button>}
                    content={element2}
                  />
                ) : null}
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
