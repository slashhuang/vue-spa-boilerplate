/*
* @Author slashhunag
* 设置密码相关
*/
<style lang="sass" scoped>
    @import "./account.scss";
</style>
<template>
    <div class='account-container'>
        <div class='transaction-pwd' v-show='showInitPwd'>
            <div class='hint'>
                为了您的账户安全,请设置交易密码
            </div>
            <label class="sixDigitPassword" :class={'show-pwd':isShowPwd}>
                <i class="fake-input"
                    v-bind:class="{'target':($index==password.length && hasFocus)}"
                    v-for="item in pwdInput" track-by='$index' >
                    <b class="black-dot" v-show="password[$index]"></b>
                    <span class='pwd-area'>{{password[$index]}}</span>
                </i>
                <input type="tel" v-model="password"
                       id='pwd-node'
                        @focus="hasFocus=true"
                        @blur="hasFocus=false"/>
            </label>
            <div class="show-pwd">
                <div class='show-btn'  @click="showPwd('isShowPwd')">显示密码</div>
            </div>
        </div>
    </div>
     <div class='account-container rechecker' v-show='!showInitPwd&&!C_hasPwd'>
        <div class='transaction-pwd'>
            <div class='hint'>
                请再次输入交易密码
            </div>
            <label class="sixDigitPassword" :class={'show-pwd':reIsShowPwd}>
                <i class="fake-input"
                    v-bind:class="{'target':($index==rePassword.length && reHasFocus)}"
                    v-for="item in rePwdInput" track-by='$index' >
                    <b class="black-dot" v-show="rePwdInput[$index]"></b>
                    <span class='pwd-area'>{{rePwdInput[$index]}}</span>
                </i>
                <input type="tel" v-model="rePassword"
                        v-el: "re-pwd-node"
                          id='re-pwd-node'
                        @focus="reHasFocus=true"
                        @blur="reHasFocus=false"/>
            </label>
            <div class="show-pwd">
                <span class='validator-msg'
                      v-show='validatorMsg'>{{validatorMsg}}</span>
                <div class='show-btn'  @click="showPwd('reIsShowPwd')">显示密码</div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import wx from '../../global/wx/wxsa.js';
    export default {
        data () {
            return this.initSet();
        },
        init () {
            vueCommon.changeDocumentTitle('设置交易密码');
        },
        ready(){
        },
        methods: {
            showPwd(val){
                this[val] =true;
            },
            initSet(){
                let _const={errorTime:0};//只能出错5次
                debugger;
                let firstInput = {
                    pwdInput: new Array(6),  //密码转换 w6元数组
                    password:'',  //密码区域
                    hasFocus:false,  //是否光标进入
                    isShowPwd:false,  //是否显示密码
                 };
                if(this.$user.isSetPayPwd=='1'){//是
                     let initState={
                            showInitPwd:true,
                            C_hasPwd:true,//是否已设置过密码
                        };
                    return Object.assign(_const,initState,firstInput)
                }else{//
                    let initState={ //是否初始化密码
                        showInitPwd:true,
                        C_hasPwd:false,//初始化
                    };
                    let secondInput={
                        rePwdInput:new Array(6),  //密码转换 w6元数组
                        rePassword:'',  //密码区域
                        reHasFocus:false,   //是否光标进入
                        reIsShowPwd:false, //是否显示密码
                        validatorMsg:'' //验证出错信息
                    };
                    return Object.assign(initState,firstInput,secondInput)
                }
            },
            transMode(type){  //定义页面切换
                let pwdNode = document.getElementById('pwd-node');
                let rePwdNode = document.getElementById('re-pwd-node');
                if(type=='1st-2nd'){
                    this.isShowPwd=false,  //关闭密码显示
                    this.reHasFocus=true;   //重复密码自动光标进入
                    this.$nextTick(()=>{
                        pwdNode.blur();
                        rePwdNode.focus();
                     });
                }else if(type=='2nd-1st'){
                    this.hasFocus=true;
                    this.$nextTick(()=>{
                        pwdNode.focus();
                        rePwdNode.blur();
                     });
                }
            },
            C_hasPwd_jump(){ //已有密码下,输完就往后台抛
                let formData = {
                   //@TODO
                };
                let {errorTime}=this;
                let _condition = errorTime!=5;
                this.$http.get('/account/setPayPwd.action',formData).then((res)=>{
                   let data = res['data'];
                   let {bizCode,status} =data;
                   if(bizCode==0 || status!=1){//服务异常或者出错
                     this.$noter({
                        headMsg:'交易密码错误',
                        bodyMsg: _condition?
                                    `交易密码错误,您还可以输入${5-errorTime}次`:
                                    '交易密码错误5次,请于1小时候后重试',
                        hintMsg:_condition?'':'确定',
                        buttons:_condition?{
                            cancel:'忘记密码',
                            n_cbk:()=>{   //@TODO 忘记密码
                                this.$router.go('/resetPwd');
                            },
                            confirm:'重新输入',
                            y_cbk:()=>{
                                //回归初始值
                                errorTime++;
                                Object.assign(this,this.initSet(),{errorTime:errorTime});
                            }
                        }:null
                     })
                   }
                })
            },
            C_noPwd_jump(){ //没有密码下的跳转
                let formData = {
                    "paypwd": "",//支付密码,rsa
                    "token": "",
                    "timestamp":Date.now()
                };
                this.$http.post('/account/setPayPwd.action',formData).then((res)=>{
                    alert('fuck')
                })
            }
        },
        watch: {
            password: function(val, oldValue){
                let reg = /^[\d]*$/;
                let isN = reg.test(val);
                if(!isN){
                    this.$nextTick(()=>{
                         this.password='';
                     });
                }else{
                    let newPwdArr = [...val+''];
                    if(newPwdArr.length<=6){
                        let _empty = new Array(6-newPwdArr.length);
                        this.pwdInput = [...newPwdArr,..._empty];
                    }
                    if(newPwdArr.length>=6){
                        if(this.C_hasPwd){ //有密码则跳后端验证
                            this.C_hasPwd_jump();
                        }else{
                            setTimeout(()=>{
                                this.showInitPwd=false;
                                this.$nextTick(()=>this.transMode('1st-2nd'))
                            },0)
                        };
                    }
                }
            },
            rePassword:function (val,oldValue) {
                let reg = /^[\d]*$/;
                let isN = reg.test(val);
                if(!isN){
                    this.$nextTick(()=>{
                         this.rePassword='';
                     });
                }else{
                    let newPwdArr = [...val+''];
                    if(newPwdArr.length<=6){
                        let _empty = new Array(6-newPwdArr.length);
                        this.rePwdInput = [...newPwdArr,..._empty];
                    }
                    if(newPwdArr.length==6){ //输入ok后，判断密码是否一致
                        if(val != this.password){
                            this.validatorMsg='两次输入密码不一致';
                            setTimeout(()=>{
                                Object.assign(this,this.initSet());
                                this.$nextTick(()=>this.transMode('2nd-1st'))
                            },800);
                        }else{
                           this.$router.go('/account')
                        }
                    }
                }
            }
        }
    }
</script>