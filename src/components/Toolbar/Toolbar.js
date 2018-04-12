import React from 'react';
import { Icon } from 'antd';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './style/index.less';

export default class Toolbar extends React.Component {
    
  static propTypes = {
    appendLeft: PropTypes.node,
    appendRight: PropTypes.node,
    disabledDel: PropTypes.bool,
    children: PropTypes.node,
    childrenClassName: PropTypes.string,
    pullDown: PropTypes.any,
    pullDownExclude: PropTypes.bool
  }

  static defaultProps = {
    disabledAdd: false,
    disabledDel: false,
    pullDownExclude: true,
    childrenClassName: "toolbar-right",
    prefixCls: "antui-toolbar-box",
  }
  
  constructor() {
    super();
    
    this.state = {
      openPullDown: false
    };
  }
  
  togglePullDown = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      openPullDown: !this.state.openPullDown
    });
  }

  render() {
    const {prefixCls, className, appendLeft, pullDownExclude, childrenClassName, children, pullDown} = this.props;
        
    return (
      <div className={cx(prefixCls, className)}>
        <div className="content-box">
          <div className="top-panel">
            <div className="left-btn-div">
              {appendLeft}
            </div>
            <div className={cx(childrenClassName, {"toolbar-right-out": pullDownExclude && this.state.openPullDown})}>
              {children}
            </div>
          </div>
          {pullDown ? (
            <div className={cx("pulldown-panel", {"open": this.state.openPullDown})}>
              <a className="pulldown-handle" title={this.state.openPullDown ? "收起" : "展开"} onClick={e => this.togglePullDown(e)}>
                <Icon type={this.state.openPullDown ? "caret-up" : "caret-down"} />
                {this.state.openPullDown ? "收起" : "展开"}
              </a>
              <div className="pulldown-body">
                {pullDown}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
