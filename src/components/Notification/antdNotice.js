import { notification } from 'antd';
import $$ from 'cmn-utils';
import Notification from './Notification';
import './antdNotice.less';

const prefixCls = 'antui-notification';
const defaultConfig = {
};

function notice(config, type, title) {
  if ($$.isObject(config)) {
    notification[type]({
      className: `${prefixCls} ${prefixCls}-${type}`,
      ...defaultConfig,
      ...config
    });
  } else {
    notification[type]({
      className: `${prefixCls} ${prefixCls}-${type}`,
      message: title,
      description: config,
      ...defaultConfig
    });
  }
}

export default class extends Notification {
  static success(config) {
    notice(config, 'success', '成功');
  }

  static error(config) {
    notice(config, 'error', '出错了');
  }

  static info(config) {
    notice(config, 'info', '提示');
  }

  static warning(config) {
    notice(config, 'warning', '注意');
  }

  static warn(config) {
    notice(config, 'warning', '注意');
  }

  static close(key) {
    notification.close(key);
  }

  static destroy() {
    notification.destroy();
  }
}
