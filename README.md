# :beginner: DVA-BOOT-ADMIN

我们使用React生态系统的最成熟的技术体系，搭建的一套开箱即用的后台管理系统，框架里包含了DBA中独有的定制组件，以及许多经过大量实践口碑良好的第三方组件，它不仅仅是一个简单的仪表盘展示界面，更是保证您下一个web项目所必需的所有工具，我们希望使用它的人可以快速、稳定的开发出健壮、美观、易用的web程序。

## 包含的功能
- Ant Design 组件库
- DVA2
- 数十个精心制作的小组件
- 多种页面布局
- 许多精心设计的页面及交互场景
- 后台接口数据模拟
- [dva-boot](https://github.com/LANIF-UI/dva-boot)脚手架封装的功能

## 目录结构
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

## 启动

``` javascript
$ git clone https://github.com/LANIF-UI/dva-boot-admin.git
$ cd dva-boot-admin
$ npm install
$ npm start
```

## 最近更新
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
