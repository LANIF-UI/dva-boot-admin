import {dynamicWrapper, createRoute} from '@/utils/core';

const routesConfig = (app) => ({
  path: '/crud/detail',
  title: 'CRUD示例-详情页路由',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default (app) => createRoute(app, routesConfig);
