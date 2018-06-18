import React from 'react';
import { connect } from 'dva';
import { List } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Icon from 'components/Icon';
import SideLayout from '../../components/SideLayout';

@connect()
export default class extends BaseComponent {
  state = {
    chartTypes: [
      { title: '折线图 / Line', icon: 'line-chart' },
      { title: '柱状图 / Bar', icon: 'bar-chart' },
      { title: '饼图 / Pie', icon: 'pie-chart' },
      { title: '点图 / Scatter', icon: 'dot-chart' },
      { title: '地图 / Map', icon: 'global' },
      { title: '雷达图 / Radar', icon: 'trademark' },
      { title: '仪表盘 / gauge', icon: 'dashboard' }
    ]
  };

  render() {
    const { chartTypes } = this.state;
    const sideContent = (
      <List
        className="charts-type-list"
        dataSource={chartTypes}
        renderItem={item => (
          <List.Item actions={[<Icon type="ellipsis" antd />]}>
            <Icon type={item.icon} antd />
            {item.title}
          </List.Item>
        )}
      />
    );
    return (
      <SideLayout
        title="ECharts 图表"
        author="百度 ECharts 团队"
        site="http://echarts.baidu.com"
        sideContent={sideContent}
      />
    );
  }
}
