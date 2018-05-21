import React from 'react';
import { Input, Icon } from 'antd';

export const columns1 = [
  {
    title: '角色类型',
    name: 'roleType',
    dict: [
      { code: '1', codeName: '111' },
      { code: '2', codeName: '222' },
      { code: '3', codeName: '333' }
    ],
    searchItem: {
      type: 'select'
    }
  },
  {
    title: '角色名',
    name: 'roleName',
    searchItem: {}
  },
  {
    title: '顺序',
    name: 'order',
    searchItem: {
      type: 'number',
      min: 1,
      max: 99
    }
  }
];

export const columns2 = [
  {
    title: '角色名',
    name: 'roleName',
    searchItem: {}
  },
  {
    title: '角色类型',
    name: 'roleType',
    dict: [
      { code: '1', codeName: '111' },
      { code: '2', codeName: '222' },
      { code: '3', codeName: '333' }
    ],
    searchItem: {
      type: 'select'
    }
  },
  {
    title: '顺序',
    name: 'order',
    searchItem: {
      type: 'number'
    }
  }
];

export const columns3 = [
  {
    title: '选择时间',
    name: 'date1',
    searchItem: {
      type: 'date'
    }
  },
  {
    title: '选择时间',
    name: 'date2',
    searchItem: {
      type: 'date~',
      width: 300,
      placeholder: ['这是开始时间', '这是结束时间']
    }
  },
  {
    title: '选择时间',
    name: 'date3',
    searchItem: {
      type: 'monthDate'
    }
  }
];

export const columns4 = [
  {
    title: '条件1',
    name: 'key1',
    searchItem: {}
  },
  {
    title: '条件2',
    name: 'key2',
    searchItem: {}
  },
  {
    title: '条件3',
    name: 'key3',
    searchItem: {}
  },
  {
    title: '条件4',
    name: 'key4',
    searchItem: {}
  },
  {
    title: '条件5',
    name: 'key5',
    searchItem: {}
  },
  {
    title: '条件6',
    name: 'key6',
    searchItem: {}
  },
  {
    title: '条件7',
    name: 'key7',
    searchItem: {}
  },
  {
    title: '条件8',
    name: 'key8',
    searchItem: {}
  },
  {
    title: '条件9',
    name: 'key9',
    searchItem: {}
  }
];

export const columns5 = [
  {
    title: 'address',
    name: 'key1',
    searchItem: {
      type: 'cascade',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing'
            }
          ]
        }
      ]
    }
  },
  {
    title: 'address1',
    name: 'key2',
    searchItem: {
      type: 'treeSelect',
      treeData: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing'
            }
          ]
        }
      ]
    }
  }
];

export const columns6 = [
  {
    title: '带图标',
    name: 'key',
    searchItem: {
      type: 'custom',
      render: (record, form) => {
        // ...
        const { getFieldDecorator } = form;
        return getFieldDecorator('userName', {
          rules: [{ required: true, message: '请输入用户名!' }]
        })(
          <Input
            prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            placeholder="用户名"
          />
        );
      }
    }
  }
];
