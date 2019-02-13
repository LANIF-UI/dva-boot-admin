import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/transferTree',
  title: '穿梭树',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
