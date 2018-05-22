# :beginner: DVA-BOOT-ADMIN

We use the React of the ecosystem is the most mature technology system, set up a set of out-of-the-box, admin dashboard system framework includes a unique custom components in the DBA, and many public praise good third-party components after much practice, it is not just a simple dashboard display interface, but also necessary to ensure that your next web project all the tools, we want to use it can be fast, stable develop robust, beautiful, easy to use web applications.
![](https://ucarecdn.com/6921a91d-ceb4-4bd0-bcc3-75b60af0eecd/TIM20180519221917.png)
## Feature
- Ant Design UI
- DVA2
- 数十个精心制作的小组件
- 多种页面布局
- 许多精心设计的页面及交互场景
- 后台接口数据模拟
- [dva-boot](https://github.com/LANIF-UI/dva-boot)脚手架封装的功能

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
$ npm install
$ npm start
```

## Change log
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
