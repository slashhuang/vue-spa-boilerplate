/**
 * author: @huntbao
 * description: tiny pub-sub for jQuery
 */
'use strict'

var jps = {

    __topics: {},

    on: function(topic, callback) {
        var self = this
        if (!self.__topics[topic]) {
            self.__topics[topic] = $.Callbacks()
        }
        self.__topics[topic].add(callback)
    },

    one: function(topic, callback) {
        var self = this
        self.__topics[topic] = callback;
    },

    remove: function(topic, callback) {
        var self = this
        if (self.__topics[topic]) {
            if (!callback) {
                self.__topics[topic].empty()
            } else {
                self.__topics[topic].remove(callback)
            }
        }
    },

    trigger: function(topic) {
        var self = this
        var cb = self.__topics[topic]
        console.log(cb);
        if (cb) {
            var data = [].slice.call(arguments, 1);
            if (cb instanceof Function) {
                //处理one的情况
                cb.apply(self, data);
                self.__topics[topic] = null;
            } else {
                self.__topics[topic].fire.apply(self, data);
            }

        }
    }
}

$.jps = jps
