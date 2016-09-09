/* 
 * @Author: yuqy
 * @Date:   2016-01-14 14:13:44
 * @Last Modified by:   guwenmei
 * @Last Modified time: 2016-04-20 18:37:51
 */

'use strict';
require('./supportcards.scss');
var bankListTpl = require('./bank_list.html');
var supportcards = {

    api: function(key) {
        var rootPath = '';
        if(!global.browser.isApp){
            rootPath = 'http://fe.superjia.com:8080/s/api/debug/2df32f';
        }
        return rootPath + {
            getBanksByChannel: 'ailicai/getBanksByChannel' //支持的银行卡列表
        }[key];
    },

    parse:function(data){
        if(typeof data === "string"){
            return  JSON.parse(data);
        }
        return data;
    },


    init: function(container, options) {
        var self = this;
        self.container = container;
        self.options = options;
        // self.renderList(1);
        self.events();
        self.renderInfo();
    },

    renderInfo: function() {
        var self = this;
        var container = self.container;

        var params = global.paramOfUrl(window.location.href);
        var type = params.type || '',
            channel = params.channel || '';
        //当type(银行卡类型)为空时，考虑支付渠道（1：蜜蜂，2：快线（只支持储蓄卡），3连连）
        if(type == "" ){
            if(channel == ""){
                self.render(type);
            }else{
                self.renderList(channel);
            }
        }else{
            self.render(type);
        }
    },

    renderList: function(d){
        var self = this;
        var container = self.container;
        iwjw.mAjax({
            url: this.api('getBanksByChannel'),
            dataType: 'json',
            cache: true,
            data: {
                channel: d
            },
            success: function(data) {
                data  = self.parse(data);
                if (data) {
                   console.log(data)
                   var debitList = data.debitList;//存储卡
                   var creditList = data.creditList;//信用卡
                   var html = template.draw(bankListTpl, {
                        debitList: debitList,
                        creditList: creditList,
                        dataIndex: d,
                        show: true
                   });
                   container.html(html);
                } 
            }
        });

    },

    render: function(d) {
        var self = this;
        var container = self.container;
        var askData = totalData;
        // var param = global.paramOfUrl(window.location.href);

        var html = template.draw(bankListTpl, {
            bankdata: bankData,
            creditdata: creditData,
            // type: param.type || '',
            type: d,
            show: false
        });
        container.html(html);
    },
    events: function(){
        var self = this;
        var container = self.container;
        container.on('click', '.tab-bank,.tab-credit', function(){
            var $this = $(this);
            var cdtype = $this.data('card');
            $this.addClass('active').siblings().removeClass('active');
            $('.'+cdtype).addClass('active').siblings().removeClass('active');
        })

    }

};

//15  21
var bankMap = {
    "bank": ["gongshang", "nongye", "zhongguo","jianshe","zhaoshang","xingye","guangda","guangfa","pingan","huaxia","minsheng","zhongxin","youchu","jiaotong"],
    "credit": ["gongshang", "nongye", "zhongguo","jianshe","zhaoshang","pufa", "xingye", "guangda","guangfa","pingan","huaxia","minsheng","zhongxin","shanghai","youchu","jiaotong","shanghainongshang","ningbo","dalian","jiangsu","beijing","hangzhou","nanjing","eerduosi"]
};
//21
var nameMap = {
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
}

var bankData = _.map(bankMap.bank, function(item) {
    return {
        img: pageConfig.staticUrl + require('./img/supportcards/' + item + '.png'),
        name : nameMap[item]
    }
});
var creditData=_.map(bankMap.credit, function(item) {
    return {
        img: pageConfig.staticUrl + require('./img/supportcards/' + item + '.png'),
        name : nameMap[item]
    }
});


var totalData = _.map(bankMap.bank.concat(bankMap.credit), function(item){
    return {
        img: pageConfig.staticUrl + require('./img/supportcards/' + item + '.png'),
        name : nameMap[item]
    }
})
supportcards.init($('.mod-supportcards'));

module.exports = supportcards;
