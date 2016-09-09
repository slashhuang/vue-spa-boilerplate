/**
 * @Author slashhuang
 * Vue Plugin Install.
 * 注册全局的用户数据管理
 */

function userPlugin(Vue) {
    let defaultUser = {
          "bizCode": 0,//0 业务异常
          "message": "",
          "serialVersionUID": "711246174729792158L",
          "isOpenAccount": "0",// 判断是否是否开户 0:否，1:已开户，2：开户中
          "isSetPayPwd": "0",// 判断是否设置支付密码 0:否，1:是
          "isRealNameVerify": "0",// 是否通过实名认证 0:否，1:是
          "isBinDebitCard": "0",// 是否已绑定借记卡 0:否，1:是
          "hasSafeCard": "0",// 是否已绑定安全卡  0:否，1:是
          "name": "用户名",//用户名
          "idCardNo": "",//身份证号码
          "bankcardTailNo": "银行卡尾号",
          "bankName": "银行名称",
          "cardType": 0,//卡类型【1：储蓄卡 、2：信用卡 、3：存折 、4：其它 】
          "isAdult": "1" //判断是否成年 0  否  1是
    };
    Object.defineProperties(Vue.prototype, {
        $user: {
            get() {
                return defaultUser;
            },
            set(val){
                defaultUser=val;
            }
        }
    });
    Vue.prototype.$extend_user=(obj)=>{
       return Object.assign(defaultUser,obj);
    }
}

export default userPlugin;