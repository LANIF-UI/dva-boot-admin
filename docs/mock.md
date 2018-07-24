# Mock 数据写法

我们使用Mock.js生成随机数据，所以**mock**数据前先到其[官网](http://mockjs.com)了解一下。

## 如何注册模拟接口

0. 在`src/__mocks__`下新建一个文件，例如demo.js。
1. 在`src/index.js`中注册新建的demo.js。
```js
import packMock from '@/utils/packMock';
import demo from './demo';

packMock(
  demo,
);
```
2. 在demo.js中模拟需要的接口。

## 使用方式

### 直接暴露简单对象
demo.js
```js
export default {
  // Get方式 后跟接口地址
  'GET /api/getUserInfo': {
    name: '小雨',
    sex: '男',
    age: 18,
  },
  // 可以不指定请求方式
  '/api/getUserInfo1': ['one', 'two', 'three'],
}
```

### 使用API函数，可生成随机数据
demo.js
```js
export default ({ fetchMock, delay, mock, toSuccess, toError }) => {
  return {
    '/api/charts/bar1': options => {
      return toSuccess(
        mock([
          { year: '1951 年', "sales|1-100": 100 }, // 1-100 的随机数
          { year: '1952 年', "sales|1-100": 100 },
          { year: '1956 年', "sales|1-100": 100 },
          { year: '1957 年', "sales|1-100": 100 },
          { year: '1958 年', "sales|1-100": 100 },
        ]),
        400
      );
    },
  };
};
```

## API

### `delay`
为了让模拟接口更直实，可以增加一个延时，单位ms，例如：
```js
// 随机延时
delay({ no: 123 }) // { no: 123 }

// 200毫秒延时
delay({ no: 123 }, 200) // { no: 123 } 
```

### `mock`
如果需要生成随机数，需要使用用`mock`函数，mock函数写法参考 http://mockjs.com/examples.html
```js
mock({ "string|1-10": "★" }) // { "string": "★★★★★★★" }
```

### toSuccess | toError
这个即为全局配置文件`src/config.js`中的`mock`下的`toSuccess,toError`，可以让我们模拟接口时少写几行代码。
```js
// 随机延时
toSuccess(mock({ 
  "string|1-10": "★" 
}))
// { status: true, data: { string: "★★" } }

// 增加400ms延时
toSuccess(mock({ 
  "string|1-10": "★" 
}), 400)
// { status: true, data: { string: "★★★★" } }
```

### `fetchMock`
fetchMock可以拦截请求，使用模拟数据代替真实接口数据，框架本身已装包装好了fetchMock的实现，如果现有封装不满足，可以自行扩展，[FetchMock官网](http://www.wheresrhys.co.uk/fetch-mock/api)，一般不需要扩展。


## 对接直实接口
当后端提供给我们真实接口的时候，我们需要替换我们的模拟接口，这里我只是简单的把模拟接口进行注释掉，或在`__mocks__/index.js`中注释掉这个文件，希望大家提供一个更好的方式。

