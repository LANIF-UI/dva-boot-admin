import React, { Component } from 'react';
import cx from 'classnames';
import { Layout } from 'antd';
import './style/index.less';
const { Sider } = Layout;

class RightSideBar extends Component {
  static defaultProps = {
    fixed: true,
    theme: '',
  }

  render() {
    const {fixed, theme, collapsed} = this.props;

    const classnames = cx(
      'sidebar-right',
      {
        'affix': !!fixed,
        'sidebar-right-close': collapsed,
        [theme]: !!theme,
      }
    );

    return (
      <Sider
        className={classnames}
        width={300}
        collapsedWidth={0}
        collapsible
        collapsed={collapsed}
        trigger={null}
      >
        <div className="sidebar-right-content">
        </div>
      </Sider>
    )
  }
}

export default RightSideBar;