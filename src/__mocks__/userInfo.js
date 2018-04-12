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
    // 一般用法
    'GET /api/getUserInfo': {
      name: '小雨',
      sex: '男',
      age: 18,
    },
    // 省略 method, 模拟真实请求延迟效果
    '/api/getUsers': delay([
      { name: 'jonn' },
      { name: 'weiq' },
    ]),
    // 表格带分页, 写成函数形式可以使用请求参数，
    // 更真实的模拟后端数据处理业务
    '/api/userInfo/getList': (options) => {
      const body = JSON.parse(options.body);
      const pageNum = body.pageNum;
      const idbase = (pageNum - 1) * 10 + 1;
      return toSuccess(mock({
        'pageNum': pageNum,
        'pageSize': 10,
        'size': 10,
        'total': 100,
        'totalPages': 10,
        'list|10': [{
          'id|+1': idbase,
          'name': '@cname',                   // 中文名称
          'age|1-100': 100,                   // 100以内随机整数
          'birthday': '@date("yyyy-MM-dd")',  // 日期
          'city': '@city(true)',              // 中国城市
          'phone': /^1[385][1-9]\d{8}/        // 手机号
        }],
      }), 400)
    }
  } 
}