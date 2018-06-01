import React, { PureComponent } from 'react';
import * as BizCharts from 'bizcharts';
import resizeMe from '@/decorator/resizeMe';
const { Chart } = BizCharts;

// 重写BizCharts的Chart
@resizeMe({ refreshRate: 50 })
class Charts extends PureComponent {
  onGetG2Instance = chart => {
    this.chart = chart;
  }

  render() {
    const { size, children, ...otherProps } = this.props;
    const { width, height } = size;

    return (
      <Chart 
        height={height} 
        width={width} 
        padding={'auto'} 
        {...otherProps}
        onGetG2Instance={(chart) => {
          this.chart = chart;
        }}
      >
        {children}
      </Chart>
    );
  }
}

BizCharts.Chart = Charts;
export default BizCharts;
