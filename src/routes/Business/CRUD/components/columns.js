import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import { Button } from 'antd';

export default (self, employees) => [
  {
    title: '单位名称',
    name: 'deptName',
    tableItem: {},
    searchItem: {},
    formItem: {},
  },
  {
    title: '配电网络',
    name: 'distributionNetwork',
    dict: [
      {code: '0', codeName: '城市'},
      {code: '1', codeName: '乡村'},
    ],
    tableItem: {},
    formItem: {
      type: 'select',
    }
  },
  {
    title: '作业地点',
    name: 'address',
    tableItem: {},
    formItem: {},
  },
  {
    title: '作业类型',
    name: 'type',
    tableItem: {},
    formItem: {}
  },
  {
    title: '开工时间',
    name: 'planBeginTime',
    tableItem: {},
    formItem: {
      type: 'datetime'
    }
  },
  {
    title: '竣工时间',
    name: 'planEndTime',
    tableItem: {},
    formItem: {
      type: 'datetime'
    }
  },
  {
    title: '到岗人员',
    name: 'workEmployee',
    tableItem: {
      render: (text) => text.map(item => item.title).join(',')
    },
    formItem: {
      type: 'transfer',
      modal: true,
      dataSource: employees,
      normalize: (value) => value.map(item => item.key)
    }
  },
  {
    title: '作业内容',
    name: 'content',
    formItem: {
      type: 'editor'
    }
  },
  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip="修改" onClick={self.onUpdate(record)}>
            <Icon type="edit" />
          </Button>
        <Button tooltip="删除" onClick={self.onDelete(record)}>
            <Icon type="trash" />
          </Button>
        </DataTable.Oper>
      )
    }
  }
];