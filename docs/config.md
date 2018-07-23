# 全局配置
全局配置在`src/config.js`下，在这里可以配置全局通知，请求，异常处理，分页格式，数据模拟等

## notice 通知
现在框架中包含两种通知风格，一种是修改自**AntD**风格的通知`antdNotice`，另一种是自带的通知样式`normal`，通知将作用于操作成功或失败，或在视图页面使用`this.notice`时，具体如何写我们自已的通知风格，会在**components**章节中介绍。

```js
import { normal, antNotice } from 'components/Notification';

// 系统通知, 定义使用什么风格的通知，normal或antdNotice
const notice = antNotice;
```

## request 请求
我们使用[**cmn-utils**](https://github.com/LANIF-UI/cmn-utils)库中的requets处理我们的请求，所以我们这里也是对其request进行配置，我们下面展示几种典型用法，更多配置可以到cmn-utils中查找。

```js
  request: {
    // 配置这个参数，每次发送请求时都会默认增加这个前缀
    prefix: '/api',

    // 可跟据接口需求自定义头部信息，每次请求头部都会带着这些参数
    withHeaders: () => ({
      token: store.getStore("token"),
    }),

    /**
     * 每个请求反回时都会先进入这个函数，
     * 因为modelEnhance需要知道服务器反回的数据，
     * 什么样的是成功，什么样的是失败，如
     * {status: true, data: ...} // 代表成功
     * {status: false, message: ...} // 代表失败
     * 实际中应该通过服务端反回的response中的
     * 成功失败标识来进行区分
     */
    afterResponse: (response) => {
      const {status, message} = response;
      if (status) {
        return response;
      } else {
        // 这里我们抛出一个异常，会在下面的errorHandle中进行拦截
        throw new Error(message);
      }
    },

    // 即在请求出现错误时进入这个函数
    errorHandle: err => {
      // 请求错误全局拦截
      if (err.name === 'RequestError') {
        notice.error(err.text || err.message);
      }
    }
  },
```

## exception 

此处即为**dvajs**中的`onError`，可以看`src/index.js`，`effect` 执行错误或 `subscription` 通过 `done` 主动抛错时触发，可用于管理全局出错状态。
```js
app.use({ onError: config.exception.global });
```

## PageHelper 

分页助手是对程序中的所有分页请求的一个封装，为什么要把这一块单提出来，而不是发请求的时候拼装分页数据，主要是为了简化分页操作，因为后端可能不会按我们前端的数据表格组件提供标准的数据，所以每次请求数据时都会需要手动转换数据，查询分页的时候可以带着查询条件，看下面的代码对比
```js
// 没使用pageHelper
dispatch({
  type: 'crud/@request',
  payload: {
    valueField: 'pageData',
    url: '/crud/getList',
    data: {
      currentPage: 1,
      showCount: 10,
      paramMap: {}
    },
    success: resp => {
      return {
        pageNum: resp.currentPage,
        pageSize: resp.showCount,
        total: resp.totalResult,
        totalPages: resp.totalPage,
        list: resp.dataList
      }
    }
  }
});

// 使用pageHelper
dispatch({
  type: 'crud/@request',
  payload: {
    valueField: 'pageData',
    url: '/crud/getList',
    pageInfo: pageData.startPage(1, 10),
  }
});
```
具体配置项， 假设接口返回的数据格式为 `currentPage` 为当前页， `showCount` `为总页数，sortMap` 为排序项， `paramMap` 为查询参数，示例接口可以查看**__mocks__**下的crud.js
```js
pageHelper: {
  // 格式化要发送到后端的数据，按后台接口来写
  requestFormat: pageInfo => {
    const { pageNum, pageSize, filters, sorts } = pageInfo;
    return {
      currentPage: pageNum, // 当前页
      showCount: pageSize,  // 总页数
      sortMap: sorts,       // 排序字段
      paramMap: filters     // 查询参数
    };
  },

  // 格式化从后端反回的数据，把后端反回的数据，格式化为我们分页组件需要的数据
  responseFormat: resp => {
    const {
      currentPage, 
      showCount,
      totalResult,
      dataList,
      totalPage
    } = resp.data;
    return {
      pageNum: currentPage,
      pageSize: showCount,
      total: totalResult,
      totalPages: totalPage,
      list: dataList
    };
  }
},
```

## router 

路由切换时加载的效果，可换成自已喜欢的loading样式

## mock

模拟后台响应成功和失败的函数，用法可以看__mocks__下的文件，例：
```js
const data = { name: 'jonn' }
// 使用toSuccess包装后
toSuccess(data) // { status: true, data: { name: 'jonn'} }
// 使用toError包装后
toError('违反唯一性约束') // { status: false, message: '违反唯一性约束' }
```
应该与后台接口返回数据一样