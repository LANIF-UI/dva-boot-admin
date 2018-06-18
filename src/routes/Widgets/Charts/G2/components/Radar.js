import React from 'react';
import G2 from 'components/Charts/G2';
import DataSet from '@antv/data-set';
const { Chart, Axis, Geom, Tooltip, Legend, Coord } = G2;
const { DataView } = DataSet;
const data = [
  { item: 'Design', a: 70, b: 30 },
  { item: 'Development', a: 60, b: 70 },
  { item: 'Marketing', a: 50, b: 60 },
  { item: 'Users', a: 40, b: 50 },
  { item: 'Test', a: 60, b: 70 },
  { item: 'Language', a: 70, b: 50 },
  { item: 'Technology', a: 50, b: 40 },
  { item: 'Support', a: 30, b: 40 },
  { item: 'Sales', a: 60, b: 40 },
  { item: 'UX', a: 50, b: 60 }
];
const dv = new DataView().source(data);
dv.transform({
  type: 'fold',
  fields: ['a', 'b'], // 展开字段集
  key: 'user', // key字段
  value: 'score' // value字段
});

const cols = {
  score: {
    min: 0,
    max: 80
  }
};

export default props => (
  <Chart
    data={dv}
    scale={cols}
    forceFit
  >
    <Coord type="polar" radius={0.8} />
    <Axis
      name="item"
      line={null}
      tickLine={null}
      grid={{
        lineStyle: {
          lineDash: null
        },
        hideFirstLine: false
      }}
    />
    <Tooltip />
    <Axis
      name="score"
      line={null}
      tickLine={null}
      grid={{
        type: 'polygon',
        lineStyle: {
          lineDash: null
        },
        alternateColor: 'rgba(0, 0, 0, 0.04)'
      }}
    />
    <Legend name="user" marker="circle" offset={30} />
    <Geom type="area" position="item*score" color="user" />
    <Geom type="line" position="item*score" color="user" size={2} />
    <Geom
      type="point"
      position="item*score"
      color="user"
      shape="circle"
      size={4}
      style={{
        stroke: '#fff',
        lineWidth: 1,
        fillOpacity: 1
      }}
    />
  </Chart>
);
