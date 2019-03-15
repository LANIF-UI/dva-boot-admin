import React from 'react';
import { Input } from 'antd';
import $$ from 'cmn-utils';
/**
 * 文本框元件
 */
export default (text, record, col) => {
  const { name, tableItem } = col;
  // 使用函数可以支持满足条件的指定单元格应用类型
  const { editing } = tableItem;

  if (!editing) return text;
  else if ($$.isFunction(editing) && !editing(text, record)) return text;
  else {
    return <Input size="small" value={record[name]} />;
  }
};
