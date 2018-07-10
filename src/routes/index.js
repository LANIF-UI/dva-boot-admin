import {createRoutes} from '@/utils/core';
import BasicLayout from '@/layouts/BasicLayout';
// import CardLayout from '@/layouts/CardLayout';
import UserLayout from '@/layouts/UserLayout';
import NotFound from './Pages/404';
import ScreenLock from './Pages/ScreenLock';
import Page500 from './Pages/500';
import Coming from './Pages/Coming';
import Gallery from './Pages/Gallery';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Blank from './Blank';
import Toolbar from './Widgets/Toolbar';
import BaseComponent from './Widgets/BaseComponent';
import Column from './Widgets/Column';
import TransferTree from './Widgets/TransferTree';
import SearchBar from './Widgets/SearchBar';
import DataTable from './Widgets/DataTable';
import Form from './Widgets/Form';
import EC from './Widgets/Charts/EC';
import G2 from './Widgets/Charts/G2';
import Icon from './UI/Icon';
import Mask from './UI/Mask';
import Editor from './UI/Editor';
import CSSAnimate from './UI/CSSAnimate';
import Alerts from './UI/Alerts';
import CRUD from './Business/CRUD';

const routesConfig = (app) => ([
  {
    path: '/sign',
    title: '登录',
    indexRoute: '/sign/login',
    component: UserLayout,
    childRoutes: [
      Login(app),
      Register(app),
      NotFound()
    ]
  }, {
    path: '/',
    title: '系统中心',
    component: BasicLayout,
    indexRoute: '/dashboard',
    childRoutes: [
      Dashboard(app),
      Blank(app),
      Toolbar(app),
      Column(),
      SearchBar(),
      EC(app),
      G2(app),
      Icon(),
      Mask(),
      Editor(),
      CSSAnimate(),
      Alerts(),
      DataTable(app),
      Form(app),
      TransferTree(app),
      BaseComponent(),
      CRUD(app),
      Coming(),
      ScreenLock(),
      Gallery(),
      Page500(),
      NotFound(),
    ]
  }
]);

export default app => createRoutes(app, routesConfig);