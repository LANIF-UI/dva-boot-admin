import { routerRedux } from 'dva';
import { login } from '../service';
import $$ from 'cmn-utils';

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    message: '',
    user: {}
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/sign/login') !== -1) {
          $$.removeStore('user');
        }
      });
    }
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        const { status, message, data } = yield call(login, payload);
        if (status) {
          $$.setStore('user', data);
          yield put(routerRedux.replace('/'));
        } else {
          yield put({
            type: 'loginError',
            payload: { message }
          });
        }
      } catch (e) {
        console.log(e)
        yield put({
          type: 'loginError'
        });
      }
    },
    *logout(_, { put }) {}
  },

  reducers: {
    loginSuccess(state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        message: '',
        user: payload
      };
    },
    loginError(state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message
      };
    }
  }
};
