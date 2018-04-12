import React from 'react';
import DataTable, {Tip} from 'components/DataTable';
import { Button, Icon } from 'antd';
import $$ from 'cmn-utils';
import { Spin } from 'antd'

export default (self, persons, fetching, r = {}, treeData) => [
  {
    name: 'id',
    formItem: {
      type: 'hidden',
    },
  },
  {
    title: '单位名称',
    name: 'deptname',
    tableItem: {
      width:140,
      render: text => <Tip>{text}</Tip>
    },
    searchItem: {
      width:176
    },
  },
  {
    title: '单位名称',
    name: 'deptid',
    formItem: {
      type: 'treeSelect',
      treeData: $$.getStore('user').deptList
    },
  },
  {
    title: '网络',
    name: 'dicDistributionNetwork',
    tableItem: {
      width: 80,
    },
    formItem: {}
  },
  {
    title: '作业地点',
    name: 'address',
    tableItem: {
      width: 100,
      render: text => <Tip>{text}</Tip>
    },
    formItem: {},
  },
  {
    title: '类型',
    name: 'workType',
    tableItem: {
      width: 80,
    },
    searchItem: {},
    formItem: {}
  },
  {
    title: '时间',
    name: 'planBeginTime',
    tableItem: {
      width:180,
      render: (text, record) => (
        <div>
          <div className='tt-wrap'><span className='t-start'>始</span>{record.planBeginTime}</div>
          <div className='tt-wrap'><span className='t-end'>终</span>{record.planEndTime}</div>
        </div>
      )
    },
  },
  {
    title: '开工时间',
    name: 'planBeginTime',
    formItem: {
      type: 'datetime'
    }
  },
  {
    title: '竣工时间',
    name: 'planEndTime',
    formItem: {
      type: 'datetime'
    }
  },
  {
    title: '到岗人员',
    name: 'workEmployeeList',
    searchItem: {},
    tableItem: {
      width:100,
      render: text => <div>{text.map((item, index) => <div key={index}>{item.name}</div>)}</div>
    },
    dict: persons,
    formItem: {
      type: 'transferTree',
      onChange: self.handleChange,
      modal: {
        width: 600
      },
      normalize: (value) => value.map(item => ({...item, key: item.cn, title: item.name})),
      loadData: self.onLoadData,
      dataSource: treeData,
      filter: node => !!node.isLeaf,
      titleText: '组织机构'
    }
  },
  // {
  //   title: '到岗人员',
  //   name: 'workEmployeeList',
  //   searchItem: {},
  //   tableItem: {
  //     width:100,
  //     render: text => <p>{text.map((item, index) => <div key={index}>{item.name}</div>)}</p>
  //   },
  //   dict: persons,
  //   formItem: {
  //     type: 'select',
  //     mode: "multiple",
  //     labelInValue: true,
  //     filterOption: false,
  //     onSearch: self.fetchUser,
  //     onChange: self.handleChange,
  //     normalize: (value) => value.map(item => ({...item, key: item.cn, label: <Tip>{item.name}</Tip>})),
  //     notFoundContent: fetching ? <Spin size="small" /> : null
  //   }
  // },
  {
    title: '作业内容',
    name: 'content',
    tableItem: {
      width:100,
      render: text => <Tip>{text}</Tip>
    },
    formItem: {
      type: 'textarea',
    }
  },
  {
    title: '备注',
    name: 'remark',
    formItem: {
      type: r && r.importType === '0' ? 'custom' : 'hidden',
      render: record => {
      	return record.importType === '0' ? <div className='remark-text'>{record.remark}</div> : '';
      }
    }
  },
  {
    title: '操作',
    tableItem: {
      width: 130,
      render: (text, record) => (
        <DataTable.Oper>
          <Button disabled={record.planStatus === '2'} tooltip="修改" onClick={self.onUpdate(record)}>
            <Icon type="edit" style={{  color: '#4dd2c1' }}  />
          </Button>
          <Button disabled={record.planStatus === '2' || record.importType === '0' || !record.deptid || record.workEmployeeList.size == 0}  tooltip="发布" onClick={self.onPublish(record)}>
            <Icon type="notification" />
          </Button>
          <Button disabled={record.planStatus === '2'} tooltip="删除" onClick={self.onDelete(record)}>
            <Icon type="delete" style={{  color: '#ff717a' }} />
          </Button>
        </DataTable.Oper>
      )
    }
  }
];