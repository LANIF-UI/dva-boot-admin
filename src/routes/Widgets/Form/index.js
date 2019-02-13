import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/form',
  title: '表单',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
