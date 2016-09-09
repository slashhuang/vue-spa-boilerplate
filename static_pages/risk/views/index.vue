<template>
        <div class="risk-act">
            <div class="top-desc">
                <p class="p-text">本金风险准备金</p>
                <p class="p-money"><span class="sp-num">{{fund}}</span>元</p>
            </div>
            <div class="desc">
                <i class="iconfont risk-icon if-bulb"></i>
                <div class="right-desc">
                    <p class="p-desc">您在爱理财平台的所购买的房产宝产品均适用于《本金风险准备金计划》，一旦借款项目出现违约，该计划将自动发挥作用：</p>
                    <p class="p-desc1">1.平台根据约定向投资人支付违约借款本金，并由满懿金服（北京）投资管理有限公司接收对应的逾期债权；</p>
                    <p class="p-desc1">2.平台的风险准备金将用于支付投资人本金。最大限度降低投资人投资风险。</p>
                </div>

            </div>

            <div class="pay-list">
                <span>赔付记录</span>
                <span class="right-text">暂无</span>
                <span class="right-text1" style="display:none">
                    <a href="./risklist">
                        <span class="note-num">0</span>个<i class="iconfont risk-icon-a">&#xd628;</i>
                    </a>
                </span>
            </div>

        </div>

        <div class="risk-form">
            <h2 class="form-h2">本金风险准备金的构成</h2>
            <p class="form-p">平台每笔借款项目成交时，会提取0.1%的金额放入“本金风险准备金”。它全部来源于爱理财与借款人签订的居间借款协议中的服务费。</p>
        </div>

</template>
<style lang="sass" rel="stylesheet/scss" type="text/css" scoped>
    @import "~iwpath/view.scss";
    @import "index.scss";
</style>
<script type="text/babel">
    import Api from '../api.js';
    import wx from 'weixin';

    export default{
        data(){
            return {
                fund: null
            }
        },
        ready(){
            const self = this;
//          vueCommon.changeDocumentTitle('爱理财 | 不动产理财');
            wx.onReady({
                title: '1000万本金风险准备金，投资更安心！',
                link:location.href
            });
            //数据加载入口
            self.loadData();
        },
        methods: {
            loadData(){
                const self = this;
                iwjw.mAjax({
                    dataType: 'json',
                    type: 'get',
                    url: Api.getUrl('fund'),
                    success: function (d) {
                        //返回代码 0-正常 其他参考对应的errorCode定义
                        if (d.status == 1 && d.data && d.data.fund) {
                            self.fund = d.data.fund
                        }
                    },
                    error: function () {

                    },
                    complete: function () {

                    }
                });

            }
        }
    }
</script>