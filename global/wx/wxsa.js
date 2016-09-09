/**
 * Created by zyy on 15/4/29.
 * zhangyuyu@superjia.com
 * 微信服务号的分享js
 */
let inited = false;

var menu = require('./menu.js');

var weixin = {
    defaultConf:{
        title: '给你推荐一个安全可靠的理财平台',
        link: window.pageConfig.siteUrl+'/list',
        type: 'link',
        imgUrl: window.pageConfig.staticUrl + 'img/common/wx_share_logo.png',
        desc: '爱屋吉屋旗下不动产理财平台，定向投资真实房产合约，30-90天超短期投资，7%-9%高收益！',
        dataUrl: ''
    },
    init: function(opt) {
        var opt = opt || '';
        var self = this;

        //非微信环境,不请求签名接口
        if(!global.browser.isWeixin){
            return;
        }

        $.ajax({
            type: 'post',
            url: '/licai/wxSignature.action',
            dataType: 'json',
            cache: false,
            data: {
                url: location.href.split('#')[0]
            },
            success: function(res) {
                if (res && res.status == 1) {
                    wx.config({
                        debug: false,
                        appId: res.data.appId,
                        timestamp: res.data.timestamp,
                        nonceStr: res.data.nonceStr,
                        signature: res.data.signature,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'translateVoice',
                            'startRecord',
                            'stopRecord',
                            'onVoiceRecordEnd',
                            'playVoice',
                            'onVoicePlayEnd',
                            'pauseVoice',
                            'stopVoice',
                            'uploadVoice',
                            'downloadVoice',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'getNetworkType',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'closeWindow',
                            'scanQRCode',
                            'chooseWXPay',
                            'openProductSpecificView',
                            'addCard',
                            'chooseCard',
                            'openCard'
                        ]
                    });

                    wx.ready(function() {
                        inited = true;
                        var config = $.extend({}, self.defaultConf, self.viewConfig||opt);
                        wx.onMenuShareTimeline({
                            title: config.title,
                            link: config.link,
                            imgUrl: config.imgUrl,
                            type: config.type
                        });
                        wx.onMenuShareAppMessage({
                            title: config.title,
                            desc: config.desc,
                            link: config.link,
                            imgUrl: config.imgUrl,
                            type: config.type,
                            dataUrl: config.dataUrl
                        });
                        menu.showShareMenu(['menuItem:share:qq']);
                    });
                    wx.error(function(err) {
                        console.log(err.errMsg)
                    });
                }
            },
            error: function(err) {
                console.log(JSON.stringify(err));
            }
        });
    },

    onReady: function(opt){
        if(!inited){
            this.viewConfig = opt;
        }else if(wx){
            let config = $.extend({}, defaultConf, opt);
            wx.onMenuShareTimeline({
                title: config.title,
                link: config.link,
                imgUrl: config.imgUrl,
                type: config.type
            });
            wx.onMenuShareAppMessage({
                title: config.title,
                desc: config.desc,
                link: config.link,
                imgUrl: config.imgUrl,
                type: config.type,
                dataUrl: config.dataUrl
            });
        }
    }
};
module.exports = weixin;
