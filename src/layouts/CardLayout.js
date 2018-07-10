import React from 'react';
import { connect } from 'dva';
import { Layout, Menu } from 'antd';
import { Switch, routerRedux, Link } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import ElementQueries from 'css-element-queries/src/ElementQueries';
import './styles/basic.less';
import $$ from 'cmn-utils';
import cx from 'classnames';
import SkinToolbox from 'components/SkinToolbox';
import Icon from 'components/Icon';
import './styles/card.less';
const { Content, Header } = Layout;
const SubMenu = Menu.SubMenu;

/**
 * 水平菜单部局
 * @author weiq
 */
@connect(({ global }) => ({ global }))
export default class CardLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    const user = $$.getStore('user', []);
    const theme = $$.getStore('theme', {
      leftSide: 'darkgrey', // 左边
      navbar: 'light' // 顶部
    });
    if (!theme.layout) {
      theme.layout = [
        'fixedHeader',
        'fixedSidebar',
        'fixedBreadcrumbs'
        // 'hidedBreadcrumbs',
      ];
    }
    this.state = {
      theme, // 皮肤设置
      user,
      currentMenu: {}
    };

    props.dispatch({
      type: 'global/getMenu'
    });
  }

  componentDidMount() {
    ElementQueries.init();
  }

  componentWillMount() {
    // 检查有户是否登录
    const user = $$.getStore('user');
    if (!user) {
      this.props.dispatch(routerRedux.replace('/sign/login'));
    } else {
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.pathname !== this.props.location.pathname ||
      nextProps.global.flatMenu !== this.props.global.flatMenu
    ) {
      this.setState({
        currentMenu: this.getCurrentMenu(nextProps) || {}
      });
    }
  }

  getCurrentMenu(props) {
    const {
      location: { pathname },
      global
    } =
      props || this.props;
    const menu = this.getMeunMatchKeys(global.flatMenu, pathname)[0];
    return menu;
  }

  getMeunMatchKeys = (flatMenu, path) => {
    return flatMenu.filter(item => {
      return pathToRegexp(item.path).test(path);
    });
  };

  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  <Icon antd type={item.icon} />
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return (
        <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
      );
    }
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const itemPath = this.conversionPath(item.path);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          <Icon antd type={item.icon} />
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
      >
        <Icon antd type={item.icon} />
        <span>{name}</span>
      </Link>
    );
  };

  /**
   * 获得菜单子节点
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      })
      .filter(item => item);
  };

  // conversion Path
  // 转化路径
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };

  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const {
      location: { pathname },
      global
    } = this.props;

    const selectMenu = this.getMeunMatchKeys(global.flatMenu, pathname)[0];
    return selectMenu ? [selectMenu.path] : [];
  };

  onChangeTheme = theme => {
    $$.setStore('theme', theme);
    this.setState({
      theme
    });
  };

  render() {
    const { theme } = this.state;
    const { routerData, global } = this.props;
    const { menu } = global;
    const { childRoutes } = routerData;
    const classnames = cx('card-layout', 'full-layout', {
      fixed: theme.layout && theme.layout.indexOf('fixedSidebar') !== -1,
      'fixed-header':
        theme.layout && theme.layout.indexOf('fixedHeader') !== -1,
      'fixed-breadcrumbs':
        theme.layout && theme.layout.indexOf('fixedBreadcrumbs') !== -1,
      'hided-breadcrumbs':
        theme.layout && theme.layout.indexOf('hidedBreadcrumbs') !== -1
    });

    return (
      <Layout className={classnames}>
        <Header>
          <Menu
            onClick={this.handleClick}
            mode="horizontal"
            selectedKeys={this.getSelectedMenuKeys()}
            theme={theme.leftSide}
          >
            {this.getNavMenuItems(menu)}
          </Menu>
        </Header>
        <Content className="router-page">
          <Switch>{childRoutes}</Switch>
        </Content>
        <SkinToolbox onChangeTheme={this.onChangeTheme} theme={theme} />
      </Layout>
    );
  }
}
