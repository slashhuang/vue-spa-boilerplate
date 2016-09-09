let routerMap={
    '/checkstand/:productCode':{
         component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../checkstand/index.vue')),'checkstand')
        }
    }
};
module.exports = routerMap;