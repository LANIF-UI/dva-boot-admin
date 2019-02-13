import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/blank',
  title: '空白页',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
