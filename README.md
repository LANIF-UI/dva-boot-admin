# :beginner: DVA-BOOT-ADMIN :lemon: :tangerine: :cherries: :cake: :grapes: :watermelon: :strawberry: :corn: :peach: :melon:

我们使用React生态系统的最成熟的技术体系，搭建的一套开箱即用的后台管理系统，框架里包含了一些独有的定制组件，以及许多经过大量实践口碑良好的第三方组件，它不仅仅是一个简单的仪表盘展示界面，更是保证您下一个web项目所必需的所有工具，我们希望使用它的人可以快速、稳定的开发出健壮、美观、易用的web程序。


[GitHub主页](https://github.com/LANIF-UI/dva-boot-admin) |
[码云主页](https://gitee.com/wiqi/dva-boot-admin)

![](https://ucarecdn.com/b296e689-19fd-46f5-863e-40c0d4ba7a61/1.jpg)

## Table of Contents
* [功能](#feature)
* [目录结构](#structure)
* [开发](#usage)
* [文档](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/index.md)
  - [如何开始](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/start.md)
  - [全局配置](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/config.md)
  - [modelEnhance用法](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/modelEnhance.md)
  - [pageHelper用法](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/pageHelper.md)
  - [组件](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/components.md)
  - [接口数据模拟](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/mock.md)
  - [FAQs](https://github.com/LANIF-UI/dva-boot-admin/blob/master/docs/faqs.md)
* [截图](#gallery)
* [更新日志](#change-log)
* [结尾](#end)

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

## End

欢迎大家提问题，感谢大家的PR，如果觉得不错，还请帮忙加个:star:哦

企鹅群 820881369 :penguin:

## Change log

- 增加Ripple按钮效果，在UI元素 > 按钮页
- 增加结果展示页面，在页面>结果页
- 增加用户注册页面
- 增加500错误页面
- 增加一个CardLayout布局，适合嵌入到其它系统界面，可以修改src>routes>index.js，替换`component: BasicLayout,`为`component: CardLayout,`查看效果
- 增加Gallery示例页面，在页面>画廊下
- 增加LazyLoad（懒加载）组件与WaterFall（瀑布流）组件
- 增加ModalTable & Button
- 增加Notification通知页面，在UI元素>消息下
- 增加TableForm，使表单支持Table类型字段 
- 增加ECharts Demo页面，在组件>图表>ECharts，EC组件修改自[echarts-for-react](https://github.com/hustcc/echarts-for-react)
- 增加G2 Demo页面，在组件>图表>G2
- 修改菜单获取方式，之前是登录成功后获取，改为从BasicLayout中获取。之前，如果修改菜单json，需要重新登录，修改后直接刷新即可
- 升级Icon组件增加对unicode代码的支持 `<Icon type={"&#xe734;"} font="iconfont" />`
- 增加TransferTree支持查询功能，示例见组件的穿梭树
- 增加Form与SearchBar的TreeSelect增加异步数据支持
- 修改SearchBar组件，Form组件，可增加appendTo属性，解决滚动时弹出的下拉框不随容器移动问题appendTo可为true|function
- 增加SideLayout组件，可开关左侧面板，用法见数据表格最后‘左侧树联动’的例子
- 增加对布局样式的调整（在换肤栏里），可以对头部，侧边栏，面包屑进行设置，并修改了几处样式问题
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

# Gallery

![](https://ucarecdn.com/7602439b-fa79-4a57-a2f1-c4448710c1c2/14.jpg)
![](https://ucarecdn.com/fcfdbd3f-3d43-4a1e-a090-10038f92e1a6/13.jpg)
![](https://ucarecdn.com/6f9862ab-d9e6-4bda-9c6f-9b6a608ccc2a/12.jpg)
![](https://ucarecdn.com/fd93aad7-7963-4cbb-9ffd-4a09c44ee0a0/11.jpg)
![](https://ucarecdn.com/5440ec1c-f524-46ab-826b-742f20476ddf/15.jpg)
![](https://ucarecdn.com/2f35d9c3-d5e8-4519-bfbc-a0ee310e6817/2.jpg)
![](https://ucarecdn.com/eaef12d9-c878-4311-a539-cf53fd461280/3.jpg)
![](https://ucarecdn.com/e44e4383-d49c-46a6-a708-dbc5078d33f4/4.jpg)
![](https://ucarecdn.com/bef74a5c-fc05-4dcb-8512-7429971110c1/6.jpg)
![](https://ucarecdn.com/55cdf8da-37e0-4f19-b24f-00f00eddf5e1/5.jpg)
![](https://ucarecdn.com/890cae0d-dcde-48b4-9434-19e5fee2c883/9.jpg)
![](https://ucarecdn.com/54014eec-406b-437f-9356-f466a1a868ab/7.jpg)
![](https://ucarecdn.com/4e8c9b75-11df-4108-8437-bdb2627e3ebc/8.jpg)
![](https://ucarecdn.com/7831ce59-f412-4109-a75c-2b9f86b78c43/10.jpg)
