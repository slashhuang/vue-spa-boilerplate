/* 
 * @Author: baiwenhao
 * @Date:   2016-01-19 15:28:36
 * @Last Modified by:   baiwenhao
 * @Last Modified time: 2016-01-25 16:25:12
 */

var getLocations = {
    init: function(options) {
        var self = this;
        self.__options = $.extend({
            addredd: null, //地址
            name: 'baidu',
            callback: null
        }, options);

        /*--------参数--------*/
        self.data = {};
        self.data.longitude = null; //经度
        self.data.latitude = null; //纬度
        self.data.address = null; //地址

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(d) {
                self.position.call(self, d);
            }, function(error) {
                wx.getLocation({
                    type: 'wgs84',
                    success: function(res) {
                        self.position({
                            coords: {
                                longitude: res.longitude,
                                latitude: res.latitude
                            }
                        });
                    },
                    cancel: function(res) {
                        smallnote('请开启GPS或切换定位模式！');
                    }
                });
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        smallnote('请开启GPS后重试！');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        smallnote("定位失败,位置信息不可用");
                        break;
                    case error.TIMEOUT:
                        smallnote("定位失败,请求获取用户位置超时");
                        break;
                    case error.UNKNOWN_ERROR:
                        smallnote("定位失败,定位系统失效");
                        break;
                }

            }, {
                "enableHighAcuracy": false,
                "maximumAge": 3000,
                "timeout": 5000
            });
        } else {
            smallnote('您的终端暂不支持地理定位功能,或一台设备重试!')
        }
    },
    position: function(d) {
        var self = this;

        var long = d.coords.longitude;
        var lat = d.coords.latitude;

        self.latlon = lat + ',' + long;

        var href = long + ',' + lat + ';' + long + ',' + lat;

        var url = 'http://api.map.baidu.com/geoconv/v1/?coords=' + href + '&from=1&to=5&ak=D5b939310cda4811e6587c8a535e1edc&services';
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: url,
            success: function(res) {
                var lat = res.result[0].x;
                var log = res.result[0].y;
                var lat2 = res.result[1].x;
                var log2 = res.result[1].y;

                    self.data.longitude = lat2;
                    self.data.latitude = log2;
    
                var url2 = "http://api.map.baidu.com/geocoder/v2/?ak=D5b939310cda4811e6587c8a535e1edc&services&callback=renderReverse&location=" + log2 + ',' + lat2 + "&output=json&pois=0";
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: url2,
                    beforeSend: function() {
                        $(self.__options.address).html('正在定位中');
                    },
                    success: function(json) {
                        if (json.status == 0) {
                            self.data.address = json.result.formatted_address;
                            $(self.__options.address).html(self.data.address);
                            self.__options.callback(self.data);
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {}
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {}
        });

    }
};

module.exports = getLocations;
