/**
 * 模拟菜单请求数据
 */
export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  return {
    '/api/menu': options => toSuccess([
      {
        name: '仪表盘',
        icon: 'dashboard',
        path: 'dashboard',
      },
      {
        name: '组件',
        icon: 'component',
        path: 'component',
        children: [
          {
            name: '工具条',
            path: 'toolbar',
          },
          {
            name: 'BaseComponent',
            path: 'baseComponent',
          },
          {
            name: 'Columns',
            path: 'column',
          },
          {
            name: '搜索条',
            path: 'searchBar',
          },
          {
            name: '数据表格',
            path: 'datatable',
          },
          {
            name: '表单',
            path: 'form',
          },
          {
            name: '穿梭树',
            path: 'transferTree',
          },
          {
            name: '图表',
            path: 'charts',
          },
        ],
      },
      {
        name: 'UI元素',
        icon: 'ui',
        path: 'ui',
        children: [
          {
            name: '按钮',
            path: 'buttons',
          },
          {
            name: '消息',
            path: 'alerts',
          },
          {
            name: '动画',
            path: 'animations',
          },
          {
            name: '图标',
            path: 'icons',
          },
          {
            name: '富文本',
            path: 'editor',
          },
          {
            name: '模态窗',
            path: 'modal',
          },
          {
            name: '遮罩',
            path: 'mask',
          },
        ],
      },
      {
        name: '页面',
        icon: 'page',
        path: 'page',
        children: [
          {
            name: '登录页',
            path: 'login',
          },
          {
            name: '注册页',
            path: 'register',
          },
          {
            name: '锁屏',
            path: 'screenLock',
          },
          {
            name: '画廊',
            path: 'gallary',
          },
          {
            name: 'Coming Soon',
            path: 'coming',
          },
          {
            name: '403',
            path: '403',
          },
          {
            name: '404',
            path: '404',
          },
          {
            name: '500',
            path: '500',
          },
          {
            name: '空白页',
            path: 'blank',
          },
        ],
      },
      {
        name: '通用场景',
        icon: 'business',
        path: 'business',
        children: [
          {
            name: 'CRUD',
            path: 'crud',
          }
        ],
      },
    ], 400)
  } 
}