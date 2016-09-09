/* 
 * @Author: jade
 * @Date:   2016-01-17 21:42:13
 * @Last Modified by:   jade
 * @Last Modified time: 2016-03-30 20:50:18
 */

'use strict';
var bridge = {

    loadURL: function(url) {
        // $('div').first().append(url);
        // if(!global.browser.isApp){
        //     return;
        // }
        // location.href = url;
        // console.log(url);
        var iframe = document.createElement('iframe');
        var body = document.body || document.documentElement;
        iframe.style.display = "none";
        iframe.setAttribute("src", url);
        body.appendChild(iframe);
        setTimeout(function() {
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }, 200);
    },

    //分享
    sharepage:function(params,callback){
        params.method = 'sharepage';
        this.callmethod(params,callback);
    },
    //获取登录状态
    //userid,name,phonenum
    getloginstate:function (params,callback) {
        params.method = 'getloginstate';
        this.callmethod(params,callback);
    },
    //更新APP
    updateapp:function (params,callback) {
        params.method = 'updateapp';
        this.callmethod(params,callback);
    },
    //关闭tips
    closetips:function (params,callback) {
        params.method = 'closetips';
        this.callmethod(params,callback);
    },

    //app下拉刷新 0:关闭下拉刷新,1:打开下拉刷新
    setrefreshhead:function (params,callback) {
        params.method = 'setrefreshhead';
        this.callmethod(params,callback);
    },

    // iwjw://callnatvie/callmethod?method=xxxxx
    callmethod: function(params,callback) {
        this.callnative('callmethod',params,callback);
    },

    //打开UI界面
    //iwjw://callnatvie/jumpui?page=xxx
    jumpui: function(params, callback) {
        this.callnative('jumpui', params, callback);
    },

    // 通过app调用后台接口api
    // apiname=xxx&xx=xx
    callapiservice: function(params, callback) {
        this.callnative('callapiservice', params, callback);
    },


    api:function(api){
        return function(params, callback){
            bridge.callnative(api, params, callback);
        }
    },

    callnative: function(api, params, callback) {
        var self = this;

        if (!params){
            return false;
        }

        params.callback = self.callback(callback);
        params._t = Date.now();

        $.extend(params, global.paramOfUrl(location.href));
        
        var search = _.map(params, function(val, key) {
            if(typeof val === 'string'){
                return key + '=' + val;
            }else{
                // return key + '=' + encodeURIComponent(JSON.stringify(val));
                return key + '=' + JSON.stringify(val);
            }

        }).join('&');
        var url = 'iwjw://callnatvie/' + api + '?' + search;
        self.loadURL(url);
    },

    callback: function(callback) {
        var cb = _.uniqueId('app_');
        (function() {
            window[cb] = function(data) {
                callback && callback(data);
                delete window[cb];
            }
        })(cb, callback);
        return cb;
    }
};

//新房获取消息个数:newlist/list.js

//APP调用:

// window.callJs('sendMessageNum',{num:100});

//JS业务代码里:

// $.jps.on('sendMessageNum',function (data) {
//     var $message = self.__container.find('.j-message-num');
//     if(data && data.num > 0){
//         $message.show().text(data.num);
//     }else{
//         $message.hide();
//     }
// });

window.callJs = function (method,params) {
    console.log('trigger:' + method);
    $.jps.trigger(method,params);
}

module.exports = bridge;
