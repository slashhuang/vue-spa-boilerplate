/**
 * Created by zyy on 15/4/28.
 */
'use strict'
import wx from '../wx/wxsa.js';

var staticUrl = pageConfig.staticUrl;

//  页面适配,如果layoutTag=="flex",则不执行此适配的js
;(function(){

  var windowResize = function () {
    var size = $(window).width();
    $('html').css('font-size', size / 3.2);
  }
  windowResize();

  $(window).resize(function() {
    windowResize();
  });
}());

wx.init();

var iwjw = {

  loadingGifImg: staticUrl + require('../img/load.gif'),
  bigLoadingGifImg: staticUrl + require('../img/load_big.gif'),
  loadingSvg: staticUrl + require('../img/loading.svg'),
  loadingWhiteSvg: staticUrl + require('../img/loading_white.svg'),

  appDownUrl: '//m.iwjw.com/download/mobile.html',

  // 判断浏览器类型，根据不同的类型跳转到合适的场景页面
  judgeBrowser: (function () {
    var location = window.location
    var url = location.href;
    var siteUrl = pageConfig.siteUrl;
    // 兼容未输入www的场景
    var compatibleUrl = siteUrl.indexOf('www.') ? siteUrl.split('www.').join('') : siteUrl;
    var mobileSiteUrl = pageConfig.mobileSiteUrl;
    var f = global.paramOfUrl(url).f
    if (f == '1') return false; //强制不跳转
    var browser = global.browser;

    return;
    //if (browser.isWeixin && url.indexOf('/wx/') > 0) return false;
    if (pageConfig.platform && pageConfig.platform == 'wxent') return false;
    if (browser.isPad) return false;

    if (browser.isMobile) {
      //如果是手机
      if (url.indexOf(siteUrl) != -1) {
        //如果访问的是PC的URL
        location.href = url.replace(siteUrl, mobileSiteUrl);
      } else if (url.indexOf(compatibleUrl) != -1) {
        //如果访问的是PC的URL
        location.href = url.replace(compatibleUrl, mobileSiteUrl);
      }
    } else {
      //如果是PC
      if (url.indexOf(mobileSiteUrl) != -1) {
        //如果访问的是PC的URL
        location.href = url.replace(mobileSiteUrl, siteUrl);
      }
    }
  })(),

  ajax: function(opts) {
    var defaults = {
      dataType: 'json',
      type: 'get',
      cache: false
    };
    opts = $.extend({}, defaults, opts);
    return $.ajax(opts);
  },

  // 监测是否安装APP
  checkApp: function(param, sms) {
    var t1 = Date.now(),
      time = 1000,
      hasApp = true;
    var ifr = $('<iframe></iframe>');
    var host = 'iwjw://www.iwjw.com/';
    var h5host = '//m.iwjw.com';
    var href = '/download/mobile.html';
    if (sms) {
      href = '/picTODown.action?from=sms';
    } else if ($.os.android) {
      href += '?from=androidH5';
    };
    // var StoreSearch=global.getLocalStore('downLoadParams')
    // var search=StoreSearch.params;
    // if () {
    //     expression
    // }
    if (!param) host += 'main';
    else host += param;
    if ($.os.ios && $.os.version.split('.')[0] >= 9) {
      location.href = host;
    } else {
      ifr.css('display', 'none');
      ifr.attr('src', host);
      $('body').append(ifr);
    }
    setTimeout(function() {
      var t2 = Date.now();
      if (!t1 || t2 - t1 < time + 200) {
        hasApp = false;
      }
    }, time);
    setTimeout(function() {
      if (!hasApp) {
        location.href = h5host + href;
      }
      ifr.remove();
    }, time + 500);
  }
};

FastClick && FastClick.attach(document.body);

/**全局配置**/
$(document).ajaxError && $(document).ajaxError(function (e, xhr, ajaxSettings, thrownError) {
  if (~~xhr.status < 400) return false;
  smallnote('服务异常，请重试', {
    pattern: 'error'
  });
  $.jps.trigger('log', { //日志
    type: 'http-error',
    http: {
      status: xhr.status,
      url: ajaxSettings.url,
      type: ajaxSettings.type,
      contentType: ajaxSettings.contentType,
      dataType: ajaxSettings.dataType
    }
  });
});

$(document).ajaxSuccess && $(document).ajaxSuccess(function (e, xhr, ajaxSettings) {
  try {
    $.jps.trigger('log', { //日志
      type: 'http-success',
      http: {
        status: xhr.status,
        url: ajaxSettings.url,
        type: ajaxSettings.type,
        contentType: ajaxSettings.contentType,
        dataType: ajaxSettings.dataType,
        totalTime: new Date().getTime() - xhr.startTime
      }
    });
    var data = JSON.parse(xhr.responseText);
    if (data.status == 500) smallnote(data.msg || '服务异常，请重试', {
      pattern: 'error'
    });
  } catch (e) {

  }
});

$.ajaxSettings = $.extend($.ajaxSettings, {
  dataType: 'json',
  type: 'get',
  cache: false,
  beforeSend: function (xhr) {
    xhr.startTime = new Date().getTime();
  }
});

//发送日志
$.jps.on('user-inited', function () {
  $.jps.trigger('log', { //日志
    type: 'basic'
  });
})

module.exports = iwjw;

