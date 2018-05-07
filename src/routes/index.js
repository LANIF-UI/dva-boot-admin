import {createRoutes} from '@/utils/core';
import BaseLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import NotFound from './Pages/404';
import ScreenLock from './Pages/ScreenLock';
import Coming from './Pages/Coming';
import Login from './Login';
import Dashboard from './Dashboard';
import Blank from './Blank';

const routesConfig = (app) => ([
  {
    path: '/sign',
    title: '登录',
    indexRoute: '/sign/login',
    component: UserLayout,
    childRoutes: [
      Login(app),
      NotFound()
    ]
  }, {
    path: '/',
    title: '系统中心',
    component: BaseLayout,
    indexRoute: '/dashboard',
    childRoutes: [
      Dashboard(app),
      Blank(app),
      Coming(),
      ScreenLock(),
      NotFound(),
    ]
  }
]);

export default app => createRoutes(app, routesConfig);