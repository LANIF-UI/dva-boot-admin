import React, { PureComponent } from 'react';
import { Chart } from 'bizcharts';
import resizeMe from '@/decorator/resizeMe';

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

export default Charts;
