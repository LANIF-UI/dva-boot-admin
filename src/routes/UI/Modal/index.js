import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/modal',
  title: '模态窗',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
