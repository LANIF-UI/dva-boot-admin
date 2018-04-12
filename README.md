# :beginner: DVA-BOOT

这个脚手架设计的初衷是为了让您不用费心的挑选该用些什么技术搭建我们的工程，它已经包含了构建现代web的所必须的技术和一些流行的类库，它不是一个完整的实际应用程序，而是提供给您一组工具，可以开发出健壮、快捷的web程序。

使用dva 2以及React 16，动态路由，和按功能划分的目录，开发时不用关心其它目录，只在自已的路由下写新功能即可，配置也都在自已的目录中，团队成员开发不会互相冲突。

# Table of Contents
* [Project Structure](#project-structure)
* [Method](#method)
* [Development](#development)
* [Thank You](#thank-you)

## Project Structure
```
.
├── public                   # 不参与编译的资源文件
├── src                      # 主程序目录
│   ├── index.js             # 程序启动和渲染入口文件
│   ├── components           # 全局公共组件
│   ├── layouts              # 页面结构组件
│   │   ├── BasicLayout      # 基本布局
│   │   └── OtherLayout      # 布局组件根据具体功能调整，在路由配置中引用
│   ├── routes               # 动态路由目录（每个功能一个文件夹的MVC结构）
│   │   ├── index.js         # 路由配置文件
│   │   ├── Home             # 功能模块
│   │   │   ├── index.js     # 路由配置文件
│   │   │   ├── assets       # 单独属于这个模块的静态资源文件
│   │   │   ├── components   # 页面组件
│   │   │   ├── model        # dva model
│   │   │   ├── service      # dva service
│   │   │   └── routes **    # 子路由(目录结构与父级相同)
│   │   └── Login            # 功能模块
│   │       ├── index.js     # 路由配置文件
│   │       ├── assets       # 单独属于这个模块的静态资源文件
│   │       ├── components   # 页面组件
│   │       ├── model        # dva model
│   │       ├── service      # dva service
│   │       └── routes **    # 子路由(目录结构与父级相同)
│   ├── utils                # 工具类
│   └── assets               # 资源文件
│           ├── fonts        # 字体 & 字体图标
│           ├── images       # 图片
│           └── styles       # 全局样式
```

## Method

### modelEnhance

modelEnhance是对dva model层的简单包装函数，有时候我们只是想要简单的fetch一下，从服务端获取数据进行展示，之前可能要专门在model中写一些effects和reducers,在service中定义请求函数，如果用modelEnhance包装一下的话可以简写成下面的形式

```javascript
// src/routes/UserInfo/model/index.js

import modelEnhance from '@/utils/modelEnhance';

// 就是普通的dva model传入modelEnhance即可，不用定义其它变量
export default modelEnhance({
  namespace: 'userInfo',
});

// src/routes/UserInfo/components/index.js

// 在组件中直接发出一个类型为`@request`的action,
// 结果会存入userInfo对应的state中，使用的key为`valueField`的值
this.props.dispatch({
  type: 'userInfo/@request',
  payload: {
    url: 'http://httpbin.org/get',
    valueField: 'httpbin'
  }
});
```

### exception

全局异常处理

### fetch mock

模拟服务端响应数据，常常用在前后端分离的项目中，我们在开发新功能的时候，前后端是不同步的，这时我们就会创建一些数据原型，协商好后这时后端就可以开始开发，而我们可以继续使用模拟数据，只有当后端完成这个接口并测试通过后，二者才会被整合。这之后如果后端因为某些原因服务不可用时，我们也会很方便的切换回模拟数据，这样不会因为后端的问题而影响后续的开发。

要新建一些模拟数据只要在`__mocks__`文件夹中，创建一个文件，并在文件夹中的`index.js`中进行声明，一些例子可以直接在文件夹下面找到。

所有的模拟数据是在开发环境中运行的，当您打包成生产环境的包时，会自动屏蔽所有模拟数据接口。

```js
/**
 * 模拟请求数据
 * @param {FetchMock} fetchMock 当现有条件不满足时，可以使用fetchMock来进行扩展
 * @param {number} delay 增加延迟时间 ms
 * @param {function} mock 使用mock生成数据，例如：

   mock({
     'string|1-10': '★' // 生成最少1颗，最多10颗星字符
   })
   // {'string': '★★★★★★'} 
 */
export default (fetchMock, delay, mock) => {
  // 如果现有扩展不满足需求，可以直接使用fetchMock方法
  // fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    // 一般用法
    'GET /api/getUserInfo': {
      name: 'jonn'
    },
    // 省略 method, 模拟真实请求延迟效果
    '/api/getUsers': delay([
      { name: 'jonn' },
      { name: 'weiq' },
    ]),
    // 表格带分页
    '/api/userInfo/getList': delay(mock({
      'pageNum|+1': 1,                      // 递增加1
      'pageSize': 10,
      'size': 10,
      'total': 500,
      'totalPages': 50,
      'list|10': [{
        'name': '@cname',                   // 中文名称
        'age|1-100': 100,                   // 100以内随机整数
        'birthday': '@date("yyyy-MM-dd")',  // 日期
        'city': '@city(true)',              // 中国城市
        'phone': /^1[385][1-9]\d{8}/        // 手机号
      }],
    })) 
  } 
}

```

### page helper (简单分页)

在做后台系统的时候，做的最多的可能就是对表格的增、删、改、查，这时我们的页面一般是这样的，上面是对表格条件的检索框，中间是我们的数据表格，表格下面是分页组件，还会有新增，修改时用到表单组件

拿对表格数据进行检索这个场景来说，在搜索框（可能有多个）输入条件，点击搜索，检索到结果（可能非常多），我们会点击下面的分页组件进行翻页，翻页时我们就得带着之前的检索条件，我们会在发送请求前手动合并这些条件，并计算下一页的页数等

而`PageHelper`分页助手就是为了简化我们的代码量的，如使用`PageHelper.create()`这个方法会为我们自动生成分页对象
```js
// model.js

state: {
  pageData: PageHelper.create()
}
```
这时我们可以在组件中使用这个对象很方便的进行分页，及检索，并且支持链式写法，所有条件会自动进行合并，如：
```js
// components

const {pageData} = this.props;
// 查询第1页，每页10条，并且name为jonn的数据
pageData.startPage(1, 10).filter({name: 'jonn'}).filter(...).sortBy(...);

// 查询下一页，并且会带着之前的查询条件
pageData.nextPage();
```
我们还可以结合`modelEnhance`来使用分页，更多用法会在例子中进行说明。


### cmn-utils

脚手架使用了[cmn-utils](https://github.com/LANIF-UI/cmn-utils)做为工具库，这里面提供了请求、存储、事件等许多实用方法

## Development

```bash
$ git clone https://github.com/LANIF-UI/dva-boot.git
$ cd dva-boot
$ yarn
$ yarn start
```

## Thank You
- [create-react-app](https://github.com/facebookincubator/create-react-app)
- [dvajs](https://github.com/dvajs/dva)
- [react-script-antd-pro](https://github.com/WhatAKitty/react-script-antd-pro/tree/master/src)
- [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)
