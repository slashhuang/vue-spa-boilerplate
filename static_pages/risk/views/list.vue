<template>
    <div class="mod-finance risk">
        <div class="risk-act">
            <div class="risk-block">
                <div class="risk-record record"><p class="risk-text">赔付记录</p><span id="record">{{paidTotalNum}}</span>个
                </div>
                <div class="risk-record record"><p class="risk-text">获赔人数</p>共<span
                        id="person">{{paidUserTotalNum}}</span>人
                </div>
                <div class="risk-record"><p class="risk-text">赔付总计(元)</p><span id="money">{{paidTotalAmount}}</span>
                </div>
            </div>
        </div>

        <div class="risk-list">
            <div id="riskList">
                <div class="border-text" v-for="item in paidList">
                    <span class="risk-deta">{{item.paidTime}}</span>
                    <p class="text-right">
                        <span class="risk-person">{{item.paidUserNum}}人</span>
                        <span class="risk-num">共</span>
                        <span>{{item.paidAmount}}</span>元</p>
                    <p class="risk-text">{{item.productName}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="sass" rel="stylesheet/scss" type="text/css" scoped>
    @import "~iwpath/view.scss";
    @import "list.scss";
</style>
<script type="text/babel">
    import Api from '../api.js';

    export default{
        data(){
            return {
                paidList: [],
                paidTotalNum: '',
                paidUserTotalNum: '',
                paidTotalAmount: ''
            }
        },
        ready(){
            const self = this;
            wx.onReady({
                title: '1000万本金风险准备金，投资更安心！'
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
                    url: Api.getUrl('list'),
                    success: function (d) {
                        //返回代码 0-正常 其他参考对应的errorCode定义
                        if (d.status == 1 && d.data && d.data.fund) {


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
