import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/baseComponent',
  title: '组件父类',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
