import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/toolbar',
  title: '工具条',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
