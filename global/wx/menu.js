/* 
 * @Author: MengYue
 * @Date:   2015-11-09 15:56:53
 * @Last Modified by:   MengYue
 * @Last Modified time: 2016-01-12 16:57:03
 */

'use strict';
var menu = {
    friend: function(param) {
        wx.ready(function() {
            wx.checkJsApi({
                jsApiList: ['onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                    var defaultParam = {
                        title: document.title,
                        desc: location.href,
                        link: location.href,
                        imgUrl: './wx_logo.png',
                        trigger: function(t) {},
                        complete: function(t) {
                            smallnote('分享成功');
                        },
                        success: function(t) {},
                        cancel: function(t) {},
                        fail: function(t) {
                            alert(t);
                        }
                    };
                    param = _.extend(defaultParam, param);
                    wx.onMenuShareAppMessage(param);
                }
            });
        });
    },
    showShareMenu: function(hideMenu) {
        wx.ready(function() {
            wx.hideMenuItems({
                menuList: hideMenu || ['menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp'] // 要隐藏的菜单项，所有menu项见附录3
            });
        });
    },
    registerUrl: function(url, callback) {
        iwjw.ajax({
            url: pageConfig.siteUrl + 'main/getSign',
            data: {
                'currentUrl': url
            },
            success: function(res) {
                var defaultConfig = {
                    debug: false,
                    jsApiList: [
                        'hideMenuItems',
                        'onMenuShareAppMessage',
                        'chooseImage',
                        'uploadImage',
                        'previewImage'
                    ]
                };
                var config;
                res && res.data && (config = _.extend(defaultConfig, res.data));
                config && wx.config(config);
                callback && callback();
            },
            error: function() {
                 // smallnote('微信注册url服务报错');
            }
        });
    }
};
module.exports = menu;