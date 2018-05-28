import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/charts',
  title: 'DBAdmin - Charts page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
