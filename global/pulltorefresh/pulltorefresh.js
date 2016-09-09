/* 
 * @Author: zhuxinyong
 * @Date:   16/3/7
 * @Email:  zhuxinyong.sh@superjia.com
 * @Last Modified by:   vavid
 * @Last Modified time: 16/3/7
 */
'use strict';

var pullToRefresh = {
    defaults:{
        maxDistance:100,
        refreshHtml:'下拉刷新',
        loadHtml:'上拉加载',
        startY:0,
        isLoading:false,
        callBack:{
            downCallBack:function(){},
            upCallBack:function(){}
        }
    },
    init: function(container, options) {
        var self = this,
            options = options || {};

        self.insertDOM = false;

        self.container = container;
        self.options = $.extend(self.defaults,options);

        self.events();
    },
    events: function() {
        var self = this;
        var container = self.container;

        // touchstart
        container.on('touchstart',self.pullstart.bind(self));

        // touchmove
        container.on('touchmove',self.pullmove.bind(self));

        // touchend
        container.on('touchend',self.pullend.bind(self));
    },
    pullstart:function(e){
        var self = this,
            touch;

        touch = e.changedTouches[0];
        self.options.startY = touch.pageY;
        // e.preventDefault();
    },
    pullmove:function(e){
        var self = this,
            touch,
            currentY,
            offsetY,
            $win = $(window);

        var winScrollTop = $win.scrollTop();
        var winoffsetTop = $win.scrollTop() + $win.height();
        var contentTop = self.container.height();

        touch = e.changedTouches[0]
        currentY = touch.pageY;

        offsetY = currentY - self.options.startY;

        if(offsetY < 0){
            self.direction = 'up';
        }else{
            self.direction = 'down';
        }

        //console.log(offsetY)

        //console.log(Math.abs(offsetY))
        offsetY = Math.min( Math.abs(offsetY) , self.options.maxDistance );

        //console.log(offsetY)
        //下拉刷新
        if($win.scrollTop() <= 0 && self.direction == 'down' && !!self.options.callBack.downCallBack){

            self.container[0].style.transform = self.container[0].style.webkitTransform = 'translate3d( 0 , ' + offsetY + 'px, 0 )';

            if(!self.insertDOM){
                self.container.before($(self.options.refreshHtml).addClass('j-down'));
                self.domDown = $('.j-down');
                self.insertDOM = true;
            }
            e.preventDefault();
            //上拉加载
        }else if( winoffsetTop > contentTop && self.direction == 'up'){

            if(!self.insertDOM){
                self.container.after($(self.options.loadHtml).addClass('j-up'))
                self.domUp = $('.j-up');
                self.insertDOM = true;
            }
            e.preventDefault();
        }
    },
    pullend:function(e){
        var self = this,
            touch,
            $resultDom;

        touch = e.changedTouches[0]

        if(self.direction == 'down'){
            $resultDom = self.domDown;
        }else if(self.direction == 'up'){
            $resultDom = self.domUp;
        }

        if(self.insertDOM){
            self.callBack();

            self.insertDOM = false;

            $resultDom.remove();

            self.container[0].style.transform = self.container[0].style.webkitTransform = 'translate3d( 0 , 0 , 0 )';
        }
    },
    callBack:function(){
        var self = this;

        if(self.direction == 'down'){
            self.options.callBack.downCallBack && self.options.callBack.downCallBack();
        }else if(self.direction == 'up'){
            self.options.callBack.upCallBack && self.options.callBack.upCallBack();
        }

    }
};

module.exports = pullToRefresh;