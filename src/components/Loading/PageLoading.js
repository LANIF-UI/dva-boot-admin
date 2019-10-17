import React from 'react';
import './PageLoading.less'

/**
 * 加载效果示例
 */
export default class extends React.Component{
  render(){
    const {loading,style = 'style1'} = this.props
    return   loading ? <div className={`loading-spinner loading-spinner-${style}`}></div> : this.props.children || null;
  }
}