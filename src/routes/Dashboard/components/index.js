import React from 'react';
import { connect } from 'dva';
import { Layout, Col, Row } from 'antd';
import Icon from 'components/Icon';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import G2 from 'components/Charts/G2';
import DataSet from '@antv/data-set';
import './index.less';
const { Content } = Layout;
const { Chart, Axis, Geom, Tooltip, Legend, Coord, Label } = G2;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234
  });
}

@connect(({ dashboard }) => ({
  dashboard
}))
export default class Dashboard extends BaseComponent {
  render() {
    const { dashboard } = this.props;
    const { bar1, bar2 } = dashboard;
    return (
      <Layout className="full-layout page dashboard-page">
        <Content>
          <Row gutter={20}>
            <Col md={6}>
              <Panel className="qq" header={false} cover>
                <Icon type="qq" antd />
                <h2>
                  <b>523</b>
                </h2>
                <h5 className="text-muted">QQ</h5>
              </Panel>
            </Col>
            <Col md={6}>
              <Panel className="wechat" header={false} cover>
                <Icon type="wechat" antd />
                <h2>
                  <b>99+</b>
                </h2>
                <h5 className="text-muted">微信</h5>
              </Panel>
            </Col>
            <Col md={6}>
              <Panel className="skype" header={false} cover>
                <Icon type="skype" antd />
                <h2>
                  <b>2</b>
                </h2>
                <h5 className="text-muted">skype</h5>
              </Panel>
            </Col>
            <Col md={6}>
              <Panel className="github" header={false} cover>
                <Icon type="github" antd />
                <h2>
                  <b>999</b>
                </h2>
                <h5 className="text-muted">github</h5>
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col>
              <Panel title="数据面板组件" height={300}>
                <div className="flex">
                  <div className="flex-auto-hidden flex flex-column">
                    <h4 className="flex-none">销售额分布</h4>
                    <div className="flex-auto-hidden">
                      <Bar2 data={bar2} />
                    </div>
                  </div>
                  <div className="flex-none sales-order">
                    <h4>门店销售额排名</h4>
                    <ul>
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span>{i + 1}</span>
                          <span>{item.title}</span>
                          <span>{item.total}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Panel>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col md={8}>
              <Panel title="折线图" height={260}>
                <Line1 />
              </Panel>
            </Col>
            <Col md={8}>
              <Panel title="饼图" height={260}>
                <Pie1 />
              </Panel>
            </Col>
            <Col md={8}>
              <Panel title="柱状图" height={260}>
                <Bar1 data={bar1} />
              </Panel>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

// source https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/bar/basic-column
const Bar1 = props => {
  return (
    <Chart data={props.data} scale={{ sales: { tickInterval: 20 } }}>
      <Axis name="year" />
      <Axis name="sales" />
      <Tooltip crosshairs={{ type: 'y' }} />
      <Geom
        type="interval"
        position="year*sales"
        color={[
          'year',
          ['#3da0ff', '#51ca73', '#fad337', '#424e87', '#985ce6']
        ]}
      />
    </Chart>
  );
};

// source https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/bar/grouped-column
const Bar2 = props => {
  const ds = new DataSet();
  const dv = ds.createView().source(props.data);
  dv.transform({
    type: 'fold',
    fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.'], // 展开字段集
    key: '月份', // key字段
    value: '月均降雨量' // value字段
  });
  return (
    <Chart data={dv}>
      <Axis name="月份" />
      <Axis name="月均降雨量" />
      <Legend />
      <Tooltip crosshairs={{ type: 'y' }} />
      <Geom
        type="interval"
        position="月份*月均降雨量"
        color={'name'}
        adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]}
      />
    </Chart>
  );
};

const Pie1 = props => {
  const data = [
    { item: '事例一', count: 40 },
    { item: '事例二', count: 21 },
    { item: '事例三', count: 17 },
    { item: '事例四', count: 13 },
    { item: '事例五', count: 9 }
  ];

  const dv = new DataSet.DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
  });
  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + '%';
        return val;
      }
    }
  };
  return (
    <Chart data={dv} scale={cols} padding={10}>
      <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
      <Axis name="percent" />
      <Legend
        position="right"
        offsetY={-window.innerHeight / 2 + 120}
        offsetX={-100}
      />
      <Tooltip
        showTitle={false}
        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
      />
      <Geom
        type="intervalStack"
        position="percent"
        color="item"
        tooltip={[
          'item*percent',
          (item, percent) => {
            percent = percent * 100 + '%';
            return {
              name: item,
              value: percent
            };
          }
        ]}
        style={{ lineWidth: 1, stroke: '#fff' }}
      >
        <Label
          content="percent"
          formatter={(val, item) => {
            return item.point.item + ': ' + val;
          }}
        />
      </Geom>
    </Chart>
  );
};

// https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/line/series
const Line1 = props => {
  const data = [
    { month: 'Jan', Tokyo: 7.0, London: 3.9 },
    { month: 'Feb', Tokyo: 6.9, London: 4.2 },
    { month: 'Mar', Tokyo: 9.5, London: 5.7 },
    { month: 'Apr', Tokyo: 14.5, London: 8.5 },
    { month: 'May', Tokyo: 18.4, London: 11.9 },
    { month: 'Jun', Tokyo: 21.5, London: 15.2 },
    { month: 'Jul', Tokyo: 25.2, London: 17.0 },
    { month: 'Aug', Tokyo: 26.5, London: 16.6 },
    { month: 'Sep', Tokyo: 23.3, London: 14.2 },
    { month: 'Oct', Tokyo: 18.3, London: 10.3 },
    { month: 'Nov', Tokyo: 13.9, London: 6.6 },
    { month: 'Dec', Tokyo: 9.6, London: 4.8 }
  ];
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  dv.transform({
    type: 'fold',
    fields: ['Tokyo', 'London'], // 展开字段集
    key: 'city', // key字段
    value: 'temperature' // value字段
  });

  const cols = {
    month: {
      range: [0, 1]
    }
  };
  return (
    <Chart data={dv} scale={cols}>
      <Legend />
      <Axis name="month" />
      <Axis name="temperature" label={{ formatter: val => `${val}°C` }} />
      <Tooltip crosshairs={{ type: 'y' }} />
      <Geom type="line" position="month*temperature" size={2} color={'city'} />
      <Geom
        type="point"
        position="month*temperature"
        size={4}
        shape={'circle'}
        color={'city'}
        style={{ stroke: '#fff', lineWidth: 1 }}
      />
    </Chart>
  );
};
