/**
 * 模拟CRUD数据
 */
export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  return {
    // 表格带分页
    '/api/datatable/getList': (options) => {
      const body = JSON.parse(options.body);
      const currentPage = body.currentPage;
      const idbase = (currentPage - 1) * 10 + 1;

      return toSuccess(mock({
        'currentPage': currentPage,
        'showCount': body.showCount,
        'totalResult': 100,
        'totalPage': 10,
        [`dataList|${body.showCount}`]: [{
          'id|+1': idbase,  
          'name': '@cname',
          'address': '@county()',
          'age|1-100': 1,  
          'role|1': ['1', '2', '3'],
        }],
      }), 400)
    },
    // 前台分页
    '/api/datatable/frontPaging': (options) => {
      return toSuccess(mock({
        [`list|33`]: [{
          'id|+1': 1,  
          'name': '@cname',
          'address': '@county()',
          'age|1-100': 1,  
          'role|1': ['1', '2', '3'],
        }],
      }), 400)
    },
  }
}