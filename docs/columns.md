## column.js

column.js 可以同时作用于DataTable组件，Form组件，SearchBar组件，定义其数据结构。 

## 说明

column 反回为一个json数组
```javascript
[
  {
    title: '年龄', // 列名
    name: 'age',  // 唯一标识
    dict: [],     // 下拉或级联中用到的数据
    formItem: {    // 生成表单结构
      type: 'number', // 表单元素类型
      width: 100,  // 表单元素宽度
      rules: [],   // 表单验证规则
      render: (record, form) => (), // 当type:custom时，自定义渲染
      ...other // 其它附加属性，会被注入对应的元素中
    },
    tableItem: {    // 生成表格结构
      width: 100,   // 表格元素宽度
      type: 'oper|default' // 这个列
      render: (text, record) => (), // 自定义渲染
      ...other // 其它附加属性，会被注入对应的元素中, 参考antd Table的column配置
    },
    searchItem: {   // 生成搜索项结构
      type: 'number', // 搜索项类型
      width: 100,   // 搜索项元素宽度
      rules: [],    // 搜索项验证规则
      render: (record, form) => (), // 当type:custom时，自定义渲染
      ...other // 其它附加属性，会被注入对应的元素中
    }
  },
  {
    ...
  }
]

```

## 例子

```javascript
// app.js

import React from 'react';
import {Link} from 'react-router';
import {Button, Icon} from '../../../components';

export default (clazz) => {
  let columns = [
    {
      name: "cnId",
      formItem: {
        type: "hidden"
      }
    },
    {
      title: "字典类型",
      name: "codeType",
      formItem: {
        rules: [{
          required: true, 
          message: '请输入字典值' 
        }, {
          pattern: /^[a-zA-Z0-9_]{1,20}$/,
          message: '字典类型不允许输入特殊字符'
        }]
      },
      tableItem: {},
      searchable: {
        width: 120
      },
    },
    {
      title: "操作",
      tableItem: {
        width: 120,
        render: (text, record) => (
          <span className="table-row-button">
            <Button title="修改" tooltip onClick={e => clazz.onUpdate(record, e)}>
              <Icon type="edit" />
            </Button>
            <Button title="删除" tooltip onClick={e => clazz.onDelete(record, e)}>
              <Icon type="delete" />  
            </Button>
          </span>
        )
      },
    }
  ];

  return columns;
};

```
