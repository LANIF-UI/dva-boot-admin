import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/searchBar',
  title: 'DBAdmin - SearchBar page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
