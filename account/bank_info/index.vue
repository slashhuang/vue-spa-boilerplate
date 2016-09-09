/*
* @Author slashhunag
* 填写银行信息
*/
<style lang="sass" scoped>
    @import "./info.scss";
</style>
<template>
    <div class='account-container'>
        <div class='transaction-card'>
            <div class='hint'>
               请选择银行卡类型
            </div>
            <user-input  hint="开户行">
                 <select slot='input'
                    v-bind:class="{'target':!!cardBanker}"
                    v-model="cardBanker">
                    <option  value="" >
                       请选择储蓄卡
                    </option>
                    <option v-for="item in bankList" v-bind:value="item" track-by='$index'>
                        {{item}}储蓄卡
                    </option>
                 </select>
            </user-input>
            <div class='hint'>
               银行预留信息
            </div>
            <user-input
                    hint="姓名">
                <input slot='input'
                    type="text"
                    v-model="cardHolder"
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
            <div class='hint sm'>
               提醒: 后续只能绑定该持卡人的银行卡
            </div>
            <user-input
                hint="手机号">
                <input  slot='input'
                        type="number"
                        v-model="holderTel"
                        placeholder="请输入银行预留手机号"/>
                 <em slot='indicator'
                     class="bank-list"
                     @click="showPhoneQuestion" >
                   <i class="icon iconfont if-help-questions"></i>
                </em>
             </user-input>
        </div>
        <div class='b-protocal'>
                 <i class="icon iconfont if-checked"></i>
                我已阅读并同意
                <span class='high-light'>《用户协议》</span>
        </div>
         <div class='btn-next'
                 :disabled='!cardValid'
                 v-bind:class="{'btn-valid':cardValid}"
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
                    cardBanker:'',//开户行
                    cardHolder:'', //持卡人
                    holderID:'',//身份证号
                    holderTel:'',//电话号
                    bankList:['南京银行'],//银行卡列表
                    showIndicator:false
                };
               return rawData;
        },
        ready () {
            vueCommon.changeDocumentTitle('填写银行卡信息');
        },
        methods: {
            //跳转短信验证页面
            ToVerify(){
                this.$router.go('/smsCheck')
            },
            checker(){

            },
            showPhoneQuestion(){
                //@TODO处理显示协议相关
            },
            note_18(){//未满18周岁
                 this.$noter({
                        headMsg:'您未满18周岁不能开户',
                        bodyMsg:'18周岁以下未成年人不能进行理财开户',
                        hintMsg:'我知道了'
                     })
            },
            noe_bind(){//卡已经绑过
                 this.$noter({
                        headMsg:'系统内部错误(该认证信息已被绑定，一个认证信息只能绑定一次)',
                        hintMsg:'关闭'
                     })
            },
            note_sure(){//确认身份信息
                 this.$noter({
                        bodyMsg:'身份信息确认后不可修改',
                        confirm:'确定',
                        y_cbk:()=>{
                            this.$router.go('/')
                        },
                        cancel:'取消'
                     })
            }
        }
    }
</script>