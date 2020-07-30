import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/<%=name %>',
  title: '<%=title %>',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
