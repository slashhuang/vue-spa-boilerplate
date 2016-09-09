/**
 * @Author: wjs
 * @Date:   2016-05-23T13:37:15+08:00
 * @Last modified by:   slashhuang
 * @Last modified time: 2016-09-9 将组件抽出到components/index.js下面
 */



// vue 项目基本配置
Vue.use(VueRouter);
Vue.use(VueResource);

const RANDOMARRAY = [
    ..._.map(_.range(0, 26), item => String.fromCharCode(item + 'a'.charCodeAt(0))),
    ..._.map(_.range(0, 10), item => String.fromCharCode(item + '0'.charCodeAt(0))),
    ..._.map(_.range(0, 26), item => String.fromCharCode(item + 'A'.charCodeAt(0)))
];

module.exports = {
    createRouter: params => {
        let defaultOpts = {
            history: true,
            saveScrollPosition: true
        };
        if (typeof params === 'string') {
            defaultOpts.root = pageConfig.mobileSiteUrl + params;
        } else if (typeof params === 'object') {
            defaultOpts = $.extend({}, defaultOpts, params);
        }

        return new VueRouter(defaultOpts);
    },
    changeDocumentTitle: newTitle => {
        let $body = $('body');
        document.title = newTitle;
        // let $iframe = $('<iframe src="/favicon.ico"></iframe>');//ios上不能改变title
        let $iframe = $('<iframe></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    },

    /**
     * 获取随机字符串
     * @param len 字符串的长度
     */
    genId(len = 32) {
        let result = '';
        const arrLen = RANDOMARRAY.length - 1;
        while (len--) {
            result += RANDOMARRAY[_.random(0, arrLen)];
        }
        return result;
    },
    log(opts){
        //埋点
        var target = $.extend({
            "type":'h5Click',
            act_k :'',
            act_v :''
        },opts);

        $.jps.trigger('log',target);
    }

};
