import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/dashboard',
  title: 'DBAdmin - dashboard page',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
