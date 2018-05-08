import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

class Charts extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize() {
    this.setState({})
  }

  render() {
    const data = [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ];
    const cols = {
      'sales': {tickInterval: 20},
    };
    return (
      <Chart height={300} data={data} scale={cols} forceFit padding={'auto'}>
        <Axis name="year" />
        <Axis name="sales" />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom type="interval" position="year*sales" />
      </Chart>
    );
  }
}

export default Charts;
