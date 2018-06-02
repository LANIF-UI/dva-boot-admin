import { routerRedux } from 'dva/router';
import { login, getMenu } from '../service';
import $$ from 'cmn-utils';

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    message: '',
    user: {},
    menu: [],
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/sign/login') !== -1) {
          $$.removeStore('user');
          $$.removeStore('menu');
        }
      });
    }
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { status, message, data } = yield call(login, payload);
      if (status) {
        $$.setStore('user', data);
        yield put({
          type: 'getMenu',
          payload
        });
      } else {
        yield put({
          type: 'loginError',
          payload: { message }
        });
      }
    },
    *getMenu({ payload }, { call, put }) {
      const { status, data } = yield call(getMenu, payload);
      if (status) {
        const loopMenu = (menu, path) => {
          menu.forEach(item => {
            if (path) {
              item.parentPath = path;
            }
            if (item.children && item.children.length) {
              loopMenu(item.children, item.path);
            }
          });
        }
        loopMenu(data);
        
        $$.setStore('menu', data);
        yield put({
          type: 'getMenuSuccess',
          payload: data,
        });
        yield put(routerRedux.replace('/'));
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
    },
    getMenuSuccess(state, { payload }) {
      return {
        ...state,
        menu: payload,
      };
    }
  }
};
