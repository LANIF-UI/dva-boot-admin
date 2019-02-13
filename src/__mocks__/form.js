/**
 * 表单form示例中的模拟数据
 */
export default ({ fetchMock, delay, mock, toSuccess, toError }) => {
  // 模拟自动完成反回的数据
  return {
    '/api/form/autoComplete': options => {
      const body = JSON.parse(options.body);
      const userName = body;

      return toSuccess(
        mock({
          'list|3-10': [{
            'id': '@id',
            'name': userName + '@cword("零一二三四五六七八九十", 1, 2)', // 张三，赵四
            'age|1-100': 100,                   // 100以内随机整数
            'birthday': '@date("yyyy-MM-dd")',  // 日期
            'city': '@city(true)',              // 中国城市
            'phone': /^1[385][1-9]\d{8}/,       // 手机号
            'content': '@csentence',
          }]
        }),
        400
      );
    }
  };
};
