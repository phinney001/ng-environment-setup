# ng-environment-setup
<!-- Badges section here. -->
[![npm](https://img.shields.io/npm/v/ng-environment-setup.svg)](https://www.npmjs.com/package/ng-environment-setup)
[![npm](https://img.shields.io/npm/dm/ng-environment-setup.svg)](https://www.npmjs.com/package/ng-environment-setup)
[![Build Status](https://travis-ci.org/phinney001/ng-environment-setup.svg?branch=master)](https://travis-ci.org/phinney001/ng-environment-setup)

# 简介
`ng-environment-setup` 用于Angular项目自动化创建，依赖于:
+ [Angular-Cli](https://github.com/angular/angular-cli)
+ [Node](https://nodejs.org/en/)
+ [ng-zorro-antd](https://ng.ant.design/docs/introduce/zh)
+ [ngx-echarts](https://github.com/xieziyu/ngx-echarts)

# 环境
  ```bash
  Angular-Cli (version >= 8.x)
  Node (version >= 10.x)
  ```

# 安装
  ```bash
  npm install ng-environment-setup -g
  ```

# 运行
  ```bash
  nes
  ```
# 生成路由
  + 在项目目录创建.router文件，内容如: 
  ```javascript
  module.exports = [
    {
      id: 1,
      title: '父级路由',
      name: 'moduleName',
      children: [
        {
          id: 101,
          title: '子级路由',
          link: '/moduleName/routeName'
        }
      ]
    }
  ]
  ```
  + 运行命令
  ```bash
  nes router
  ```
