import { createRoute } from '@/utils/core';
import NotFound from 'components/Pages/404'

const routesConfig = (app) => ({
  title: '页面没有找到',
  component: NotFound,
});

export default (app) => createRoute(app, routesConfig);
