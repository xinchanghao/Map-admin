## Map-Admin 简介

## 前序准备

你的本地环境需要安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、 [element-ui](https://github.com/ElemeFE/element) 和 [vue2-all](https://github.com/liuweijw/Vue2-All)

## 数据接口准备

本地仅提供了采用 mock 数据进行本地调试，但是给出了同服务端接口开发的示例!!!

注：去掉 mock 很容易，注释 main.js 中的 import './mock' 并删除 mock 文件夹即可

## 开发

```bash
# 克隆项目
git clone https://github.com/liuweijw/Vue2-Admin.git

# 安装依赖
npm install
   
# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:sit

# 构建生成环境
npm run build:prod
```

## 其它

```bash
# --report to build with bundle size analytics
npm run build:prod --report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```
