import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/charts/ec',
  title: 'ECharts',
  component: dynamicWrapper(app, [], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
