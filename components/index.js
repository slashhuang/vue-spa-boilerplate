/*
* @Author slashhuang
* vue项目*UI*组件配置项
* CSS文件会抽取到common下面
*/
//全局提示框服务,每个vue组件都可以通过this.$noter获取.    ./components/note/index.js
/**
 * 使用方式
 * this.$noter(options);
 */
import VueAlert from 'VueAlert';
let VueNoter = require('VueNoter');
Vue.use(VueAlert);
Vue.use(VueNoter);
