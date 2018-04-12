import PageInfo from './PageInfo';
import config from '@/config';

/**
 * 通用分页助手
 */
export default class　PageHelper {
  static create = () => {
    const pageInfo = new PageInfo();
    return pageInfo;
  }

  /**
   * 可以通过设置这个函数，格式化发送到后端的参数
   * 
   * 例如后端分页接口需要的参数是
   * {
   *    currentPage: 1, 
   *    showCount: 10, 
   *    paramMap: {name: 'jonn'}
   * }
   * 可以通过设置这个参数格式化分页信息
   * 例如：
   * pageHelper.requestFormat(({pageNum, pageSize}) => ({
   *  currentPage: pageNum,
   *  showCount: pageSize
   * }))
  */
  static requestFormat(pageInfo) {
    return config.pageHelper.requestFormat(pageInfo);
  };
   

  /**
   * 格式化从服务端反回的数据，并置入PageInfo对象中，
   * 为下次分页做准备
   * 页码 pageNum;
     每页数量 pageSize;
     当前页的数量 size;
     总记录数 total;
     总页数 totalPages;
     结果集 list;
   * @param {object} resp 
  */
  static responseFormat(resp) {
    return config.pageHelper.responseFormat(resp);
  }
}