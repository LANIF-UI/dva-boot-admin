import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/editor',
  title: '富文本',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
