import { createRoute } from '@/utils/core';
import { ScreenLock } from 'components/Pages';

const routesConfig = app => ({
  path: '/lock',
  title: '锁屏',
  component: ScreenLock
});

export default app => createRoute(app, routesConfig);
