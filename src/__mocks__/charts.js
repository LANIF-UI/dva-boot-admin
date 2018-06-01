/**
 * 模拟图表数据
 */
export default ({ fetchMock, delay, mock, toSuccess, toError }) => {
  return {
    '/api/charts/bar1': options => {
      return toSuccess(
        mock([
          { year: '1951 年', "sales|1-100": 100 },
          { year: '1952 年', "sales|1-100": 100 },
          { year: '1956 年', "sales|1-100": 100 },
          { year: '1957 年', "sales|1-100": 100 },
          { year: '1958 年', "sales|1-100": 100 },
        ]),
        400
      );
    },
    '/api/charts/bar2': options => {
      return toSuccess(
        mock([
          { name:'London', 'Jan.|1-100': 1, 'Feb.|1-100': 1, 'Mar.|1-100' : 1, 'Apr.|1-100': 1, 'May.|1-100': 1, 'Jun.|1-100': 1, 'Jul.|1-100': 1, 'Aug.|1-100': 1 },
          { name:'Berlin', 'Jan.|1-100': 1, 'Feb.|1-100': 1, 'Mar.|1-100' : 1, 'Apr.|1-100': 1, 'May.|1-100': 1, 'Jun.|1-100': 1, 'Jul.|1-100': 1, 'Aug.|1-100': 1}
        ]),
        400
      );
    }
  };
};
