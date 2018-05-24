import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/editor',
  title: 'DBAdmin - Editor page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
