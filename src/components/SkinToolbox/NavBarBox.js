import React from 'react';
import { Radio, Tag } from 'antd';
const RadioGroup = Radio.Group;

export default ({ theme, onChange }) => (
  <RadioGroup
    onChange={onChange}
    value={theme.navbar}
  >
    <Radio className="primary" value="primary">
      <Tag color="#1890ff">默认</Tag>
    </Radio>
    <Radio className="light" value="light">
      <Tag color="#b9b9b9">亮白</Tag>
    </Radio>
    <Radio className="info" value="info">
      <Tag color="#00bcd4">宝石</Tag>
    </Radio>
    <Radio className="warning" value="warning">
      <Tag color="#ffc107">阳光</Tag>
    </Radio>
    <Radio className="danger" value="danger">
      <Tag color="#f44336">热情</Tag>
    </Radio>
    <Radio className="alert" value="alert">
      <Tag color="#a992e2">典雅</Tag>
    </Radio>
    <Radio className="system" value="system">
      <Tag color="#48c9a9">专业</Tag>
    </Radio>
    <Radio className="success" value="success">
      <Tag color="#85d27a">生命</Tag>
    </Radio>
    <Radio className="grey" value="grey">
      <Tag color="#30363e">商务</Tag>
    </Radio>
    <Radio className="dark" value="dark">
      <Tag color="#001529">深蓝</Tag>
    </Radio>
  </RadioGroup>
)