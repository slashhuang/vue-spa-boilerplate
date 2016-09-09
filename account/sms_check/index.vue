/*
* @Author slashhunag
* 填写卡号
*/
<style lang="sass" scoped>
    @import "./check.scss";
</style>
<template>
    <div class='sms-container'>
        <div class='sms-info'>
            <div class='hint'>
                绑定银行卡需要短信确认，验证码已发送至以下手机
            </div>
            <div class='tel'>
                {{renderTel(telephone)}}
            </div>
            <div class="tel-input">
                <input type="tel"
                    placeholder="填写短信验证码"
                    v-model="codeNumer"/>
                <em class="sms-code-btn"
                    @click="couter<=0&&sendCode()"
                    v-bind:class={'finished':counter<=0}>
                  {{renderCountDown()}}
                </em>
            </div>
        </div>
         <div class='next-btn'
                 v-bind:class="{'btn-valid':codeValid}"
                 @click="ToEnd()">
                 下一步
        </div>
    </div>
</template>
<script type="text/babel">
    import wx from '../../global/wx/wxsa.js';
    export default {
        data () {
            let rawData={
                    counter:30,//默认倒计时30秒
                    telephone:15005162976, //卡号初始化
                    codeNumer:'',//验证码
                    codeValid:false//验证码是否ok
                };
            return rawData;
        },
        ready () {
            vueCommon.changeDocumentTitle('验证手机号');
            this.countDown();
        },
        watch:{
            codeNumer:function(val,oldVal) {
                let reg = /^[\d]*$/g;
                //默认6位验证码
                if(reg.test(val)&& val.length==6){
                    this.codeValid=true
                }else{
                    this.codeValid=false
                }
            }
        },
        methods: {
            //跳转具体信息填写页面
            ToEnd(){
               this.codeValid&&this.$router.go('/doneAccount');
            },
            renderTel(tel){
                let tel3= (tel+'').slice(0,3);
                let tel4= (tel+'').slice(7,11);
                return tel3+'****'+tel4;
            },
            renderCountDown(){
                if(this.counter<=0){
                    return `重新获取`
                }else{
                    return `重新获取(${this.counter}s)`
                }
            },
            countDown(){
                let timer = setInterval(()=>{
                    this.counter = --this.counter
                },1000)
                if(this.counter<=0){
                    clearInterval(timer);
                }
            }
        }
    }
</script>