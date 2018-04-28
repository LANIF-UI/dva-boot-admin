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

  constructor(props) {
    super(props);
    this.state = {
      collapse: props.collapse || false,
      expand: props.expand || false
    };
  }

  componentWillReceiveProps(nextProps) {
    const st = {};
    if ('collapse' in nextProps) {
      st.collapse = true;
    } else if ('expand' in nextProps) {
      st.expand = true;
    }
    if (Object.keys(st).length) {
      this.setState(st);
    }
  }

  onExpand = expand => e => {
    const { onChange } = this.props;

    this.setState({
      expand,
      collapse: false,
    });

    if (onChange) {
      onChange({
        expand,
        collapse: false,
      });
    }
  }

  onCollapse = collapse => e => {
    const { onChange } = this.props;

    this.setState({
      collapse,
      expand: false,
    });

    if (onChange) {
      onChange({
        collapse,
        expand: false,
      });
    }
  }

  render() {
    const { expand, collapse } = this.state;
    const {
      theme,
      prefix,
      className,
      title,
      width,
      style,
      children,
      onRefresh,
      onClose,
      header,
      cover,
    } = this.props;

    const classnames = cx(prefix, className, {
      theme: !!theme,
      'panel-fullscreen': !!expand,
      'panel-collapsed': !!collapse,
      'cover': !!cover,
    });

    const styles = {
      ...style,
      width
    };

    const Header = typeof header === 'undefined' ? (
      <div className={`${prefix}-header`}>
        <span className={`${prefix}-header-title`}>{title}</span>
        <span className={`${prefix}-header-controls`}>
          <a className="panel-control-loader" onClick={onRefresh}>
            <Icon type="refresh" />
          </a>
          <a
            className="panel-control-fullscreen"
            onClick={this.onExpand(expand ? false: true)}
          >
            <Icon type={`${expand ? 'shrink' : 'enlarge'}`} />
          </a>
          <a
            className="panel-control-collapsed"
            onClick={this.onCollapse(collapse ? false : true)}
          >
            <Icon type={`${collapse ? 'plus' : 'minus'}`} />
          </a>
          <a className="panel-control-remove" onClick={onClose}>
            <Icon type="close" />
          </a>
        </span>
      </div>
    ) : header

    return (
      <div className={classnames} style={styles}>
        {Header}
        <div className={`${prefix}-body`}>
          <div className="panel-content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Panel;
