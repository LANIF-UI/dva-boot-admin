import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/image',
  title: 'Image page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
