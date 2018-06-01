# :beginner: DVA-BOOT-ADMIN

We use the React of the ecosystem is the most mature technology system, set up a set of out-of-the-box, admin dashboard system framework includes a unique custom components in the DBA, and many public praise good third-party components after much practice, it is not just a simple dashboard display interface, but also necessary to ensure that your next web project all the tools, we want to use it can be fast, stable develop robust, beautiful, easy to use web applications.
![](https://ucarecdn.com/8b5bbe87-d34a-4fc7-849e-fe17214e71f3/TIM20180601171049.png)
## Feature
- 封装了dva框架的数据流转，简单的请求可以不用在model和service中定义
- 封装了数据模模拟，可以独立于后台开发前台功能
- 封装了分页请求，简化并规范了分页逻辑
- 封装了fetch请求，适应与后台多种交互请求, body参数 parameter参数 path参数，动态请求头，请求前后拦截
- 扩展了antd写了许多实用的UI，通过一个配置生成即可生成，后台CRUD三件套
- 按业务模块划分的目录结构，尽量做到最小耦合
- 一些常用的小部件用法
- 许多精心设计的页面及交互场景
- [dva-boot](https://github.com/LANIF-UI/dva-boot)脚手架封装的功能
- 全局异常处理，全局请求拦截，公共配置提取

## Structure
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

## Usage

``` javascript
$ git clone https://github.com/LANIF-UI/dva-boot-admin.git
$ cd dva-boot-admin
// 使用yarn
$ yarn
$ yarn start
// 使用npm
$ npm install
$ npm start
```

## Change log
- 修改Dashboard增加几个图表展示
- 修改原有Charts为G2，对其进行轻量化封装，本身已经很好用了(为了增加其它图表支持，进行区分)
- 新增Form 组件展示页面
- 新增DataTable 组件展示页面
- 新增CSSAnimate UI页面
- 更新CSSAnimate 原有属性animationName更名为type (之前名子太长不易记)
- 新增Editor（富文本）页面
- 更新Panel组件增加刷新，关闭功能
- 新增Mask UI页面
- 增增Icon UI页面
- 新增SearchBar页面
- 新增TransferTree页面（扩展自antd的Transfer组件，可支持左侧为树的穿缩框，并支持异步加载）
- 更新内置ICON图标
- 增加CRUD页面
- 增加全局响应式标示（ElementQueries）
- 增加BaseComponent页面
- 增加Toolbar页面
- 增加404页面
- 增加柱型图
- 增加G2图表组件
- 增加resizeMe，可监控dom大小变化
- 页面增加登录页
- 页面增加锁屏页
- 页面增加Coming Soon页
- 组件增加Clock组件
- 组件增加密码解锁组件
- 组件增加Coming Soon组件
