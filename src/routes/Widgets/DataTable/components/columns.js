import React, { Fragment } from 'react';
import DataTable, { EditableOper } from 'components/DataTable';
import Icon from 'components/Icon';
import { Button } from 'antd';
const Tip = DataTable.Tip;

export const columns1 = [
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
        <DataTable.Oper>
          <Button tooltip="修改">
            <Icon type="edit" />
          </Button>
          <Button tooltip="删除">
            <Icon type="trash" />
          </Button>
        </DataTable.Oper>
      )
    }
  }
];

export const columns2 = [
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
    tableItem: {
      width: 200,
      render: text => <Tip>{text + text + text + text + text + text}</Tip>
    }
  }
];

export const columns3 = [
  {
    title: '角色',
    name: 'role',
    dict: [
      { code: '1', codeName: '管理员' },
      { code: '2', codeName: '游客' },
      { code: '3', codeName: '作者' }
    ],
    tableItem: {}
  }
];

export const columns4 = [
  {
    title: '名称',
    name: 'name',
    tableItem: {}
  },
  {
    title: '年龄',
    name: 'age',
    tableItem: {
      sorter: true
    }
  },
  {
    title: '地址',
    name: 'address',
    tableItem: {}
  }
];

export const columns5 = (self, editingKey) => [
  {
    title: '名称',
    name: 'name',
    tableItem: {
      type: 'input',
      editing: (text, record) => record.id === editingKey,
      rules: [{ required: true, message: '请输入名称！' }]
    }
  },
  {
    title: '年龄',
    name: 'age',
    tableItem: {
      type: 'number',
      editing: (text, record) => record.id === editingKey
    }
  },
  {
    title: '角色',
    name: 'role',
    dict: [
      { code: '1', codeName: '员工' },
      { code: '2', codeName: '经理' },
      { code: '3', codeName: '老总' }
    ],
    tableItem: {
      type: 'select',
      editing: (text, record) => record.id === editingKey
    }
  },
  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <EditableOper>
          {form =>
            record.id === editingKey ? (
              <Fragment>
                <a onClick={e => self.onSave(record, form)}>保存</a>
                <a onClick={e => self.onCancelEdit()}>取消</a>
              </Fragment>
            ) : (
              <a onClick={e => self.onEdit(record)}>修改</a>
            )
          }
        </EditableOper>
      )
    }
  }
];
