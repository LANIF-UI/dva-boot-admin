import React from 'react';
import { Radio, Tag } from 'antd';
const RadioGroup = Radio.Group;

export default ({ theme, onChange }) => (
  <RadioGroup
    onChange={onChange}
    value={theme.leftSide}
  >
    <Radio className="dark" value="dark">
      <Tag color="#001529">深色</Tag>
    </Radio>
    <Radio className="grey" value="grey">
      <Tag color="#aaa">浅灰</Tag>
    </Radio>
    <Radio className="light" value="light">
      <Tag color="#efefef" style={{ color: '#666' }}>
        亮白
      </Tag>
    </Radio>
  </RadioGroup>
)