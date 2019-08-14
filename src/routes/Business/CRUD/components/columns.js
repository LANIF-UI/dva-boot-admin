import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { Link } from 'dva/router';

export default (self, employees) => [
  {
    title: '单位名称',
    name: 'deptName',
    tableItem: {},
    searchItem: {
      group: 'abc'
    },
    formItem: {}
  },
  {
    title: '配电网络',
    name: 'distributionNetwork',
    dict: [{ code: '0', codeName: '城市' }, { code: '1', codeName: '乡村' }],
    tableItem: {},
    formItem: {
      type: 'select'
    },
    searchItem: {
      type: 'select'
    }
  },
  {
    title: '作业地点',
    name: 'address',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: '作业类型',
    name: 'type',
    tableItem: {},
    formItem: {},
    searchItem: {}
  },
  {
    title: '开工时间',
    name: 'planBeginTime',
    tableItem: {},
    formItem: {
      type: 'datetime'
    },
    searchItem: {
      type: 'datetime'
    }
  },
  {
    title: '竣工时间',
    name: 'planEndTime',
    tableItem: {},
    formItem: {
      type: 'datetime'
    },
    searchItem: {
      type: 'datetime'
    }
  },
  {
    title: '到岗人员',
    name: 'workEmployee',
    tableItem: {
      render: text => text.map(item => item.title).join(',')
    },
    formItem: {
      type: 'transfer',
      modal: true,
      dataSource: employees,
      normalize: value => value.map(item => item.key)
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
          <Button tooltip="修改" onClick={e => self.onUpdate(record)}>
            <Icon type="edit" />
          </Button>
          <Button tooltip="删除" onClick={e => self.onDelete(record)}>
            <Icon type="trash" />
          </Button>
          <Button tooltip="跳转到新路由">
            <Link to={"/crud/detail?id=" + record.id}>
              <Icon type="link" antd />
            </Link>
          </Button>
        </DataTable.Oper>
      )
    }
  }
];
