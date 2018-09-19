import $$ from 'cmn-utils';
import PageHelper from './index';
/**
 * 分页对象
 */
export default class PageInfo {
  // 页码，从1开始
  pageNum = 1;

  // 每页数量
  pageSize = 10;

  // 当前页的数量
  size = 0;

  // 总记录数
  total = 0;

  // 总页数
  totalPages = 0;

  // 结果集
  list = [];

  // 过滤条件 {name: 'jonn'}
  filters = {};

  // 排序条件 {name: 'asc', age: 'desc'}
  sorts = {};

  /**
   * 希望用户输入的页数不在合法范围（第一页到最后一页之外）
   * 时能够正确的响应到正确的结果页面，那么你可以配置reasonable为true，
   * 这时如果pageNum<1,会查询第一页，如果pageNum>总页数,会查询最后一页
   */
  reasonable = false;

  /**
   * 组装分页信息
   * @param {number} pageNum page number, default 1
   * @param {number} pageSize page size, default 10
   */
  startPage(pageNum = 1, pageSize = 10) {
    this.pageNum = pageNum;
    this.pageSize = pageSize;
    this.size = 0;
    this.total = 0;
    this.totalPages = 0;
    this.list = [];
    this.filters = {};
    this.sorts = {};
    return this;
  }

  /**
   * 组装分页信息
   * @param {number} pageNum page number
   * @param {number} pageSize page size
   */
  jumpPage(pageNum, pageSize) {
    if ((pageNum && pageNum <= Math.ceil(this.totalPages)) || pageNum === 1) {
      this.pageNum = pageNum;
      if (pageSize) this.pageSize = pageSize;
    }
    return this;
  }

  /**
   * 拼接过滤条件
   * @param {object} q 过滤条件 {name: 'jonn', sex: 1}
   * @param {boolean} merge 是否将新条件与现有条件合并
   */
  filter(q, merge) {
    if ($$.isObject(q)) {
      if (merge) {
        this.filters = {...this.filters, ...q};
      } else {
        this.filters = q;
      }
    }
    return this;
  }

  /**
   * 拼接排序条件
   * @param {object} q 排序字段 {name: 'asc', age: 'desc'}
   */
  sortBy(q) {
    if ($$.isObject(q)) {
      this.sorts = q;
    }
    return this;
  }

  /**
   * 下一页或指定页数
   * @param {number} pageNum 
   */
  nextPage(pageNum) {
    if (this.totalPages !== -1) {
      if (pageNum && pageNum <= Math.ceil(this.totalPages)) {
        this.pageNum = pageNum;
      } else if (this.pageNum + 1 <= Math.ceil(this.totalPages)) {
        this.pageNum ++;
      }
    } else {
      this.pageNum = this.totalPages;
    }
    return this;
  }

  /**
   * 上一页
   */
  prevPage() {
    if (this.totalPages !== -1) {
      if (this.pageNum - 1 > 0) {
        this.pageNum --;
      }
    } else {
      this.pageNum = 1;
    }
    return this;
  }

  // deprecate
  send(url, options) {
    const self = this;
    const { pageNum, pageSize, filters, sorts } = this;
    let data = { pageNum, pageSize, filters, sorts };

    if ($$.isFunction(PageHelper.requestFormat)) {
      data = PageHelper.requestFormat(this);
    }
    return $$.send(url, { data, ...options }).then(resp => {
      if ($$.isFunction(PageHelper.responseFormat)) {
        const newPageInfo = PageHelper.responseFormat(resp);
        return Object.assign(self, newPageInfo);
      }
    })
  }
} 