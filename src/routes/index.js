import {createRoutes} from '@/utils/core';
import BaseLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import NotFound from './Pages/404';
import ScreenLock from './Pages/ScreenLock';
import Coming from './Pages/Coming';
import Login from './Login';
import Dashboard from './Dashboard';
import Blank from './Blank';
import Toolbar from './Widgets/Toolbar';
import BaseComponent from './Widgets/BaseComponent';
import Column from './Widgets/Column';
import TransferTree from './Widgets/TransferTree';
import SearchBar from './Widgets/SearchBar';
import DataTable from './Widgets/DataTable';
import Form from './Widgets/Form';
import Charts from './Widgets/Charts';
import Icon from './UI/Icon';
import Mask from './UI/Mask';
import Editor from './UI/Editor';
import CSSAnimate from './UI/CSSAnimate';
import CRUD from './Business/CRUD';

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
      Toolbar(app),
      Column(),
      SearchBar(),
      Charts(),
      Icon(),
      Mask(),
      Editor(),
      CSSAnimate(),
      DataTable(app),
      Form(app),
      TransferTree(app),
      BaseComponent(),
      CRUD(app),
      Coming(),
      ScreenLock(),
      NotFound(),
    ]
  }
]);

export default app => createRoutes(app, routesConfig);