/**
 * Created by zyy on 15/4/29.
 * zhangyuyu@superjia.com
 * 微信服务号的分享js
 * modified by slashhuang ==> adding stylesheet 16/9/2
 */

//加载css相关
require('./kzPlayer.css');
require('./safe.css');
var inited = false;

var defaultInfo = {
    title: '银行级风险控制，资金安全有保障',
    link: window.pageConfig.siteUrl + '/safe',
    type: 'link',
    imgUrl: window.pageConfig.staticUrl + 'img/common/wx_share_logo.png',
    desc: '爱屋吉屋旗下不动产理财平台，定向投资真实房产合约，30-90天超短期投资，7%-9%高收益！',
    dataUrl: ''
};
var weixin = {
    init: function(opt) {
        var opt = opt || '';
        var self = this;

        var userAgent = navigator.userAgent.toLowerCase();
        if(/Iwjw/i.test(userAgent)){
            initApp({
                title: defaultInfo.title,
                link: defaultInfo.link,
                imgUrl: defaultInfo.imgUrl,
                desc: defaultInfo.desc
            });
        }

        //非微信环境,不请求签名接口
        if(!(userAgent.match(/MicroMessenger/i) == 'micromessenger')){
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
                        var config = $.extend({}, defaultInfo , self.viewConfig||opt);
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
                    });
                    wx.error(function(err) {
                        console.log(err.errMsg)
                    });
                    wx.hideMenuItems({
                        menuList: ['menuItem:share:qq'] // 要隐藏的菜单项，所有menu项见附录3
                    });
                }
            },
            error: function(err) {
                console.log(JSON.stringify(err));
            }
        });
    }
};


function initApp(shareInfo){
    shareInfo.method = 'sharepage';
    var callback = function(){}
    callnative('callmethod',shareInfo, callback);

    function callnative(api, params, callback) {
        // var self = this;

        if (!params){
            return false;
        }

        // params.callback = self.callback(callback);
        params._t = Date.now();

        $.extend(params, paramOfUrl(location.href));

        var search = _.map(params, function(val, key) {
            if(typeof val === 'string'){
                return key + '=' + val;
            }else{
                // return key + '=' + encodeURIComponent(JSON.stringify(val));
                return key + '=' + JSON.stringify(val);
            }

        }).join('&');
        var url = 'iwjw://callnatvie/' + api + '?' + search;
        loadURL(url);
    };

    function loadURL(url) {
        var iframe = document.createElement('iframe');
        var body = document.body || document.documentElement;
        iframe.style.display = "none";
        iframe.setAttribute("src", url);
        body.appendChild(iframe);
        setTimeout(function() {
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }, 200);
    }
}

function paramOfUrl(url) {
    url = url || window.location.href;
    var paramSuit = url.substring(url.indexOf('?') + 1).split('&');
    var paramObj = {};
    for (var i = 0; i < paramSuit.length; i++) {
        var param = paramSuit[i].split('=');
        if (param.length == 2) {
            var key = decodeURIComponent(param[0]);
            var val = decodeURIComponent(param[1]);
            if (paramObj.hasOwnProperty(key)) {
                if (!(paramObj[key] instanceof Array)) {
                    paramObj[key] = [paramObj[key]]
                }
                paramObj[key].push(val);
            } else {
                paramObj[key] = val;
            }
        }
    }
    return paramObj;
}
