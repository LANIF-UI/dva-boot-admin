import React from 'react';
import { PageLoading, Notification } from '@/components';
const notice = Notification.notice;

/**
 * 应用配置 如请求格式，反回格式，异常处理方式，分页格式等
 */
export default {
  // 异步请求配置
  request: {
    prefix: '/api',

    /**
     * 因为modelEnhance需要知道服务器反回的数据，
     * 什么样的是成功，什么样的是失败，如
     * {status: true, data: ...} // 代表成功
     * {status: false, message: ...} // 代表失败
     * 下面写法代表只要有反回就认为是成功，
     * 实际中应该通过服务端反回的response中的
     * 成功失败标识来进行区分
     */
    afterResponse: (response) => {
      const {status, message} = response;
      if (status) {
        return response;
      } else {
        notice(message, 'error');
        return response;
      }
    },
    errorHandle: (err) => {
      // 请求错误全局拦截
      if (err.name === 'RequestError') {
        notice(err.text || err.message, 'error');
      }
    }
  },

  // 全局异常
  exception: {
    global: (err, dispatch) => {
      const errName = err.name;
      // RequestError为拦截请求异常
      if (errName === 'RequestError') {
        console.error(err); 
      } else {
        console.error(err);
      }
      notice(err.message, 'error');
    },
  },

  // 分页助手
  pageHelper: {
    // 格式化要发送到后端的数据
    requestFormat: (pageInfo) => {
      const { pageNum, pageSize, filters, sorts } = pageInfo;
      return {
        currentPage: pageNum,
        showCount: pageSize,
        sortMap: sorts,
        paramMap: filters,
      }
    },

    // 格式化从后端反回的数据
    responseFormat: (resp) => {
      const { currentPage, showCount, totalResult, dataList, totalPage } = resp.data;
      return {
        pageNum: currentPage,
        pageSize: showCount,
        total: totalResult, 
        totalPages: totalPage,
        list: dataList
      }
    }
  },

  // 路由加载效果
  router: {
    loading: <PageLoading loading />
  },
  
  /**
   * 模拟数据时包装反回数据
   * 因为，后端反回数据时一般都会在外边包装一层状态信息
   * 如成功时：
   * {
   *   status: true,
   *   data: responseData
   * }
   * 或出错时：
   * {
   *   status: false,
   *   code: 500,
   *   message: '用户名或密码错误'
   * }
   * 这里就是配置这两个函数，为了我们模拟数据时可以少写几行代码的 orz...
   */
  mock: {
    toSuccess: (response) => ({
      status: true,
      data: response,
    }),

    toError: (message) => ({
      status: false,
      message: message,
    }),
  },

  /**
   * 系统通知, 见modelEnhance.js,为了解耦
   */
  notice: {
    success: (message) => notice(message, 'success'),
    error: (message) => notice(message, 'error'),
    warning: (message) => notice(message, 'warn'),
    info: (message) => notice(message),
  }
}