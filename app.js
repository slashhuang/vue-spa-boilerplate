/*
 * 微信爱理财主程序入口
 * created on 9/5
 */
//定义vue项目的http请求,路由由global/iwjw/vue_common来处理
//创建路由实例
const router = new VueRouter({
    history:true
});
//全局注册用户信息，每个vue组件都可以通过this.$user获取  ./components/user.js
/**
 * 使用方式
 * set==>this.$user={};
 * extend==>this.$extend_user=(obj);  <===左边的会 return this.$user
 * get==>this.$user
 */
let VueUser = require('VueUser');
Vue.use(VueUser);
//获取路由列表
router.map(require('./router/index.js'));
router.redirect({
  // redirect any not-found route to home
  '*': '/list'
})
//router要一个空东西
let app = Vue.extend({});
/* Http[method] = function (url, data, success, options) {*/
Vue.http['get']('/account/getOpenAccountInfo.action').then((res)=>{
       let cbData = res['data'];
       if(cbData['status']==1){ //成功
          Object.assign(Vue.prototype.$user,cbData['data']);
          router.start(app, '.mod-app');
       }else{
         //处理拿不到用户状态的情况@TODO
       }
});


