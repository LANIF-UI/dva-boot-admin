import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/banner',
  title: 'Banner 管理',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
