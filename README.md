<div align="center">
一个 高拓展性的前端日志采集模块！
</div>

## 📦 安装

```bash
$ npm install --save hui-weblog
# or
$ yarn add hui-weblog
# or
$ pnpm add hui-weblog
```

## 🔨 用法

基本用法：

初始化完成后sdk默认会帮你采集进入退出，用户点击等日志，并帮你上传到初始化配置的url中！

```ts
import logger from "hui-weblog"

// 初始化
const Logger = logger.init({
    url: "/api/logger",
})


// 注册自定义的采集器
import Router from "next/router";

// 注册自定义日志采集器collector
Logger.register({
  target: Router.events.on,
  type: "routeChangeComplete",
  listener: (e)=>{
    return {
      url:  decodeURIComponent(e)
    }
  }
})
```
