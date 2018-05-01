import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import AntdIcon from "antd/lib/icon";

/**
 * 字体图标，兼容antd的图标
 */
class Icon extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    font: PropTypes.string,
    antd: PropTypes.bool
  };

  static defaultProps = {
    className: "",
    font: "ad"
  };

  render() {
    const { type, className, children, font, antd, ...props } = this.props;
    const cn = classnames(
      {
        [font]: !!font,
        [font + "-" + type]: !!font
      },
      className
    );
    return antd ? (
      <AntdIcon type={type} className={className} {...props}>
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
