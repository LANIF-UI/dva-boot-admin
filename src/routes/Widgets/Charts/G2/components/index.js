import React from 'react';
import { connect } from 'dva';
import { List } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Icon from 'components/Icon';
import Panel from 'components/Panel';
import SideLayout from '../../components/SideLayout';

@connect()
export default class extends BaseComponent {
  state = {
    activeKey: 'Line',
    chartTypes: [
      {
        title: '折线图 / Line',
        icon: 'line-chart',
        key: 'Line',
        components: ['./Line']
      },
      {
        title: '柱状图 / Bar',
        icon: 'bar-chart',
        key: 'Bar',
        components: ['./Bar']
      },
      {
        title: '饼图 / Pie',
        icon: 'pie-chart',
        key: 'Pie',
        components: ['./Pie', './Pie2']
      },
      {
        title: '点图 / Scatter',
        icon: 'dot-chart',
        key: 'Scatter',
        components: ['./Scatter']
      },
      { title: '地图 / Map', icon: 'global', key: 'Map', components: ['./Map'] },
      {
        title: '雷达图 / Radar',
        icon: 'trademark',
        key: 'Radar',
        components: ['./Radar']
      },
      {
        title: '仪表盘 / Gauge',
        icon: 'dashboard',
        key: 'Gauge',
        components: ['./Gauge']
      }
    ]
  };

  onSelect = activeKey => {
    this.setState({
      activeKey
    });
  };

  render() {
    const { chartTypes, activeKey } = this.state;
    const sideContent = (
      <List
        className="charts-type-list"
        dataSource={chartTypes}
        renderItem={item => (
          <List.Item
            actions={[<Icon type="ellipsis" antd />]}
            onClick={e => this.onSelect(item.key)}
          >
            <Icon type={item.icon} antd />
            {item.title}
          </List.Item>
        )}
      />
    );
    const active = chartTypes.filter(item => item.key === activeKey)[0];
    return (
      <SideLayout
        title="G2/BizCharts 图表"
        author="蚂蚁金服"
        site="https://alibaba.github.io/BizCharts/"
        sideContent={sideContent}
      >
        {active.components.map((item, index) => {
          const Chart = require(`${item}`).default;
          return (
            <Panel
              key={index}
              title={
                <div>
                  <Icon type={active.icon} antd />&nbsp;
                  {active.title}
                </div>
              }
              height={400}
            >
              <Chart />
            </Panel>
          );
        })}
      </SideLayout>
    );
  }
}
