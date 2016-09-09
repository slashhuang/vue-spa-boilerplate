<template>
    <div class="input-pannel">
        <p>转入金额</p>
        <div class='input-wrap'>
            <label>
                <span>￥</span>
                <input type="text" placeholder="每日最多可转出 5 次">
            </label>
        </div>
        <p class="out-money">钱包可用余额 <b>{{10000.01}}</b> 元</p>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                //productCode:''
            }
        },
        props:{
            data:{

            },
            initData:{
                prarentFlag:'',
                labelTxt:'',
                placeholder:'',
            },
            
        },
        computed:{

        },
        components:{

        },
        ready(){
            const self = this;
            //self.productCode = self.$router.params.productCode;
        },
        method:{
            
        }
    }
</script>
<style lang="sass" rel="stylesheet/scss" type="text/css" scoped>
    @import "~iwpath/view.scss";
</style>
