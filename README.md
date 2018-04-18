# make

> 制成品

## Node

需先安装Node.js
[Node官网下载](https://nodejs.org/zh-cn/)

## Npm

建议安装淘宝镜像提升速度

``` bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

淘宝镜像使用方式

``` bash
cnpm install packagename
```

## Vue

首先全局安装`vue`和`vue-cli`，以便于日后新项目的创建和使用

``` bash
npm install --global vue
npm install --global vue-cli
```

## Build Setup

``` bash
# 安装此项目所需要的依赖
npm install

# 启动本地服务 localhost:8080
npm run dev

# 生产代码第一步： 在文件 build/config/index.js 中关闭 sourcemap
productionSourceMap: false,

# 生产代码第二：生成公用库
npm run build:dll

# 生产代码第三步：生成其余代码
npm run build

# 查看打包后代码大小分析，Gzip前后对比等
npm run build --report
```
