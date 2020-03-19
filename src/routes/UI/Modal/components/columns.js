import React from 'react';
import { Oper } from 'components/DataTable';
import Icon from 'components/Icon';
import { Button } from 'antd';

export default [
  {
    title: '名称',
    name: 'name',
    tableItem: {}
  },
  {
    title: '年龄',
    name: 'age',
    tableItem: {}
  },
  {
    title: '地址',
    name: 'address',
    tableItem: {}
  },
  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <Oper>
          <Button tooltip="修改">
            <Icon type="edit" />
          </Button>
          <Button tooltip="删除">
            <Icon type="trash" />
          </Button>
        </Oper>
      )
    }
  }
];