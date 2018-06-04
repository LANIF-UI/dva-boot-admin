import React, { PureComponent } from 'react';
import * as BizCharts from 'bizcharts';
import resizeMe from '@/decorator/resizeMe';
const { Chart } = BizCharts;

/**
 * 重写BizCharts的Chart，主要目地是传入外部size
 * BizCharts已经很好的封装了g2，最好的使用方式不是重造轮子，而是快速使用官网中的例子，并完美展现在我们的框架中
 * 所以我们没有新建Bar,Line,Pie这些组件，增加使用和学习的成本：）
 */
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
