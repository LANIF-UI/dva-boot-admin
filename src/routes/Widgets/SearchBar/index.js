import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/searchBar',
  title: '搜索条',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
