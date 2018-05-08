import { createRoute } from '@/utils/core';
import { P500 } from 'components/Pages';

const routesConfig = app => ({
  path: '/500',
  title: 'DBAdmin - 500',
  component: P500
});

export default app => createRoute(app, routesConfig);
 