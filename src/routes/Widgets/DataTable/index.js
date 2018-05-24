import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/datatable',
  title: 'DBAdmin - DataTable page',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
