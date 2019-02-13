# modelEnhance
这个是对dva model的一个封装，关于dva中的model写法，可以到[官网](https://dvajs.com/api/#model)学习一下，这个封装让我们简化其model的写法。我们为每个使用`modelEnhance`包装的**model**增加了一个`@request`类型的`effects`和相应的`reducers`

## 为什么用增加 `@request` 类型
使用`modelEnhance`不是为了让我们把异步请求都拿到视图组件中去写，只是为了让我们可以把一些简单的请求，不必定义`Model`与`Service`，如果你不习惯这种写法，完全可以按之前的写法来写，这个只是一个语法糖而已。

### 场景一
用户管理列表，使用用户`id`获取每一个用户的详细信息，让我们看一下两种写法的不同：

**之前的写法**
```js
// service.js 定义接口
// 使用用户id获取用户信息
export async function getDetail(payload) {
  return $$.post('/user/getDetail', payload);
}

// model.js 处理数据
export default {
  namespace: 'user',
  state: {
    userInfo: {},
  },
  effects: {
    *getDetail({ payload }, { call, put }) {
      const { status, message, data } = yield call(getDetail, payload);
      if (status) {
        yield put({
          type: 'getDetailSuccess',
          payload: data
        });
      } else {
        yield put({
          type: 'getDetailError',
          payload: { message }
        });
      }
    },
  },

  reducers: {
    getDetailSuccess(state, { payload }) {
      return {
        ...state,
        userInfo: payload
      };
    },
    getDetailError(state, { payload }) {
      return {
        ...state,
        message: payload.message
      };
    },
  }
};

// component.js 发送请求
dispatch({
  type: 'user/getDetail',
  payload: { id: 'xxx' }
});
```

可以看到我们只是查一个用户信息，但涉及到了三个文件的读写，如果用`modelEnhance`的写法，只需要在`component`中写下面的代码：

```js
dispatch({
  type: 'user/@request',
  payload: {
    valueField: 'userInfo',
    url: '/user/getDetail',
    data: { id: 'xxx' }
  }
});
```

这样的作法与我们在`model`与`service`中做的事情是一样的，只是由`modelEnhance`来帮我们完成了重复的工作

### 场景二
处理分页请求，在后台系统的开发中带分页的数据表格与查询是经常要写的，逻辑也都是大同小异，这时我们只需要在 `@request` 中带上 `pageInfo` 变量即可方便的发送一个分页请求

```js
// model.js 中初始化一个PageInfo实例PageHelper.create()
import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';

export default modelEnhance({
  namespace: 'crud',
  state: {
    pageData: PageHelper.create(),
  }
}

// component.js 请求时直接使用pageInfo进行分页即可，反回数据会存放到pageData中
dispatch({
  type: 'crud/@request',
  payload: {
    valueField: 'pageData',
    url: '/crud/getList',
    pageInfo: pageData.startPage(1, 10),
  }
});

// 使用filter追加查询条件，使用jumpPage进行跳页
dispatch({
  type: 'crud/@request',
  payload: {
    valueField: 'pageData',
    url: '/crud/getList',
    pageInfo: pageData.filter(values).jumpPage(2),
  }
});
```

### 场景二的另一种写法
上面的写法是把业务逻辑都写到了视图组件中，这样的写法适合简单且不会进行复用的场景.

如果我们不希望业务和视图耦合到一处，且同一`@request`需要多次进行复用，这时我们推荐这种写法(dva标准写法)，即把业务分离到**model**中，在`effects`中用`put`发出`@request`，在组件中通过`dispatch`调用相应`effect`,例如

model.js 详见*CRUD*示例中model的写法
```js
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
}
```

## 怎么使用

```js
// 在组件中
dispatch({
  type: 'ns/@request',      // @request请求
  payload: {
    actionType: 'typeName', // 表示自已处理reducer, 值为 actionType + ('_SUCCESS' | '_ERROR'),有此属性不必设置 valueField
    valueField: 'shopList', // 对应model中state里的key,响应结果会存到这个变量里，非必需
    url: 'apiAddress',      // 接口地址，必需
    method: 'POST',         // 默认为POST请求，非必需
    data: {},               // 需要传递的参数， 非必需
    pageInfo: pageData.startPage(1, 10), // 分页请求数据，用这个就不必写data参数，非必需
    notice: true,           // 操作完成后的通知，非必需
  },
  afterResponse: resp => resp, // 可以让我们有机会处理反回的数据，非必需
  success: resp => {}, // 在dispatch结束后得到成功的回调，非必需
  error: e => {}, // 在dispatch结束后得到失败的回调，非必需
});

// 在effects中
*getPageInfo({ payload }, { put }) {
  yield put({
    // 同上
  });
}
```