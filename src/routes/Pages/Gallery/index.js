import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/gallery',
  title: '画廊',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
