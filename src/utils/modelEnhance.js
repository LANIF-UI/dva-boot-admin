import $$, {request} from 'cmn-utils';
import PageInfo from './pageHelper/PageInfo';
import config from '@/config';

const REQUEST = '@request';
const REQUEST_SUCCESS = '@request_success';
const REQUEST_ERROR = '@request_error';
 
async function asyncRequest(payload) {
  if (!payload || !payload.url) throw(new Error('payload require contains url opt'));
  /**
   * other中可以配置 method headers data 等参数
   */
  const {url, pageInfo, ...other} = payload;

  // 如果是分页查询 (格式化发送参数)
  if (pageInfo && pageInfo instanceof PageInfo) {
    const { pageNum, pageSize, filters, sorts } = pageInfo;
    let data = { pageNum, pageSize, filters, sorts };

    if ($$.isFunction(config.pageHelper.requestFormat)) {
      data = config.pageHelper.requestFormat(pageInfo);
    }
    other.data = data;
  }

  const _promise = other.method 
    ? request[other.method.toLowerCase()](url, other.data, other)
    : request.send(url, other);

  // 如果是分页查询（格式化反回结果）
  if (pageInfo && pageInfo instanceof PageInfo) {
    return _promise.then(resp => {
      if ($$.isFunction(config.pageHelper.responseFormat)) {
        const newPageInfo = config.pageHelper.responseFormat(resp);
        return Object.assign(pageInfo, newPageInfo);
      }
    })
  } else {
    return _promise
  }
}

export const simpleModel = {
  namespace: $$.randomStr(4),
  enhance: true,
  state: {},
  effects: {},
  reducers: {},
};

export default (model) => {
  const {namespace, state, subscriptions, effects, reducers, enhance} = {...simpleModel, ...model};

  if (!enhance) {
    return {namespace, state, subscriptions, effects, reducers};
  }
  return {
    namespace,
    state,
    subscriptions,
    effects: {
      // get old effect
      ...effects,
      /**
       * payload 如果传入数组形式的payload，会合并结果后调用一次渲染
       * success 在dispatch结束后得到成功的回调
       * error 在dispatch结束后得到失败的回调
       */
      * [REQUEST]({ payload, success, error, afterResponse }, { call, put }) {
        let _payloads = [];
        if ($$.isObject(payload)) {
          _payloads.push(payload);
        } else if ($$.isArray(payload)) {
          _payloads = payload;
        };

        const resultState = {
          success: {},
          error: {}
        };
      
        for (let i = 0; i < _payloads.length; i++) {
          /**
           * valueField: 返回结果将使用valueField字段的值来接收
           */
          const {valueField, notice, ...otherPayload} = _payloads[i];

          try {
            let response = yield call(asyncRequest, otherPayload);

            // 自已处理反回的数据，模拟reduce中的操作，这里不要写有副作用的函数
            if ($$.isFunction(afterResponse)) {
              let _r = afterResponse(response);
              if (_r) response = _r;
            }

            // 如果需要回调
            if (otherPayload.success) {
              otherPayload.success(response);
            }
            
            // 如果需要通知功能
            if (notice) {
              config.notice.success(notice === true ? '操作成功' : notice[0], 'success');
            }

            // 准备返回值
            resultState.success[valueField || '_@fake_'] = response;
          } catch(e) {
            // 如果需要通知功能, 通知会在config中进行配置
            // if (notice) {
            //   config.notice.error(notice === true ? (e.text || e.message) : notice[1], 'error');
            // }
            
            resultState.error['error'] = e;

            // 如果需要内部回调
            if ($$.isFunction(otherPayload.error)) {
              otherPayload.error(e);
            } else if ($$.isFunction(error)) {
              error(e);
            } 

            // 通知reducer
            yield put({
              type: REQUEST_ERROR,
              payload: resultState.error
            });
            // 如果出错提前终止
            break;
          }
        }

        // 通知reducer
        if (Object.keys(resultState.success).length) {
          // 如果需要回调
          if ($$.isFunction(success)) {
            success(resultState.success);
          }

          yield put({
            type: REQUEST_SUCCESS,
            payload: resultState.success
          });
        }
      },
    },
  
    reducers: {
      // get old reducers
      ...reducers,
      // append new request reducers
      [REQUEST_SUCCESS](state, { payload }) {
        return {
          ...state,
          ...payload
        };
      },
      [REQUEST_ERROR](state, { payload }) {
        return {
          ...state,
          ...payload
        };
      },
    },
  }
}