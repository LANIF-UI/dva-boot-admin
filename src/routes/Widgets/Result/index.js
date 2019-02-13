import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/result',
  title: '结果页',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
