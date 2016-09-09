
let routerMap={
    '/list':{
         component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../licailist/views/index.vue')),'list')
        }
    }
};
module.exports = routerMap;