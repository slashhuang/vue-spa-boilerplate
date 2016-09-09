/**
 * Created by zyy on 15/5/26.
 * zhangyuyu@superjia.com
 */
'use strict'

$ && (window.$ = $);
typeof jQuery !== 'undefined' && (window.jQuery = jQuery);
if (!window.console) {
    window.console = {
        log: $.noop
    };
}

template.draw = function (tpl, data) {
    return template.render(tpl)(data);
}

$.noop || ($.noop = function () {
});

//兼容requestAnimationFrame
if (!window.requestAnimationFrame) {

    window.requestAnimationFrame = (function () {

        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                window.setTimeout(callback, 1000 / 60);
            };

    })();
}

//浏览器类型判断
var userAgent = navigator.userAgent.toLowerCase();

var global = {
    templatePackage: function () {
        template.renderHtml = function (source, options) {
            var render = template.compile(source);
            return render(options);
        }
    }(),

    browser: $.extend({
        isApp: /Iwjw/i.test(userAgent),
        isIos: /ipad|iphone|ipod/i.test(userAgent),
        isAndroid: /android/i.test(userAgent),
        isWeixin: userAgent.match(/MicroMessenger/i) == 'micromessenger',
        isMobile: isMobile(userAgent),
        isPad: isPad(userAgent),
        isIphone: isIphone(userAgent)
    }, judgeBrowser(userAgent), judgeOS(userAgent), getAppVersion(userAgent)),


    /**
     * Simply compares two string version values.
     *
     * Example:
     * versionCompare('1.1', '1.2') => -1
     * versionCompare('1.1', '1.1') =>  0
     * versionCompare('1.2', '1.1') =>  1
     * versionCompare('2.23.3', '2.22.3') => 1
     *
     * Returns:
     * -1 = left is LOWER than right
     *  0 = they are equal
     *  1 = left is GREATER = right is LOWER
     *  And FALSE if one of input versions are not valid
     *
     * @function
     * @param {String} left  Version #1
     * @param {String} right Version #2
     * @return {Integer|Boolean}
     * @author Alexey Bass (albass)
     * @since 2011-07-14
     */
    versionCompare: function (left, right) {
        if (typeof left + typeof right != 'stringstring')
            return false;

        var a = left.split('.')
            , b = right.split('.')
            , i = 0, len = Math.max(a.length, b.length);

        for (; i < len; i++) {
            if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
                return 1;
            } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
                return -1;
            }
        }

        return 0;
    },

    isEmail: function (v) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(v);
    },

    isMobile: function (v) {
        //return /^1[3|4|5|7|8]\d{9}$/.test(v);
        return /^\d{11,15}$/.test(v);
    },

    isNum: function (param) {
        return /^([1-9]\d*|0)$/.test(param);
    },

    parseNumber: function (number, defaultNum) {
        defaultNum = defaultNum == null ? 0 : defaultNum;
        if (isNaN(number)) return defaultNum;
        return Number(number);
    },

    isName: function (v) {
        return /^[\u4E00-\u9FA5a-zA-Z_]{2,20}$/.test(v);
    },
    //过滤HTML
    filterHtml: function (h) {
        return $.trim(h.replace(/(<.*>.*<\/.*>)|(<.*>)/g, ''));
    },

    //过滤<>
    escapeHtml: function (html) {
        return html.replace(/</g, '&lt;').replace(/>/, '&gt;');
    },

    scrollTo: function (y, dom, callback) {
        var $dom = dom || $('html, body');
        $dom.animate({
            scrollTop: (y || 0)
        }, 500, function () {
            return callback && callback();
        });
    },

    //模拟表单提交obj:{inputName:inputVal,....}
    postSubmit: function (url, obj) {
        var form = $('<form method="post" action="' + url + '"></form>');
        if (obj != null) {
            for (var o in obj) {
                form.append('<input type="hidden" name="' + o + '" value=' + obj[o] + '>');
            }
        }
        form.appendTo("body"); //兼容IE
        form.submit();
    },
    /**
     * 判断浏览器是否支持某一个CSS3属性
     * @param {String} 属性名称
     * @return {Boolean} true/false
     */
    isSupportCss3: function (style) {
        var prefix = ['webkit', 'moz', 'ms', 'o'],
            i,
            humpString = [],
            htmlStyle = document.documentElement.style,
            _toHumb = function (string) {
                return string.replace(/-(\w)/g, function ($0, $1) {
                    return $1.toUpperCase();
                });
            };
        for (i in prefix) {
            humpString.push(_toHumb(prefix[i] + '-' + style));
        }
        humpString.push(_toHumb(style));
        for (i in humpString) {
            if (humpString[i] in htmlStyle) return true;
        }
        return false;
    },

    supportVideo: function () {
        if (!!document.createElement('video').canPlayType) {
            var vidTest = document.createElement("video");
            var oggTest = vidTest.canPlayType('video/ogg; codecs="theora, vorbis"');
            if (!oggTest) {
                var h264Test = vidTest.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
                if (!h264Test) {
                    return false;
                } else {
                    if (h264Test == "probably") {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                if (oggTest == "probably") {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    },

    getParaValue: function (param, str) {
        var hashs = (str ? str : location.hash.substr(2)).split('&');
        var findValue = null;
        _.each(hashs, function (hash) {
            var h = hash.split('=')
            if (h[0] === param) {
                findValue = h[1];
                return false
            }
        });
        return findValue;
    },

    //解析url里面的查询参数
    paramOfUrl: function (url) {
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
    },

    locationReload: function (url) {
        var location = window.location;
        if (!url) {
            location.reload();
            return false;
        }
        var href = location.href;

        if (href == url) {
            location.reload();
        } else {
            var fullUlr = location.protocol + '//' + location.host + url;
            if (fullUlr == href) {
                location.reload();
            }
            location.href = url;
        }
    },

    __localStoreKey: 'iwjw_storage',

    //获得localstorage里面的值
    getLocalStore: function (key) {
        var self = this;
        var s = store.get(self.__localStoreKey) || {};
        var o = {};
        if (_.isObject(key)) {
            for (var p in key) {
                var val = s[p] || key[p];
                if (!self.__isStoreExpired(val))
                    o[p] = val;
                /*default value*/
            }
        } else {
            if (!self.__isStoreExpired(s[key]))
                o = s[key];
            else
                o = null;
        }
        return o
    },

    /**
     * [格式化价格格式]
     * @param  {[type]} num [description]
     * @return {[type]}     [description]
     */
    formatPrice: function (num) {
        if (num == 0) return num;
        if (!num) return '';
        // 浮点型价格截取小数部分
        var splitNum = String(num).split('.');

        var arr = String(splitNum[0]).split(''),
            len = arr.length;
        var r = len % 3,
            c = Math.floor(len / 3); //余数、位数
        for (var i = 1; i <= c; i++) {
            arr.splice(r + (c - i) * 3, 0, ',');
        }
        if (!r) arr.shift();
        num = arr.join('');
        if (splitNum.length > 1) num += '.' + splitNum[1];
        return num;
    },

    //判断是否过期
    __isStoreExpired: function (val) {
        if (_.isObject(val)) {
            var expired = val.__expired;
            if (expired && new Date().getTime() > expired) return true;
        }
        return false;
    },

    //设置localstorage的值
    setLocalStore: function (key, value) {
        var self = this
        var s = store.get(self.__localStoreKey) || {}
        if (_.isObject(key)) {
            for (var p in key) {
                s[p] = key[p]
            }
        } else {
            s[key] = value
        }

        store.set(self.__localStoreKey, s)
        return self
    }

};

Date.prototype.strftime = function (format) {
    var self = this;

    function padding(n, p) {
        if (n < 10) {
            return (p || '0') + n;
        }
        return n;
    }

    function repl(s, c) {
        switch (c) {
            case 'd':
                return padding(self.getDate());
            case 'e':
                return self.getDate();
            case 'u':
                return self.getDay() + 1;
            case 'w':
                return self.getDay();
            case 'm':
                return padding(self.getMonth() + 1);
            case 'C':
                return parseInt(self.getFullYear() / 20 - 1, 10);
            case 'y':
                return padding(self.getFullYear() % 100);
            case 'Y':
                return self.getFullYear();
            case 'H':
                return padding(self.getHours());
            case 'I':
                return padding(self.getHours() % 12);
            case 'l':
                return padding(self.getHours() % 12, ' ');
            case 'M':
                return padding(self.getMinutes());
            case 'p':
                return self.getHours() < 12 ? 'AM' : 'PM';
            case 'P':
                return self.getHours() < 12 ? 'am' : 'pm';
            case 'r':
                return self.strftime('%I:%M:%S %p');
            case 'R':
                return self.strftime('%H:%M');
            case 'S':
                return padding(self.getSeconds());
            case 'T':
                return self.strftime('%H:%M:%S');
            case 'D':
                return self.strftime('%m/%d/%Y');
            case 'F':
                return self.strftime('%Y-%m-%d');
            case 's':
                return parseInt(self.getTime() / 1000, 10);
            case 'x':
                return self.toLocaleDateString();
            case 'X':
                return self.toLocaleTimeString();
            case 'n':
                return '\n';
            case 't':
                return '\t';
            case '%':
                return '%';
            default:
                return self.strftime(c);
        }
        return c;
    }

    var ret = format.replace(/%(\w)/g, repl)
    return ret;
};

//判断浏览器
function judgeBrowser(agent) {
    var a, b;

    function uaMatch(agent) {
        //ie 11
        var rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
        var match = rMsie.exec(agent);
        if (match != null) {
            return {
                browser: 'msie',
                version: match[2] || '0'
            };
        }
        var b = /(chrome)[ \/]([\w.]+)/.exec(agent) || /(webkit)[ \/]([\w.]+)/.exec(agent) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(agent) || /(msie) ([\w.]+)/.exec(agent) || agent.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(agent) || [];

        return {
            browser: b[1] || '',
            version: b[2] || '0'
        };
    }

    a = uaMatch(userAgent);
    b = {};
    a.browser && (b[a.browser] = !0, b.version = a.version);
    b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0);

    return b;
}

//判断操作系统
function judgeOS(agent) {
    var windows = (agent.indexOf('windows', 0) != -1) ? 1 : 0;
    var mac = (agent.indexOf('mac', 0) != -1) ? 1 : 0;
    var linux = (agent.indexOf('linux', 0) != -1) ? 1 : 0;
    var unix = (agent.indexOf('x11', 0) != -1) ? 1 : 0;
    var os_type;
    if (windows) os_type = 'Ms';
    else if (mac) os_type = 'Mac';
    else if (linux) os_type = 'Linux';
    else if (unix) os_type = 'Unix';
    var result = {};
    if (os_type)
        result['is' + os_type] = true;
    return result;
}

//是否是移动浏览器
function isMobile(agent) {
    var phoneReg = '\\b(ip(hone|od)|android|opera m(ob|in)i' + '|windows (phone|ce)|blackberry' + '|s(ymbian|eries60|amsung)|p(laybook|alm|rofile/midp' + '|laystation portable)|nokia|fennec|htc[-_]' + '|mobile|up.browser|[1-4][0-9]{2}x[1-4][0-9]{2})\\b'

    if (!!new RegExp(phoneReg, 'igm').exec(agent)) {
        return true
    }
    return false
}

function isIphone(agent) {
    var phoneReg = '\\b(ip(hone|od))\\b'

    if (!!new RegExp(phoneReg, 'igm').exec(agent)) {
        return true
    }
    return false
}

function isPad(agent) {
    var tableReg = "\\b(ipad|tablet|(Nexus 7)|up.browser" + "|[1-4][0-9]{2}x[1-4][0-9]{2})\\b";

    if (!!new RegExp(tableReg, 'igm').exec(agent)) {
        return true
    }
    return false
}

function getAppVersion(agent) {

    var obj = {};

    if (/iwjw/i.test(agent)) {
        // alert(agent)
    } else {
        obj.appVersion = '当前不在APP内部';
    }

    return obj
}
// export public method
module.exports = global;
