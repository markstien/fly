# Fly 

Fly is a web server.

## 作业要求
1.实现最基本的web服务器，客户端能够使用GET、POST方法请求资源

2．服务器将客户请求的资源以html页面的形似呈现，并能够进行差错处理（如：客户请求的资源不存在时，服务器能够返回一个404的页面）  

3.服务器能进行简单的cgi运行。比如当客户在表单中输入数据后，服务器能够将运行结果返回个客户

4.能够通过页面对数据库进行操作，如增删查改等操作。

## 模块架构

### Fly类

创建并监听端口

### requestParser函数

解析http协议,具体实现POST,GET,PUT.....等

### Router  

实现路由功能，用于编写接口

## 已实现功能

### GET

### POST 

- [x] application/x-www-form-urlencoded
- [x] application/json
- [ ] multipart/form-data

### 静态文件服务

### 多语言CGI

