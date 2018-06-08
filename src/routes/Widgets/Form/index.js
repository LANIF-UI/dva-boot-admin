import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/form',
  title: 'DBAdmin - Form page',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
