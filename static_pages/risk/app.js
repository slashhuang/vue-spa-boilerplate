/* 
 * @Author: zhuxinyong
 * @Date:   16/5/26
 * @Email:  zhuxinyong.sh@superjia.com
 * @Last Modified by:   zhuxinyong
 * @Last Modified time: 16/5/26
 */

// 路由器需要一个根组件。
var App = Vue.extend({});

Vue.use(VueRouter);

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter({
    hashbang:false
});

require('./routers')(router);

router.start(App,'.mod-risk');