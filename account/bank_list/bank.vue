/*
* @Author slashhunag
* 支持银行
*/
<style lang="sass" scoped>
    @import "./bank.scss"
</style>
<template>
    <div class='bank-container'>
        <div class='bank-list'
             v-for="item in bankList" track-by='$index'>
             <img class='bank-logo' v-bind:src='item.img'/>
             <div class='bank-name'>
                <div>{{item.name}}</div>
                <div class='restrict'>{{item.restriction}}</div>
             </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import wx from '../../global/wx/wxsa.js';
    export default {
        data () {
            /*初始化数据*/
            return this.initSet();
        },
        ready () {
            vueCommon.changeDocumentTitle('支持银行');
        },
        methods: {
            initSet(){
                let bankMap = {
                    "bank": ["gongshang", "nongye", "zhongguo","jianshe","zhaoshang","xingye","guangda","guangfa","pingan","huaxia","minsheng","zhongxin","youchu","jiaotong"],
                    "credit": ["gongshang", "nongye", "zhongguo","jianshe","zhaoshang","pufa", "xingye", "guangda","guangfa","pingan","huaxia","minsheng","zhongxin","shanghai","youchu","jiaotong","shanghainongshang","ningbo","dalian","jiangsu","beijing","hangzhou","nanjing","eerduosi"]
                };
                let nameMap = {
                    gongshang: "工商银行",
                    nongye: "农业银行",
                    zhongguo: "中国银行",
                    jianshe:"建设银行",
                    zhaoshang:"招商银行",
                    pufa:"浦发银行",
                    xingye:"兴业银行",
                    guangda:"光大银行",
                    guangfa:"广发银行",
                    pingan:"平安银行",
                    huaxia:"华夏银行",
                    minsheng:"民生银行",
                    zhongxin:"中信银行",
                    shanghai:"上海银行",
                    eerduosi:"鄂尔多斯银行",
                    shenfa:"深发银行",
                    youchu:"邮储银行",
                    shanghainongshang:"上海农商行",
                    jiangsu:"江苏银行",
                    dalian:"大连银行",
                    ningbo:"宁波银行",
                    beijing:"北京银行",
                    jiaotong:"交通银行",
                    hangzhou:"杭州银行",
                    nanjing:"南京银行"
                };
                var bankData = _.map(bankMap.bank, function(item) {
                    return {
                        img: require('./img/bankList/' + item + '.png'),
                        name : nameMap[item],
                        restriction: '单笔5000元 单日2万元'
                    }
                });
                return {bankList:bankData};
            }
        }
    }
</script>