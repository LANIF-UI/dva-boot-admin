# FAQs

## 如何配代理 proxy

当请求后端接口时，我们使用反向代理方式，在`package.json`中进行设置，更多设置看[create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development)
```json
"proxy": {
  "/api": {
    "target": "http://192.168.202.12:8391",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
},

// 例 fetch('/api/user/getDetail') -> 'http://192.168.202.12:8391/user/getDetail'

// 可配置多个, 注意顺序，最大范围的要放到最下面，
"proxy": {
  "/api/v1": {
    "target": "http://192.168.202.11",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  },
  "/api/v2": {
    "target": "http://192.168.202.12",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  },
  "/api": {
    "target": "http://192.168.202.13",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
},
```

## 发布路径

build项目的时候注意在`config-overrides.js`中配置正确的`publicPath`,例如放到`demo`文件夹下为
```js
config.output.publicPath = '/demo/'; // 跟据实际项目设置
```
若发布到服务器的跟目录下为
```js
config.output.publicPath = '/'; // 跟据实际项目设置
```
配置错则有可能加载不到相关资源
