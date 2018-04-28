import React, { Component } from 'react';
import Icon from '../Icon';
import cx from 'classnames';
import CSSAnimate from '../CSSAnimate';
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

  toggleExpandOrCollapse = open => e => {
    const { onChange } = this.props;
    this.setState({
      expand: !!open,
      collapse: !open
    });
    if (onChange) {
      onChange({
        expand: !!open,
        collapse: !open
      });
    }
  };

  onExpand = expand => e => {
    this.setState({
      expand,
      collapse: false,
    });
  }

  onCollapse = collapse => e => {
    this.setState({
      collapse,
      expand: false,
    });
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
      onClose
    } = this.props;

    const classnames = cx(prefix, className, {
      theme: !!theme,
      'panel-fullscreen': !!expand,
      'panel-collapsed': !!collapse
    });

    const styles = {
      ...style,
      width
    };

    return (
      <div className={classnames} style={styles}>
        <div className={`${prefix}-header`}>
          <span className={`${prefix}-header-title`}>{title}</span>
          <span className={`${prefix}-header-controls`}>
            <a className="panel-control-loader" onClick={onRefresh}>
              <Icon type="refresh" />
            </a>
            <a
              className="panel-control-fullscreen"
              onClick={this.onExpand(expand ? true: false)}
            >
              <Icon type={`${expand ? 'enlarge' : 'shrink'}`} />
            </a>
            <a
              className="panel-control-collapsed"
              onClick={this.onCollapse(collapse ? true : false)}
            >
              <Icon type={`${collapse ? 'plus' : 'minus'}`} />
            </a>
            <a className="panel-control-remove" onClick={onClose}>
              <Icon type="close" />
            </a>
          </span>
        </div>
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
