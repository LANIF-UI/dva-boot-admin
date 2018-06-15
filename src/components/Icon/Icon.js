import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AntdIcon from 'antd/lib/icon';

/**
 * 字体图标，兼容antd的图标
 */
class Icon extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    font: PropTypes.string,
    antd: PropTypes.bool,
    spin: PropTypes.bool
  };

  static defaultProps = {
    prefixCls: 'antui-icon',
    className: '',
    font: 'ad'
  };

  render() {
    const {
      prefixCls,
      type,
      className,
      children,
      font,
      antd,
      spin,
      ...props
    } = this.props;
    const cn = classnames(
      prefixCls,
      {
        [font]: font,
        [font + '-' + type]: font && type,
        spin
      },
      className
    );
    if (/^&#x.+;$/.test(type)) {
      return <i className={cn} {...props} dangerouslySetInnerHTML = {{ __html: type }} />
    }
    return antd ? (
      <AntdIcon type={type} className={className} spin={spin} {...props}>
        {children}
      </AntdIcon>
    ) : (
      <i className={cn} {...props}>
        {children}
      </i>
    );
  }
}

export default Icon;
