import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/result',
  title: 'DBAdmin - Result page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
