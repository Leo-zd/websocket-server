# 项目名称

一个基于Node.js的Web应用

## 项目简介

这是一个使用Node.js开发的后台管理系统，主要功能包括：
- websocket的后台管理
- 群发消息
- 监控在线人数

## 技术栈

- 后端：Node.js + Express
- 前端：HTML + CSS + JavaScript

## 安装指南

1. 克隆本仓库
2. 运行 `npm install` 安装依赖

## 运行项目

运行 `node server.js` 启动开发服务器

## 项目结构

- `server.js` - 主程序入口
- `public/` - 静态文件和前端代码
  - `admin.html` - 管理后台页面
- `package.json` - 项目依赖和脚本配置

## 开发指南

1. 确保已安装Node.js v16+
2. 安装依赖：`npm install`
3. 开发模式运行：`node server.js`
4. 访问 http://localhost:3001/admin 查看管理后台
5. 连接websocket ws://localhost:3000 ws连接
