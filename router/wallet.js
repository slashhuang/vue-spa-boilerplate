let routerMap={
    '/wallet':{
      component:(resolve)=>{
        require.ensure([],(require)=>resolve(require('../wallet/index.vue')),'wallet')
      }
    },
    '/more':{
      component:(resolve)=>{
        require.ensure([],(require)=>resolve(require('../wallet/more.vue')),'more')
      }
    },
    '/incomelist': {
      component:(resolve)=>{
        require.ensure([],(require)=>resolve(require('../wallet/incomeList.vue')),'incomeList')
      }
    },
    '/cardManagement': {
      component: (resolve)=>{
        require.ensure([],(require)=>resolve(require('../wallet/cardManagement.vue')),'cardManagement')
      }
    }
}
module.exports = routerMap;