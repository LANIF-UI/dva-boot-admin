import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/alerts',
  title: 'Alerts page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
