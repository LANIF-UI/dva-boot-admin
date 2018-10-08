# 如何开始

开始之间最好先了解一下[dva.js](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)和create-react-app.

## 如何得到一个干净的工程结构

0. **routers**目录为页面文件夹，**routes**下的index.js为页面配置文件，除了这个文件，其它文件都是可选的。**Blank**,是一个空页面示例，我们可以复制这个快速生成一个路由页面。**Login**，是登录页面；**Register**是注册页面。
1. 留下我们需要的页面，把其它多余的文件夹删掉。
2. 打开**routes**下的**index.js**，我们要在这里面配置路由页面：
``` js
import {createRoutes} from '@/utils/core';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import NotFound from './Pages/404';
import Login from './Login';
import Register from './Register';
import Blank from './Blank';

const routesConfig = (app) => ([
  {
    path: '/sign',              // url 地址
    title: '登录',
    indexRoute: '/sign/login',  // 默认路由
    component: UserLayout,      // 页面布局
    childRoutes: [
      Login(app),               // 子路由页面
      Register(app),
      NotFound()                // 这个要放到最下面，当所有路由当没匹配到时会进入这个页面
    ]
  }, {
    path: '/',
    title: '系统中心',
    component: BasicLayout,
    indexRoute: '/blank', // 默认路由
    childRoutes: [
      Blank(app),
      NotFound(), // 这个要放到最下面，当所有路由当没匹配到时会进入这个页面
    ]
  }
]);

export default app => createRoutes(app, routesConfig);
```

## 新建一个页面

首先在`src/routes`下建一个路由文件夹，形式可仿造`src/routes/Blank`，路由页面由四部分组成，**components，model，service，index.js**，

### components视图页面

这部分由**index.js**和页面自已的样式**index.less**组成，下面是一个标准的空路由页面：
``` js
@connect() // dva connect
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page blank-page">
        <Content className={style.className}>空白页</Content>
      </Layout>
    );
  }
}
```
最外层最好使用示例中的嵌套结构，`Layout > Content`，并且为每一个路由页面起一个自已的`className`或`id` 如 `blank-page`,这样我们写这个页面特定样式的时候从这个样式开始写，不会与其它路由页面产生冲突。

### model 逻辑页面（dva model）- 非必需

model即为dvajs的model，推荐写法
```js
import modelEnhance from '@/utils/modelEnhance';

export default modelEnhance({
  namespace: 'blank',
});
```
`modelEnhance`为框架封装，可以简化**dvajs**的写法，之后会专门介绍，如果不需要，可以完全按**dvajs**来编写我们的**model**

### service 接口定义 (dva service) - 非必需

在这里定义我们的接口API, 如没有可以不写

### index.js 定义子路由 - 必需

```js
const routesConfig = app => ({
  path: '/blank',                // url
  title: 'blank page', // 页面标题
  component: dynamicWrapper(app, [import('./model')], () => import('./components')) // 如果没有 model 可以不写import('./model')
});
```

## 注册新页面到全局路由

在routers下的index.js里加入我们新写的页面即可。

## 配置路由到左侧菜单

在菜单的模拟数据里[`src/__mocks__/user.js`](https://github.com/LANIF-UI/dva-boot-admin/blob/master/src/__mocks__/user.js#L41)增加我们新写的这个路由页面
