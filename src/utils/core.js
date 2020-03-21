import React from 'react';
import { dynamic, router } from 'dva';
import $$ from 'cmn-utils';
import config from '@/config';
const { Route, Switch, Redirect } = router;

/**
 * 生成动态组件
 * @param {*} app
 * @param {*} models
 * @param {*} component
 */
export const dynamicWrapper = (app, models, component) =>
  dynamic({
    app,
    models: () => models,
    component
  });

/**
 * 生成一组路由
 * @param {*} app
 * @param {*} routesConfig
 */
export const createRoutes = (app, routesConfig) => {
  const routes = routesConfig(app)
    .map(config => createRoute(app, () => config))
    .reduce((p, n) => {
      if (n.length) {
        return [...p, ...n];
      } else {
        return p.concat(n);
      }
    }, []);
  return <Switch>{routes}</Switch>;
};
// 路由映射表
window.dva_router_pathMap = {};
/**
 * 生成单个路由
 * @param {*} app
 * @param {*} routesConfig
 */
export const createRoute = (app, routesConfig) => {
  const {
    component: Comp,
    path,
    indexRoute,
    title,
    exact,
    ...otherProps
  } = routesConfig(app);

  if (path && path !== '/') {
    window.dva_router_pathMap[path] = { path, title, ...otherProps };
    // 为子路由增加parentPath
    if (otherProps.childRoutes && otherProps.childRoutes.length) {
      otherProps.childRoutes.forEach(item => {
        if (window.dva_router_pathMap[item.key]) {
          window.dva_router_pathMap[item.key].parentPath = path;
        }
      });
    }
  }

  // 把Redirect放到第一个
  if (indexRoute && $$.isArray(otherProps.childRoutes)) {
    otherProps.childRoutes.unshift(
      <Redirect key={path + '_redirect'} exact from={path} to={indexRoute} />
    );
  }

  const routeProps = {
    key: path || $$.randomStr(4),
    render: props => {
      // 此处可以做路由权限判断
      setDocumentTitle(title);
      return <Comp routerData={otherProps} {...props} />
    }
  };

  return <Route path={path} exact={!!exact} {...routeProps} />;
};

/**
 * 设置页面title
 * @param {*} title 
 */
function setDocumentTitle(title) {
  const documentTitle = config.htmlTitle ? config.htmlTitle.replace(/{.*}/gi, title) : title
  if (documentTitle !== document.title) {
    document.title = documentTitle;
  }
}
