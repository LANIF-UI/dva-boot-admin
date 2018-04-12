import React from 'react';
import { connect } from 'dva';
import { Switch, NavLink } from 'dva/router';
import './styles/user.less';

@connect()
export default class UserLayout extends React.PureComponent {
  render() {
    const {routerData} = this.props;
    const {childRoutes} = routerData;

    return (
      <div className="user-layout">
        <Switch>
          {childRoutes}
        </Switch>
      </div>
    );
  }
}