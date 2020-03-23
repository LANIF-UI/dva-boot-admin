Changelog
=========

3.0.0
-----
框架整体升级，现已正式适配Antd 4.0 & CRA 3.0

### Features & Improvements
* 升级**react**到 ^16.13.0 (重写了不建议用的[生命周期函数](https://zh-hans.reactjs.org/docs/react-component.html))
* 升级**react-scripts**到 ^3.4.0
* 升级**react-app-rewired**到 ^2.1.5 (支持react-scripts v3)
* 升级**antd**到 ^4.0.3 (按4.0写法重写了不兼容的组件)
* 升级**dva**到 ^2.6.0
* 升级**cmn-utils**到 ^1.0.10 
* 优化了`Edirot,DataTable,TransferTree,Icon,...`等组件
* 加入了一些动画,如路由转场
* 修改了一些bug

2.1.0
-----
重要更新 :tada: :tada: :tada: 

### Features & Improvements
* 升级**create-react-app**到最新v2版本
* 使用**customize-cra**覆盖cra默认配置
* 兼容**ie10**及以上浏览器
* 重新优化的`Form`&`ScarchBar`，更易于扩展
* `Form`增加`upload`类型
* `modelEnhance`增加`@change`类型
* 增加`Coming Page`示例

2.0.0
-----
重要更新 :tada: :tada: :tada: 

### Features & Improvements
* 升级**create-react-app**到最新v2版本
* 使用**customize-cra**覆盖cra默认配置
* 兼容**ie10**及以上浏览器
* 重新优化的`Form`&`ScarchBar`，更易于扩展
* `Form`增加`upload`类型
* `modelEnhance`增加`@change`类型
* 增加`Coming Page`示例

1.1.0
-----
提供更多实用的组件，提升性能及稳定性

### Features
* 增加多级路由支持
* 增加Tabs布局
* 增加打印组件
* 增加BannerMng组件，可用于管理首页图片展示，轮播图片，适合少量图片、展示大图片的场景
### Improvements
* 小屏时左侧菜单侧滑弹出
* Form增加AutoComplete类型、upload类型、line分割线类型
* 面包屑按实际路由级别自动生成（跟据title）
* 完善文档

1.0.0
-----
经过大量的使用及问题修复，发布初始版本。

### Features
* 50+ 配套组件
* 26+ 个功能展示页面

0.0.1
-----

### Features && Improvements && Fixes

* 增加Ripple按钮效果，在UI元素 > 按钮页
* 增加结果展示页面，在页面>结果页
* 增加用户注册页面
* 增加500错误页面
* 增加一个CardLayout布局，适合嵌入到其它系统界面，可以修改src>routes>index.js，替换`component: BasicLayout,`为`component: CardLayout,`查看效果
* 增加Gallery示例页面，在页面>画廊下
* 增加LazyLoad（懒加载）组件与WaterFall（瀑布流）组件
* 增加ModalTable & Button
* 增加Notification通知页面，在UI元素>消息下
* 增加TableForm，使表单支持Table类型字段 
* 增加ECharts Demo页面，在组件>图表>ECharts，EC组件修改自[echarts-for-react](https://github.com/hustcc/echarts-for-react)
* 增加G2 Demo页面，在组件>图表>G2
* 修改菜单获取方式，之前是登录成功后获取，改为从BasicLayout中获取。之前，如果修改菜单json，需要重新登录，修改后直接刷新即可
* 升级Icon组件增加对unicode代码的支持 `<Icon type={"&#xe734;"} font="iconfont" />`
* 增加TransferTree支持查询功能，示例见组件的穿梭树
* 增加Form与SearchBar的TreeSelect增加异步数据支持
* 修改SearchBar组件，Form组件，可增加appendTo属性，解决滚动时弹出的下拉框不随容器移动问题appendTo可为true|function
* 增加SideLayout组件，可开关左侧面板，用法见数据表格最后‘左侧树联动’的例子
* 增加对布局样式的调整（在换肤栏里），可以对头部，侧边栏，面包屑进行设置，并修改了几处样式问题
* 修改Dashboard增加几个图表展示
* 修改原有Charts为G2，对其进行轻量化封装，本身已经很好用了(为了增加其它图表支持，进行区分)
* 新增Form 组件展示页面
* 新增DataTable 组件展示页面
* 新增CSSAnimate UI页面
* 更新CSSAnimate 原有属性animationName更名为type (之前名子太长不易记)
* 新增Editor（富文本）页面
* 更新Panel组件增加刷新，关闭功能
* 新增Mask UI页面
* 新增Icon UI页面
* 新增SearchBar页面
* 新增TransferTree页面（扩展自antd的Transfer组件，可支持左侧为树的穿缩框，并支持异步加载）
* 更新内置ICON图标
* 增加CRUD页面
* 增加全局响应式标示（ElementQueries）
* 增加BaseComponent页面
* 增加Toolbar页面
* 增加404页面
* 增加柱型图
* 增加G2图表组件
* 增加resizeMe，可监控dom大小变化
* 页面增加登录页
* 页面增加锁屏页
* 页面增加Coming Soon页
* 组件增加Clock组件
* 组件增加密码解锁组件
* 组件增加Coming Soon组件