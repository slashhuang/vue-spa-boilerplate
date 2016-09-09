/*
 * 单页面引用主程序入口
 * created on 9/5
 * @Author slashhuang
 */
//定义vue项目的http请求,路由由global/iwjw/vue_common来处理
//创建路由实例
const router = new VueRouter({
    history:true
});
//获取路由列表
router.map(require('./router/index.js'));
router.redirect({
  // redirect any not-found route to home
  '*': '/password'
})
let app = Vue.extend({});
/* Http[method] = function (url, data, success, options) {*/
Vue.http['get']('/').then((res)=>{
       let cbData = res['data'];
       if(cbData['status']==1){ //成功
          Object.assign(Vue.prototype.$user,cbData['data']);
          router.start(app, '.mod-app');
       }else{
         //处理拿不到用户状态的情况@TODO
       }
});


