/**
 * 模拟作业计划表数据
 */
export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  return {
    // 表格带分页
    '-/api/site_operations_pc/work/getList': (options) => {
      const body = JSON.parse(options.body);
      const currentPage = body.currentPage;
      const idbase = (currentPage - 1) * 10 + 1;
      const paramMap = body.paramMap;
      const deptName = paramMap.deptName;

      return toSuccess(mock({
        'currentPage': currentPage,
        'showCount': body.showCount,
        'totalResult': 100,
        'totalPage': 10,
        [`dataList|${body.showCount}`]: [{
          'id|+1': idbase,
          'deptname': deptName ? deptName : '@cword(3, 5)',      
          'dicDistributionNetwork': '@cword(2)',
          'address': '@county(true)',
          'type': '@cword(3)',  
          'planBeginTime': '@date',
          'planEndTime': '@date',
          'workEmployeeList|1-3': [{
            'key|+1': 1,
            'name': '@cname',
          }],
          'content': '@csentence',
        }],
      }), 400)
    },
    '-/api/work/bathDelete': (options) => toSuccess({options}, 400),
    '-/api/work/getWorkEmployee': (options) => mock({
      'status': true,
      'data|10': [{
        'key|+1': 1,
        'title': '@cname',
      }]
    }),
    '-/api/work/save': (options) => toSuccess({options}, 800),
  }
}