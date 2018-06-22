/**
 * 通知接口，需要子类实现
 */
export default class Notification {
  static success(config) {/* 成功 */}

  static error(config) {/* 失败 */}

  static info(config) {/* 信息 */}

  static warning(config) {/* 警告 */}

  static warn(config) {/* 警告 */}

  static close(key) {/* 关闭 */}

  static destroy() {/* 销毁 */}
}
