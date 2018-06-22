import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/alerts',
  title: 'DBAdmin - Alerts page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
