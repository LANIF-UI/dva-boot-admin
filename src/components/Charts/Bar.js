import React, { Component } from 'react';
import Chart from './Charts';
import { Axis, Tooltip, Geom } from 'bizcharts';

class Bar extends Component {
  render() {
    const {
      height,
      width,
      forceFit,
      data,
      color = 'rgba(24, 144, 255, 0.85)',
      padding,
      ...otherProps,
    } = this.props;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    };

    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: y,
      }),
    ];

    const chartProps = {
      scale,
      forceFit,
      data,
      padding: padding || 'auto',
      ...otherProps,
    }

    return (
      <Chart {...chartProps}>
        <Axis name="x" title={false} />
        <Axis name="y" min={0} />
        <Tooltip showTitle={false} crosshairs={false} />
        <Geom type="interval" position="x*y" color={color} tooltip={tooltip} />
      </Chart>
    );
  }
}

export default Bar;