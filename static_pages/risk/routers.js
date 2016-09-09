/* 
 * @Author: zhuxinyong
 * @Date:   16/5/26
 * @Email:  zhuxinyong.sh@superjia.com
 * @Last Modified by:   zhuxinyong
 * @Last Modified time: 16/5/26
 */
module.exports = function (router) {
    router.map({
        '/':{
            name:'index',
            component:require('./views/index.vue')
        },
        '/list':{
            name:'list',
            component:require('./views/list.vue')
        }
    })
}