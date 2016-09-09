var weixinUploadPic = {
    localIds: [],
    serverIds: [],
    selectedPic: function(callback,limitPicCount) {
        var self = this;
        wx.ready(function() {
            // 5 图片接口
            // 5.1 拍照、本地选图
            var picCount = (limitPicCount || 3) - self.serverIds.length;
            wx.chooseImage({
                count: picCount,
                sourceType: ['album', 'camera'],
                success: function(res) {
                    self.localIds = res.localIds;  
                    if (self.localIds.length > 0) {
                        self.uploadPic(callback);
                    }
                },
                error:function(res){
                    
                }
            });
        });
        wx.error(function(res) {
            // dialog.alert(res, {});
        });
    },
    uploadPic: function(callback) {
        var self = this,
            imagesLocalId = self.localIds.pop();
        wx.uploadImage({
            localId: imagesLocalId,
            success: function(res) {
                self.serverIds.push(res && res.serverId);
                callback && callback(imagesLocalId, res.serverId);
                if (self.localIds.length > 0) {
                    setTimeout(function() {
                        self.uploadPic.call(self, callback);
                    }, 100);
                }
            },
            fail: function(res) {
                dialog.Alert(res.message, {});
            }
        });
    },
    previewImages: function(cur, urls) {
        wx.previewImage({
            current: cur || '',
            urls: urls
        });
    }
}
module.exports = weixinUploadPic;
