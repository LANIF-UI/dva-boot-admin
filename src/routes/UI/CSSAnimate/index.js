import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/animations',
  title: 'DBAdmin - CSSAnimate page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
