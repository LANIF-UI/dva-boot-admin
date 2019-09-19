import React from 'react';
import moment from 'moment';
import { InputNumber, Button } from 'antd';

export const columns1 = [
  {
    name: 'id',
    formItem: {
      type: 'hidden'
    }
  },
  {
    title: '角色类型',
    name: 'roleType',
    dict: [
      { code: '1', codeName: '111' },
      { code: '2', codeName: '222' },
      { code: '3', codeName: '333' }
    ],
    formItem: {
      type: 'select'
    }
  },
  {
    title: '角色名',
    name: 'roleName',
    formItem: {}
  },
  {
    title: '排序',
    name: 'ordder',
    formItem: {
      type: 'number'
    }
  }
];

export const columns2 = [
  {
    name: 'id',
    formItem: {
      type: 'hidden'
    }
  },
  {
    title: '角色类型',
    name: 'roleType',
    dict: [
      { code: '1', codeName: '111' },
      { code: '2', codeName: '222' },
      { code: '3', codeName: '333' }
    ],
    formItem: {
      type: 'select'
    }
  },
  {
    title: '角色名',
    name: 'roleName',
    formItem: {
      initialValue: '小兵'
    }
  }
];

export const columns3 = [
  {
    name: 'id',
    formItem: {
      type: 'hidden'
    }
  },
  {
    title: '角色类型',
    name: 'roleType',
    dict: [
      { code: '1', codeName: '类型一' },
      { code: '2', codeName: '类型二' },
      { code: '3', codeName: '类型三' }
    ],
    formItem: {
      type: 'select',
      rules: [{ required: true, message: '请选择一个角色类型！' }]
    }
  },
  {
    title: '角色名',
    name: 'roleName',
    formItem: {
      rules: [
        {
          required: true,
          message: '请输入角色名'
        },
        {
          pattern: /^[\w\u4E00-\u9FA5()]{1,20}$/,
          message: '角色名只能输入1-20个汉字、英文、数字、括号'
        }
      ]
    }
  },
  {
    title: '用户图标',
    name: 'avatar',
    formItem: {
      type: 'upload',
      listType: 'picture',
      initialValue: [{
        uid: 1,
        thumbUrl: 'https://avatars1.githubusercontent.com/u/34116960'
      }],
      rules: [
        {
          required: true,
          message: '请选择用户头像'
        }
      ],
      maxFileSize: 1000, // 最大限制 kb
      fileTypes: ['.png', '.jpg', '.gif'], // 允许类型
      max: 2
    }
  },
  {
    title: '文件列表',
    name: 'picture',
    formItem: {
      type: 'upload',
      initialValue: [
        {
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/xxx.png',
        },
        {
          uid: '2',
          name: 'yyy.png',
          status: 'done',
          url: 'http://www.baidu.com/yyy.png',
        },
        {
          uid: '3',
          name: 'zzz.png',
          status: 'error',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/zzz.png',
        }
      ]
    }
  },
  {
    title: '直接上传',
    name: 'userFile',
    formItem: {
      type: 'upload',
      action: 'https://httpbin.org/post', // 后台接口 例：/uploadFile 会走代理
      fileName: 'file1' // 后台接收的名字
    }
  }
];

export const columns4 = [
  {
    title: '用户名',
    name: 'user_name',
    formItem: {
      rules: [
        {
          required: true,
          message: '请输入用户名'
        }
      ]
    }
  },
  {
    title: '密码',
    name: 'user_password',
    formItem: {
      type: 'password'
    }
  }
];

export const columns5 = [
  {
    title: '用户名',
    name: 'user_name',
    formItem: {
      rules: [
        {
          required: true,
          message: '请输入用户名'
        }
      ]
    }
  },
  {
    title: '密码',
    name: 'user_password',
    formItem: {
      type: 'password',
      repeat: true
    }
  }
];

export const columns6 = [
  {
    title: '日期',
    name: 'date',
    formItem: {
      type: 'date'
    }
  },
  {
    title: '日期(时间)',
    name: 'datetime',
    formItem: {
      type: 'datetime',
      showTime: true,
      initialValue: moment()
    }
  },
  {
    title: '日期范围',
    name: 'rangedate',
    formItem: {
      type: 'date~'
    }
  },
  {
    title: '日期范围(时间)',
    name: 'rangedate2',
    formItem: {
      type: 'date~',
      showTime: true
    }
  },
  {
    title: '时间',
    name: 'time',
    formItem: {
      type: 'time'
    }
  }
];

export const columns7 = [
  {
    title: '日期',
    name: 'date',
    formItem: {
      type: 'date'
    }
  },
  {
    title: '日期(时间)',
    name: 'datetime',
    formItem: {
      type: 'datetime',
      col: { span: 12 },
      formItemLayout: {
        labelCol: { span: 12 },
        wrapperCol: { span: 12 }
      },
      showTime: true,
      initialValue: moment()
    }
  },
  {
    title: '日期范围',
    name: 'rangedate',
    formItem: {
      col: { span: 12 },
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
      },
      type: 'date~'
    }
  },
  {
    title: '日期范围(时间)',
    name: 'rangedate2',
    formItem: {
      type: 'date~',
      showTime: true
    }
  },
  {
    title: '时间',
    name: 'time',
    formItem: {
      type: 'time'
    }
  }
];

