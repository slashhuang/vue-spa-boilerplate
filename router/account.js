


let routerMap={
    '/password':{
         component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../account/password/index.vue')),'password')
        }
    },
    '/resetPwd': {
              component: (resolve)=>{
                require.ensure([],(require)=>
                    resolve(require('../account/reset_pwd/index.vue')),'reset_pwd')
          },
    },
    '/account':{
         component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../account/open_account/account.vue')),'account')
        },
        subRoutes: {
          '/bankList': {
              component: (resolve)=>{
                require.ensure([],(require)=>
                    resolve(require('../account/bank_list/bank.vue')),'bank_list')
          }
        }
      }
    },
    '/bankInfo':{
       component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../account/bank_info/index.vue')),'bank_info')
        }
    },
    '/smsCheck':{
       component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../account/sms_check/index.vue')),'sms_check')
        }
    },
    '/doneAccount':{
       component:(resolve)=>{
          require.ensure([],(require)=>resolve(require('../account/end_account/index.vue')),'end_account')
        }
    }

};
module.exports = routerMap;