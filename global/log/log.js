/**
* @Author: lancui
* @Date:   2016-07-07 12:07:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-07-14 14:07:51
*/

/*
test: dataCollect=http://collect.iwjwtest.com/dataCollect/
beta: dataCollect=http://10.168.6.201:8112/dataCollect/
pro: dataCollect=http://10.157.128.179/dataCollect/
 */
//http://userappbeta.iwjw.com:8112/dataCollect/

var logUrl = pageConfig.datacollectUrl;
var log = {
    init: function( options) {
        var self = this;
        self.__options = options || {};
        self.__resetLogData();
    },
    clickTrigger: function(options) {
        var self = this;
        self.__resetLogData();
        let {act_k='',act_v='',id=''} =options;
        _.extend(self.__logdata,{act_k,act_v,id,date : new Date()});
        self.__sendLogData();
    },
    __resetLogData: function() {
        var self = this;
        self.__logdata = {};
        var userId = self.__getUserId() || '';
        self.__logdata = {
            uid: vueCommon.genId(32), // 获取uuid
            usid: userId, // 获取用户id
            url: encodeURI(window.location.href), // 当前url
            ref: encodeURI(document.referrer), // 用户上一页面url
            pf: 'ailicaiWX'
        };
    },
    __getUserId() {
        var self = this;
        return (self.__getCookie('userCode') || '').replace(/"/g,'');
    },
    __getCookie(name){
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null){
         return unescape(arr[2]);
        }else{
         return null;
        }
    },
    __sendLogData: function() {
        var self = this;
        $.ajax({
            cache:false,
            url: logUrl + 'track/user/web.do',
            data: self.__logdata,
            dataType: 'jsonp'
        })
    },
}

module.exports = log;

$.jps.on('log', function(options) {
    let self = log;
    switch (options.type) {
        default:// 默认click
            self.clickTrigger(options)
            break;

    }
});
log.init(pageConfig);
