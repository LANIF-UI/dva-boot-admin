import { createRoute } from '@/utils/core';
import { P403 } from 'components/Pages';

const routesConfig = app => ({
  path: '/403',
  title: 'DBAdmin - 403',
  component: P403
});

export default app => createRoute(app, routesConfig);
 