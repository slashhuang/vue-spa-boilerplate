/* @Author: MengYue
 * @Date:   2015-10-27 14:37:33
 * @Last Modified by:   zhanshanqin
 * @Last Modified time: 2015-11-10 14:54:40
 */
(function($) {

    'use strict';
    var devHost = 'weixinentdev.iwjwagent.com';
    var env = {
        connectPage: function() {
            var goto = /goto=1/.test(location.href);
            if (pageConfig && pageConfig.gotoUrl && location.href.indexOf(devHost) && !goto) {
                this.gotoPage('weixinEnt/main/goto', 'weixinEnt');
            }
        },
        gotoPage: function(path, program) {
            var redirectUrl;
            var locationUrl = decodeURIComponent(location.href);
            var reURL = decodeURIComponent(location.href);
            var reg, paramURL, temp, code;
            var goto = /goto=1/.test(path);
            
            if(path.indexOf('weixinEnt/main/goto')>=0 && !goto){
                reg = new RegExp(program + '[\\w\\/\\.\\?\\=\\&]+');
                redirectUrl = locationUrl.replace(reg, path);
                redirectUrl += '?redirectURL=' + reURL+'&goto=1';
                location.assign(redirectUrl);
            }
        },
        gotoIP:function(ip, dataAppid){
            var locationUrl = decodeURIComponent(location.href), temp, redirectUrl;
            var paramURL = (temp = locationUrl.match(/redirectURL=([\w\.\/:\?\=\&]+)/)) && temp.length > 1 ? temp[1] : '';
            var params = App.common.util.paramOfUrl(paramURL);
            delete params.code;
            delete params.state;
            var paramStr = '?' + _.map(params, function(val, key) {
                return key + '=' + val;
            }).join('&');
            redirectUrl = paramURL.replace(/\?.*/, paramStr);
            redirectUrl = redirectUrl.replace(devHost, ip);
            redirectUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ dataAppid +'&redirect_uri=' + encodeURIComponent(redirectUrl) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            alert(redirectUrl);
            location.assign(redirectUrl);
        }
    }
    env.connectPage();
    App.common.wxEntEnv = env;
})(Zepto);
