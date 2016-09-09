/*
* @Author slashhunag
* 填写银行信息
*/
<style lang="sass" scoped>
    @import "./reset_pwd.scss";
</style>
<template>
    <div class='re-pwd-container'>
        <div class='pwd-area'>
            <user-input
                    hint="姓名">
                <input slot='input'
                    type="text"
                    v-model="holderName"
                    placeholder="请输入持卡人姓名"/>
            </user-input>
            <div class='sep'><em></em></div>
            <user-input
                    hint="身份证">
                    <input slot='input'
                        type="number"
                        v-model="holderID"
                        placeholder="请输入身份证号"/>
            </user-input>
        </div>
         <div class='btn-next'
                 v-bind:class="{'btn-valid':verifyChecker()}"
                 @click="ToVerify()">
                 下一步
        </div>
    </div>
</template>
<script type="text/babel">
    import wx from '../../global/wx/wxsa.js';
    import Child from 'C_Input';
    export default {
        components: {
             'user-input': Child
        },
        data () {
            let rawData={
                    holderName:'',//持卡人
                    holderID:'',//身份证号
                    holderID_valid:false,//校验
                    holderName_valid:false//校验
                };
            return rawData;
        },
        watch:{
            holderID:function(val,oldVal) {
                let regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                if(regIdCard.test(val)){
                    this.holderID_valid=true;
                }else{
                    this.holderID_valid=false;
                }
            },
            holderName:function(val,oldVal) {
                let emptyReg = /^[\s]*$/;
               if(emptyReg.test(val)){
                    this.holderName_valid=true;
               }else{
                    this.holderName_valid=true;
               }
            }

        },
        ready () {
            vueCommon.changeDocumentTitle('重置交易密码');
        },
        methods: {
            //跳转短信验证页面
            ToVerify(){
                if(this.verifyChecker()){
                    this.$router.go('/smsCheck')
                  }
            },
            verifyChecker(){
                return this.holderName_valid&&this.holderID_valid;
            }
        }
    }
</script>