# 分页功能
PageHelper只是帮我们拼装分页和查询条件，并不会执行实际的查询

## 如何使用

```js
// 创建pageInfo对像
cosnt pageInfo = PageHelper.create();

// 生成第一页每页十条的查询参数
pageInfo.startPage(); // { pageNum: 1, pageSize: 10 }

// 生成第二页每页二十条的查询参数
pageInfo.startPage(2, 20); // { pageNum: 2, pageSize: 20 }

// 跳转到第三页
pageInfo.jumpPage(3); // { pageNum: 3, .... }

// 跳转到下一页，上一页
pageInfo.nextPage(); // { pageNum: 4, .... }
pageInfo.prevPage(); // { pageNum: 3, .... }

// 跳转到第四页并带着查询条件
pageInfo.filter({ name: 'jonn' }).jumpPage(4); // { pageNum: 4, filters: { name: 'jonn' }, .... }
// 当第二个条件为true时会带着之前的查询条件
pageInfo.filter({ age: '18' }, true) // { pageNum: 4, filters: { name: 'jonn', age: '18' }, .... } 

// 按姓名升序，年龄降序生成
pageInfo.sortBy({name: 'asc', age: 'desc'}); // { sorts: {name: 'asc', age: 'desc'}, .... }

```