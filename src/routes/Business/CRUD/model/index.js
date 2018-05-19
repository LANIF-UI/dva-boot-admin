import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';

export default modelEnhance({
  namespace: 'crud',

  state: {
    pageData: PageHelper.create(),
    employees: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/crud') {
          dispatch({
            type: '@request',
            afterResponse: resp => resp.data,
            payload: {
              valueField: 'employees',
              url: '/crud/getWorkEmployee',
            }
          });
        }
      });
    }
  },

  effects: {
  },

  reducers: {
  },
});