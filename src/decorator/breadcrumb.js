import React, { Component } from 'react';

/**
 * 在一个类上增加这个装饰器，可以改变页面的面包屑
 * @param {*} options
 */
const breadcrumb = options => WrappedComponent => {
  return WrappedComponent;
};

export default breadcrumb;
