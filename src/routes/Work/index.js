import {dynamicWrapper, createRoute} from '@/utils/core';

const routesConfig = (app) => ({
  path: '/work',
  title: '作业计划',
  component: dynamicWrapper(app, [import('./model')], import('./components'))
});

export default (app) => createRoute(app, routesConfig);
