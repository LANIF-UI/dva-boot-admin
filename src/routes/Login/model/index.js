import { routerRedux } from 'dva/router';
import { login } from '../service';
import $$ from 'cmn-utils';

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    message: '',
    user: {},
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/user/login') !== -1) {
          $$.removeStore("user");
          const userId = $$.getQueryValue('userId');
          if (userId) {
            $$.setStore('userId', userId);
            $$.setStore('planType', $$.getQueryValue('plan_type'));
            dispatch({
              type: 'login',
              payload: {
              	'user_id': $$.getQueryValue('userId'),
              	'token': $$.getQueryValue('token'),
              	'app_key': $$.getQueryValue('app_key'),
              	'org_id': $$.getQueryValue('org_id'),
              	'time': $$.getQueryValue('time'),
              	'client_secret': $$.getQueryValue('client_secret')
              }
            })
          } else {
            
          }
        }
      });
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      const {status, message, data} = yield call(login, payload)
      if (status) {
        $$.setStore('user', data);
        yield put({
          type: 'loginSuccess',
          payload: data
        })
        yield put(routerRedux.replace($$.getQueryValue('forwardURL')));
      } else {
        yield put({
          type: 'loginError',
          payload: {message}
        })
      }
    },
    *logout(_, { put }) {

    },
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
  },
};