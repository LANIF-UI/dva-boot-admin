import React, { PureComponent } from 'react';
import $$ from 'cmn-utils';
import './index.less';
const SHOW_NOTICE = 'SHOW_NOTICE';
const HIDE_NOTICE = 'HIDE_NOTICE';

export function notice(message, type = 'default') {
  $$.trigger(SHOW_NOTICE, {type, message});
  return hide;
}

export function hide() {
  $$.trigger(HIDE_NOTICE);
}

/**
 * 通知条示例
 * 使用cmn-utils提供的自定义的Event可以很方便
 * 的在全局范围内，打开关闭通知条
 */
class Notification extends PureComponent {
  constructor() {
    super();
    $$.on(SHOW_NOTICE, this.showNotice);
    $$.on(HIDE_NOTICE, this.hideNotice);

    this.state = {
      active: false,
      type: 'default',
      message: '',
    }
  }

  componentWillUnmount() {
    $$.off(SHOW_NOTICE, this.showNotice); // 清理监听
    $$.off(HIDE_NOTICE, this.hideNotice); 
  }

  showNotice = ({message, type}) => {
    this.setState({
      active: true,
      message,
      type
    });
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(this.hideNotice, 3000);
  }

  hideNotice = () => {
    this.setState({
      active: false,
    });
  }

  render() {
    const { message, active, type } = this.state;
    return (
      <div className={`la-notification${active ? ' active' : ''}`}>
        <div className={`content ${type}`}>{message}</div>
        <span className="close" onClick={this.hideNotice} />
      </div>
    );
  }
}

Notification.notice = notice;
export default Notification;