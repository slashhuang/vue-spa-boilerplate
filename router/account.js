


let routerMap={
    '/password':{
         component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../account/password/index.vue')),'password')
        }
    },
    '/smsCheck':{
       component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../account/sms_check/index.vue')),'sms_check')
        }
    }
};
module.exports = routerMap;