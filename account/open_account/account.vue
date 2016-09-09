/*
* @Author slashhunag
* 填写卡号
*/
<style lang="sass" scoped>
    @import "./account.scss";
</style>
<template>
    <div class='account-container'>
        <div class='transaction-card'>
            <div class='hint'>
                请绑定账户本人的卡，作为
                <span class='high-light'>爱理财安全卡</span>
            </div>
            <div class="card-input">
                <i>卡号</i>
                <label>
                    <input type="tel"
                    placeholder="仅支持储蓄卡"
                    v-model="cardNumber"
                    @focus="hasFocus=true"
                    @blur="hasFocus=false"/>
                    <span  v-bind:class="{'target': hasFocus}">
                        {{transCard(cardNumber)}}
                    </span>
                </label>
                <em class="bank-list"
                    @click="showBankList" >
                   <i class="icon iconfont if-help-questions"></i>
                </em>
            </div>
            <div class='show-btn'
                 :disabled='!cardValid'
                 v-bind:class="{'btn-valid':cardValid}"
                 @click="ToDetail()">
                 下一步
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script type="text/babel">
    import wx from '../../global/wx/wxsa.js';
    export default {
        data () {
            return this.initSet();
        },
        ready () {
            vueCommon.changeDocumentTitle('开户');
        },
        init(){

        },
        watch:{
            cardNumber:function(val,oldVal){
                    let m_val= val.replace(/[^\d]/g,'');
                    if(m_val.length>16){
                        m_val=m_val.slice(0,16);
                    };
                    this.cardValid= m_val.length==16;//16位就放行
                    this.$nextTick(()=>{
                         this.cardNumber=m_val;
                     });
                }
        },
        methods: {
            //跳转具体信息填写页面
            ToDetail(){


               this.$router.go('/bankInfo');
                //@AJAX校验数据
            },
            //显示银行信息 @TODO 后端给到前端对应的接口即可
            showBankList(){
                this.$router.go('/account/bankList');
            },
            initSet(){
                let rawData={
                    cardNumber:'', //卡号初始化
                    cardValid:false,//卡号是否ok
                    hasFocus:false,
                };
               return rawData;
            },
            transCard(num){ //分割银行卡号
                let num_arr = [...(num+'')];
                let transCard =   num_arr.map((n,index)=>{
                    if(index%4==3){
                        return n+' ';
                    }else{
                        return n
                    }
                }).join('');
                return transCard;
            }

        }
    }
</script>