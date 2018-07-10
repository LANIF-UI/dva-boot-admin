import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = (app) => ({
  path: '/sign/register',
  title: 'DBAdmin - Register',
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
});

export default (app) => createRoute(app, routesConfig);
