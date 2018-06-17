import React from 'react';
import dva from 'dva';
import { Router } from 'dva/router';
import dynamic from 'dva/dynamic';
import createLoading from 'dva-loading';
import createHistory from 'history/createHashHistory';
import request from 'cmn-utils/lib/request';
import store from 'cmn-utils/lib/store';
import createRoutes from '@/routes';
import 'assets/styles/index.less';
import config from './config';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

// -> 初始化
const app = dva({ history: createHistory() });

// -> 插件
app.use(createLoading());
app.use({ onError: config.exception.global });

// -> 请求
request.config(config.request).headers(_ => ({
  userId: store.getStore('userId')
}));

// 使用mock数据
require('./__mocks__');
// -> Developer mock data
// if (process.env.NODE_ENV === 'development') {
//   require('./__mocks__');
// }

// -> loading
dynamic.setDefaultLoadingComponent(() => config.router.loading);

// -> 注册全局模型
app.model(require('./models/global').default);

// -> 初始化路由
app.router(({ history, app }) => (
  <LocaleProvider locale={zh_CN}>
    <Router history={history}>{createRoutes(app)}</Router>
  </LocaleProvider>
));

// -> Start
app.start('#root');