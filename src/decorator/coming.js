import React, { PureComponent } from 'react';
import Coming from '../components/Pages/Coming';

/**
 * 在一个类上增加这个装饰器，表示这个类是一个未完成的功能，
 * 将会展示成一个即装到来的友好页面，可以设置倒计时时间
 * @param {*} options Coming 组件选项
 */
const coming = options => WrappedComponent => {
  return class extends PureComponent {
    render() {
      return (
        <Coming {...options}>
          <WrappedComponent {...this.props} />
        </Coming>
      );
    }
  };
};

export default coming;
