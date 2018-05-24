import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/column',
  title: 'DBAdmin - Columns page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
