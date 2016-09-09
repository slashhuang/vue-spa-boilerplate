/*
 * 单页面引用主程序入口
 * created on 9/5
 * @Author slashhuang
 */
//创建路由实例及http服务

Vue.use(VueRouter);
Vue.use(VueResource);
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
/* 初始化请求*/
Vue.http['get']('/').then((res)=>{
   router.start(app, '.mod-app');
});


