import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/charts/ec',
  title: 'DBAdmin - ECharts page',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
