import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/print',
  title: '打印',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
