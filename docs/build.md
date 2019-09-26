# Build 打包部署

> `yarn run build` or `npm run build`

v1.2.0以后，基于最新 react-script v2 的打包部署

## 打包体积过大 & 禁用SourceMap

在`.env`文件里加入：
```js
GENERATE_SOURCEMAP=false
```

## 发布路径

设置`package.json`中的`homepage`的值,如把项目发部到服务器的`dva-boot-admin`文件夹下为：
```json
"homepage": "/dva-boot-admin"
```
若发布到服务器的跟目录下为
```json
"homepage": "/"
```
使用相对路径
```json
"homepage": "."
```
配置错则有可能加载不到相关资源

## 使用`browser history`，`nginx`的额外设置

当使用browser history时，需要在`nginx.conf`下设置所有页面都指向index.html
```bash
server {
  // ...
  location / {
    index  index.html;
    # 如果部署到/dva-boot-admin目录下
    # try_files $uri $uri/ /dva-boot-admin/index.html;
    # 如果部署到根目录
    try_files $uri $uri/ /index.html;
  }
  // ...
}
```

## 如何配反向代理 nginx （生产环境下）

1. 打开nginx配置文件`nginx.conf`，在`server`下增加（按自已项目设置）：
```js
location /api/v1/ {
  proxy_pass http://192.168.202.11/v1/;
}

location /api/v2/ {
  proxy_pass http://192.168.202.12/v2/;
}

location /api/ {
  proxy_pass http://192.168.202.13/;
}
```
更多配置自行查找...

2. 重启nginx