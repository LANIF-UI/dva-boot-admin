import React from 'react';
import { Radio, Tag } from 'antd';
const RadioGroup = Radio.Group;

export default ({ theme, onChange }) => (
  <RadioGroup
    onChange={onChange}
    value={theme.leftSide}
  >
    <Radio className="darkgrey" value="darkgrey">
      <Tag color="#30363e">深灰</Tag>
    </Radio>
    <Radio className="grey" value="grey">
      <Tag color="#aaa">浅灰</Tag>
    </Radio>
    <Radio className="dark" value="dark">
      <Tag color="#001529">Antd深蓝</Tag>
    </Radio>
    <Radio className="light" value="light">
      <Tag color="#efefef" style={{ color: '#666' }}>
        Antd亮白
      </Tag>
    </Radio>
  </RadioGroup>
)