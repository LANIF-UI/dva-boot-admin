export default (self) => [
  {
    title: '姓名',
    name: 'name',
    searchItem: {
      group: '1',
    },
  },
  {
    title: '角色',
    name: 'role',
    dict: [
      {code: '1', codeName: '管理员'},
      {code: '2', codeName: '编辑'},
      {code: '3', codeName: '游客'},
    ],
    searchItem: {
      type: 'select',
      group: '1',
    }
  },
  {
    title: '生日',
    name: 'birthday',
    searchItem: {
      type: 'date',
      width: 120,
    }
  }
];