import { createRoute } from '@/utils/core';
import { Coming } from 'components/Pages';

const routesConfig = app => ({
  path: '/coming',
  title: 'DBAdmin - Coming Soon',
  component: Coming
});

export default app => createRoute(app, routesConfig);
