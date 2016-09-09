let routerMap={
    '/rollin/':{
         component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../rollin/index.vue')),'rollin')
        }
    }
};
module.exports = routerMap;