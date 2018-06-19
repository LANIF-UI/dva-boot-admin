import React from 'react';
import G2 from 'components/Charts/G2';
import DataSet from '@antv/data-set';
const { Chart, Axis, Geom, Tooltip, Legend, Coord, Label } = G2;

const { DataView } = DataSet;
const data = [
  { item: '事例一', count: 40 },
  { item: '事例二', count: 21 },
  { item: '事例三', count: 17 },
  { item: '事例四', count: 13 },
  { item: '事例五', count: 9 }
];
const dv = new DataView();
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

export default props => (
  <Chart
    data={dv}
    scale={cols}
    forceFit
  >
    <Coord type="theta" radius={0.75} />
    <Axis name="percent" />
    <Legend
      position="right"
      offsetY={0}
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
