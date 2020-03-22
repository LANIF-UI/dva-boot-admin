import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AntdIcon, { BorderOutlined } from '@ant-design/icons';

/**
 * 字体图标，兼容antd的图标
 */
class Icon extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    type: PropTypes.any.isRequired,
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
      return (
        <i
          className={cn}
          {...props}
          dangerouslySetInnerHTML={{ __html: type }}
        />
      );
    }
    if (antd) {
      const antdcn = classnames(prefixCls, className);
      if (typeof type === 'string') {
        const Icons = require('@ant-design/icons')[type] || BorderOutlined;
        return <Icons className={antdcn} spin={spin} {...props} />;
      } else if (React.isValidElement(type)) {
        return (
          <AntdIcon
            component={() => type}
            className={antdcn}
            spin={spin}
            {...props}
          />
        );
      }
    }
    return (
      <i className={cn} {...props}>
        {children}
      </i>
    );
  }
}

export default Icon;
