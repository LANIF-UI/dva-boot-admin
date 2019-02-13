import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/charts/g2',
  title: 'G2',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
