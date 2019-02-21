import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
  namespace: 'crud',

  state: {
    pageData: PageHelper.create(),
    employees: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/crud' && !LOADED) {
          LOADED = true;
          dispatch({
            type: 'init'
          });
        }
      });
    }
  },

  effects: {
    // 进入页面加载
    *init({ payload }, { call, put, select }) {
      const { pageData } = yield select(state => state.crud);
      yield put({
        type: 'getPageInfo',
        payload: {
          pageData: pageData.startPage(1, 10)
        }
      });
      yield put({
        type: 'getEmployees'
      });
    },
    // 获取分页数据
    *getPageInfo({ payload }, { call, put }) {
      const { pageData } = payload;
      yield put({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: '/crud/getList',
          pageInfo: pageData
        }
      });
    },
    // 保存 之后查询分页
    *save({ payload }, { call, put, select, take }) {
      const { values, success } = payload;
      const { pageData } = yield select(state => state.crud);
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: '/crud/save',
          data: values
        }
      });
      // 等待@request结束
      yield take('@request/@@end');
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    // 修改
    *update({ payload }, { call, put }) {},
    // 删除 之后查询分页
    *remove({ payload }, { call, put, select }) {
      const { records, success } = payload;
      const { pageData } = yield select(state => state.crud);
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: '/crud/bathDelete',
          data: records.map(item => item.rowKey)
        }
      });
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    // 获取员工列表
    *getEmployees({ payload }, { call, put }) {
      yield put({
        type: '@request',
        afterResponse: resp => resp.data,
        payload: {
          valueField: 'employees',
          url: '/crud/getWorkEmployee'
        }
      });
    }
  },

  reducers: {}
});
