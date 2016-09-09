
let routerMap={
    '/login':{
        component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../login/login.vue')),'login')
        }
    }
}
module.exports = routerMap;