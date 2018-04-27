import React, { Component } from 'react';
import Icon from '../Icon';
import cx from 'classnames';
import './style/index.less';

/**
 * 面板组件
 */
class Panel extends Component {
  static defaultProps = {
    prefix: 'antui-panel'
  };

  render() {
    const { theme, prefix, className, title, width, style } = this.props;

    const classnames = cx(prefix, className, {
      theme: !!theme
    });

    const styles = {
      ...style,
      width,
    }

    return (
      <div className={classnames} style={styles}>
        <div className={`${prefix}-header`}>
          <span className={`${prefix}-header-title`}>{title}</span>
          <span className={`${prefix}-header-controls`}>
            <a className="panel-control-loader"><Icon type="refresh" /></a>
            <a className="panel-control-fullscreen"><Icon type="enlarge" /></a>
            <a className="panel-control-mini"><Icon type="minus" /></a>
            <a className="panel-control-remove"><Icon type="close" /></a>
          </span>
        </div>
        <div className={`${prefix}-panel-body`}>

        </div>
      </div>
    );
  }
}

export default Panel;
