import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import resizeMe from '@/decorator/resizeMe';
/**
 * 基于ECharts 4的简单封装
 */
@resizeMe({ refreshRate: 50 })
class ECharts extends Component {
  render() {
    const { size, children, ...otherProps } = this.props;
    const { width, height } = size;
    
    return (
      <div>
        
      </div>
    );
  }
}

export default ECharts;