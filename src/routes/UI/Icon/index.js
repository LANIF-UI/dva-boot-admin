import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/icons',
  title: 'DBAdmin - Icons page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
