let routerMap={
    '/rollout/':{
         component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../rollout/index.vue')),'rollout')
        }
    }
};
module.exports = routerMap;