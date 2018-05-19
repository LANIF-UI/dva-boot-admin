import modelEnhance from '@/utils/modelEnhance';

export default modelEnhance({
  namespace: 'transferTree',

  state: {
    dataSource: [],
    asyncDataSource: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/transferTree') {
          dispatch({
            type: '@request',
            afterResponse: resp => resp.data,
            payload: [{
              valueField: 'dataSource',
              url: '/tree/getData',
            }, {
              valueField: 'asyncDataSource',
              url: '/tree/getAsyncData',
            }]
          });
        }
      });
    }
  },
});