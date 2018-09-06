import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/button',
  title: '按钮',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
