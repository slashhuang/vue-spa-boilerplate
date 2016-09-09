/*
* @Author: yuqy
* @Date:   2016-09-06 14:30:51
* @Last Modified by:   yuqy
* @Last Modified time: 2016-09-08 16:04:38
*/

'use strict';
let routerMap={
    '/detail/:productId/:isTransfer':{
        name: 'detail',
        component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../fcbdetail/views/index.vue')),'detail')
        }
    }
};
module.exports = routerMap;