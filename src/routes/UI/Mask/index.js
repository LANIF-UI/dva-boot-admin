import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/mask',
  title: 'DBAdmin - Mask page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
