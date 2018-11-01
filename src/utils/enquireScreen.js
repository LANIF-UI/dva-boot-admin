import enquireJS from 'enquire.js';

const mobileQuery = 'only screen and (max-width: 767.99px)';
const tabletQuery =
  'only screen and (min-width: 768px) and (max-width: 1024px)';
const desktopQuery = 'only screen and (min-width: 1025px)';

// 是否是匹配移动窗口大小
export function enquireIsMobile(cb, handlers) {
  return enquireScreen(mobileQuery, cb, handlers);
}

// 是否是匹配Pad窗口大小
export function enquireIsTablet(cb, handlers) {
  return enquireScreen(tabletQuery, cb, handlers);
}

// 是否是匹配桌面窗口大小
export function enquireIsDesktop(cb, handlers) {
  return enquireScreen(desktopQuery, cb, handlers);
}

/**
 * enquire.js封装
 * @param {*} query media query
 * @param {*} cb callback function
 * @param {*} handlers enquire.js handlers
 * @return 返回 unregister 函数
 */
export function enquireScreen(query, cb, handlers) {
  const handler = handlers || {
    match: () => {
      cb && cb(true);
    },
    unmatch: () => {
      cb && cb(false);
    }
  };
  enquireJS.register(query, handler);
  return _ => enquireJS.unregister(query);
}

export default enquireJS;
