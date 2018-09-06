import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/column',
  title: 'Columns',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
