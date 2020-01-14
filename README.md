
# About

此项目是 vue + element-ui 构建的后台管理系统，是前台项目管理系统，所有的数据都是从服务器实时获取的真实数据，具有注册、登陆、管理数据、权限验证等功能。


# 说明

>  如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！ ^_^

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

>  传送门：
>  [前端项目地址](https://github.com/manzqy/toutiao_vue.git)
>  [后端网址请戳这里](https://github.com/manzqy/toutiao_vue_backend.git)



## 技术栈

vue2 + vue-router + webpack + ES6/7 + less + element-ui


## 项目运行


```
git clone https://github.com/manzqy/toutiao_vue.git 

cd taotiao_vue  

npm install 或 yarn(推荐)

npm run serve (访问前台系统)


访问: http://localhost:3000(后台端口,代码待更新)

```



### 前端项目网址
[前端网址请戳这里](https://github.com/manzqy/toutiao_vue.git )（请用chrome手机模式预览）
[后端网址请戳这里](https://github.com/manzqy/toutiao_vue_backend.git)

# 功能列表
学习中小体会,展示每个模块完成的流程
- 静态文件准备，`vue create toutiao_vue` 删除多余的文件，下载`vue-router` 创建一些需要的文件夹,引入初始化样式，创建`Login.vue`,配置路由，引入到`main.js`
- 引入 element-ui,调用在main.js,下载axios，单独封装 
- 注册登录api
- 登录页调用element-ui的form表单，绑定数据，添加验证，点击提交按钮，再次使用validate验证，拿到token值保存在本地存储，添加路由守卫，防止用户未登录直接进入其他页面操作
# 部分截图
...