export const columns8 = [
  {
    name: 'id',
    formItem: {
      type: 'hidden'
    }
  },
  {
    title: '颜色',
    name: 'color',
    formItem: {
      type: 'transfer',
      initialValue: [1, 3],
      dataSource: [
        { key: 1, title: 'red' },
        { key: 2, title: 'yellow' },
        { key: 3, title: 'blue' },
        { key: 4, title: 'green' }
      ],
      onChange: (form, value) => console.log('---:', value),
      listStyle: {
        width: 114
      },
      rules: [{ required: true, message: '至少选择一种颜色！' }]
    }
  },
  {
    title: '颜色',
    name: 'popup-color',
    formItem: {
      type: 'transfer',
      modal: {
        // modal 属性
      },
      dataSource: [
        { key: 1, title: 'red' },
        { key: 2, title: 'yellow' },
        { key: 3, title: 'blue' },
        { key: 4, title: 'green' }
      ],
      onChange: (form, value) => console.log('。。。:', value),
      rules: [{ required: true, message: '至少选择一种颜色！' }]
    }
  }
];

export const columns9 = [
  {
    title: '用户名',
    name: 'user_name',
    formItem: {}
  },
  {
    title: '自定义表单',
    formItem: {
      type: 'custom',
      render: (record, form) => {
        const { getFieldDecorator } = form;
        return (
          <div>
            {getFieldDecorator('age', {
              initialValue: record && record.age
            })(<InputNumber />)}
            <Button size='small'>其它操作</Button>
          </div>
        );
      }
    }
  }
];

export const createColumns10 = (self, treeData) => [
  {
    title: 'address',
    name: 'key1',
    formItem: {
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
    formItem: {
      type: 'treeSelect',
      treeData: [
        {
          value: 'zhejiang',
          title: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              title: 'Hangzhou'
            }
          ]
        },
        {
          value: 'jiangsu',
          title: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              title: 'Nanjing'
            }
          ]
        }
      ]
    }
  },
  {
    title: 'asyncTreeSelect',
    name: 'key3',
    formItem: {
      type: 'treeSelect',
      treeData,
      loadData: self.onLoadData
    }
  },
  {
    title: '分隔线',
    formItem: {
      type: 'line'
    }
  },
  {
    title: '自动完成',
    name: 'name1',
    formItem: {
      type: 'autoComplete',
      dataSource: ['111', '222', '333']
    }
  },
  {
    title: '自动完成(异步)',
    name: 'name',
    formItem: {
      type: 'autoComplete',
      loadData: self.onLoadAutoCompleteData,
      valueField: 'name',
      keyField: 'id',
      renderItem: item => (
        <div>
          {item.name}/{item.age}岁/{item.city}
        </div>
      )
    }
  }
];

const innerColumns = [
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
  }
];

export const createColumns11 = (self, dataSource) => [
  {
    title: '用户名',
    name: 'name',
    formItem: {}
  },
  {
    title: '表格(弹窗)',
    name: 'field1',
    formItem: {
      type: 'table',
      rowKey: 'id',
      dataSource,
      columns: innerColumns,
      onChange: (form, value, rows) => console.log('。。。:', value, rows),
      loadData: self.onLoadTableData,
      initialValue: [11, 3, 5]
    }
  },
  {
    title: '表格(弹窗),回显',
    name: 'field2',
    formItem: {
      type: 'table',
      rowKey: 'id',
      titleKey: 'name',
      dataSource,
      columns: innerColumns,
      onChange: (form, value, rows) => console.log('。。。:', value, rows),
      loadData: self.onLoadTableData,
      initialValue: [
        // 初始值为对像数组时，可以用titleKey指定的字段回显
        { id: 3, name: '张三' },
        { id: 5, name: '赵四' },
        { id: 11, name: '王五' }
      ]
    }
  },
  {
    title: '表格(内联)',
    name: 'field3',
    formItem: {
      type: 'table',
      modal: false,
      rowKey: 'id',
      dataSource,
      columns: innerColumns,
      onChange: (form, value, rows) => console.log('。。。:', value, rows),
      loadData: self.onLoadTableData,
      initialValue: [11, 3, 5]
    }
  }
];

export const columns12 = [
  {
    title: '单选',
    name: 'radio1',
    dict: [
      { code: '1', codeName: 'Hangzhou' },
      { code: '2', codeName: 'Shanghai' },
      { code: '3', codeName: 'Beijing' },
      { code: '4', codeName: 'Chengdu' }
    ],
    formItem: {
      type: 'radio'
    }
  },
  {
    title: '单选（样式）',
    name: 'radio2',
    dict: [
      { code: '1', codeName: 'Hangzhou' },
      { code: '2', codeName: 'Shanghai' },
      { code: '3', codeName: 'Beijing' },
      { code: '4', codeName: 'Chengdu' }
    ],
    formItem: {
      type: 'radio',
      buttonStyle: 'solid'
    }
  },
  {
    title: '复选',
    name: 'radio3',
    dict: [
      { code: '1', codeName: 'Hangzhou' },
      { code: '2', codeName: 'Shanghai' },
      { code: '3', codeName: 'Beijing' },
      { code: '4', codeName: 'Chengdu' }
    ],
    formItem: {
      type: 'checkbox'
    }
  }
];
