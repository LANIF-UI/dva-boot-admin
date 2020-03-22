import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
  namespace: '<%=namespace %>',

  state: {
    pageData: PageHelper.create(),
    employees: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/<%=namespace %>' && !LOADED) {
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
      const { pageData } = yield select(state => state.<%=namespace %>);
      yield put({
        type: 'getPageInfo',
        payload: {
          pageData: pageData.startPage(1, 10)
        }
      });
    },
    // 获取分页数据
    *getPageInfo({ payload }, { call, put }) {
      const { pageData } = payload;
      yield put({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: '<%=api_0 %>',
          pageInfo: pageData
        }
      });
    },
    // 保存 之后查询分页
    *save({ payload }, { call, put, select }) {
      const { values, success } = payload;
      const { pageData } = yield select(state => state.<%=namespace %>);
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: '<%=api_1 %>',
          data: values
        }
      });
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
      const { pageData } = yield select(state => state.<%=namespace %>);
      yield put({
        type: '@request',
        payload: {
          notice: true,
          url: '<%=api_2 %>',
          data: records.map(item => item.id)
        }
      });
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    }
  },

  reducers: {}
});
