import modelEnhance from '@/utils/modelEnhance';

export default modelEnhance({
  namespace: 'form',

  state: {
    treeData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/form') {
          dispatch({
            type: '@request',
            afterResponse: resp => resp.data,
            payload: {
              valueField: 'treeData',
              url: '/tree/getAsyncTreeSelect',
            }
          });
        }
      });
    }
  },
});