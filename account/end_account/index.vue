/*
* @Author slashhunag
* 开户成功页面
*/
<style lang="sass" scoped>
    @import "./end.scss";
</style>
<template>
    <div class='d-container'>
         <div class='s-container'>
            <i class="icon iconfont if-checked"></i>
            <div class='o-success'>开户成功</div>
         </div>
         <list title='开户人:' :detail='holder'></list>
         <list title='安全卡:' :detail='cardName'></list>
         <list title='身份证:' :detail='holderId'></list>
         <div class='next-btn'
                 @click="ToEnd()">
                 完成
        </div>
    </div>
</template>
<script type="text/babel">
    import wx from '../../global/wx/wxsa.js';
    import List from './components/list.vue';
    export default {
        components:{
            'list':List
        },
        data () {
            let rawData={
                    holder:'傻强',
                    cardName:'招商银行',
                    holderId:'43942u19423819'
                };
            return rawData;
        },
        init(){
            document.body.style.background='#fff';
        },
        ready () {
            vueCommon.changeDocumentTitle('结果');
        },
        methods: {
            ToEnd(){
               this.$router.go('/');
            }
        }
    }
</script>