# modelEnhance
这个是对dva model的一个封装，可以让我们简化model里的写法。

## `@request`类型

```js
dispatch({
  type: 'crud/@request',
  payload: {
    valueField: 'name',
    url: '/crud/getName',
  }
});
```