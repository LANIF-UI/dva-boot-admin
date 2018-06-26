import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/gallery',
  title: 'DBAdmin - Gallery page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
