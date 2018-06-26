/**
 * 模拟请求数据
 * @param {FetchMock} fetchMock 当现有条件不满足时，可以使用fetchMock来进行扩展
 * @param {function} delay 增加延迟时间 ms 例: delay(mockData) 或 delay(mockData, 200)
 * @param {function} mock 使用mock生成数据，例:

   mock({
     'string|1-10': '★' // 生成最少1颗，最多10颗星字符
   })

   // {'string': '★★★★★★'} 

  更多用法参考 http://mockjs.com/examples.html
 */
export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  // 如果现有扩展不满足需求，可以直接使用fetchMock方法
  // fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    '/api/user/login': (options) => {
      if (options.body) {
        const user = JSON.parse(options.body);
        if (user.userName === 'admin' && user.password === 'admin') {
          return toSuccess(mock({
            'userName': 'admin',                // 用户名
            'name': '@cname',                   // 中文名称
            'age|1-100': 100,                   // 100以内随机整数
            'birthday': '@date("yyyy-MM-dd")',  // 日期
            'city': '@city(true)',              // 中国城市
            'phone': /^1[385][1-9]\d{8}/,       // 手机号
            'token': '@guid'                    // token
          }), 400);
        } else {
          return toError('用户名或密码错误 admin/admin');
        }
      } else {
        return toError('请输入用户名和密码');
      }
    },
    '/api/user/menu': options => toSuccess([
      {
        name: '仪表盘',
        icon: 'dashboard',
        path: '/dashboard',
      },
      {
        name: '组件',
        icon: 'desktop',
        path: '/component',
        children: [
          {
            name: '工具条',
            path: '/toolbar',
          },
          {
            name: 'BaseComponent',
            path: '/baseComponent',
          },
          {
            name: 'Columns',
            path: '/column',
          },
          {
            name: '搜索条',
            path: '/searchBar',
          },
          {
            name: '数据表格',
            path: '/datatable',
          },
          {
            name: '表单',
            path: '/form',
          },
          {
            name: '穿梭树',
            path: '/transferTree',
          },
          {
            name: '图表',
            path: '/charts',
            children: [
              {
                name: 'ECharts',
                path: '/charts/ec',
              },
              {
                name: 'G2',
                path: '/charts/g2',
              },
            ]
          },
        ],
      },
      {
        name: 'UI元素',
        icon: 'share-alt',
        path: '/ui',
        children: [
          {
            name: '消息',
            path: '/alerts',
          },
          {
            name: '动画',
            path: '/animations',
          },
          {
            name: '图标',
            path: '/icons',
          },
          {
            name: '富文本',
            path: '/editor',
          },
          {
            name: '模态窗',
            path: '/modal',
          },
          {
            name: '遮罩',
            path: '/mask',
          },
        ],
      },
      {
        name: '页面',
        icon: 'book',
        path: '/page',
        children: [
          {
            name: '登录页',
            path: '/sign/login',
          },
          {
            name: '注册页',
            path: '/sign/register',
          },
          {
            name: '锁屏',
            path: '/lock',
          },
          {
            name: '画廊',
            path: '/gallery',
          },
          {
            name: '空白页',
            path: '/blank',
          },
          {
            name: 'Coming Soon',
            path: '/coming',
          },
          {
            name: '403',
            path: '/403',
          },
          {
            name: '404',
            path: '/404',
          },
          {
            name: '500',
            path: '/500',
          },
        ],
      },
      {
        name: '通用场景',
        icon: 'bulb',
        path: '/business',
        children: [
          {
            name: 'CRUD',
            path: '/crud',
          }
        ],
      },
    ], 400)
  } 
}