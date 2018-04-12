import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import { getEmployee } from '../service';
import config from '@/config';

export default modelEnhance({
  namespace: 'work',

  state: {
    pageData: PageHelper.create(),
    employees: [],
  },

  // 下面是原生的dva中effect,reducer的写法例子，其实可以完全用modelEnhance的@request写法简化
  effects: {
    * getEmployee(action, {select, put, call}) {
      const { status, data, message } = yield call(getEmployee);
      if (status) {
        yield put({type: 'getEmployeeSuccess', payload: data});
      } else {
        config.notice.error(message);
      }
    },
  },

  // 下面是原生的dva中effect,reducer的写法例子，其实可以完全用modelEnhance的@request写法简化
  reducers: {
    getEmployeeSuccess(state, { payload }) {
      return {...state, employees: payload};
    },
  },
});