/**
 * Vue note plugin
 * @Author slashhuang
 * @Usage
 * - headMsg
 * - bodyMsg
 * - hintMsg
 * - buttons={
    n_cbk:取消回调，
    y_cbk:确认回调
    cancel:取消文案
    cancel:确认文案
 }
 */
function install(Vue) {
    var NoteConstructor = Vue.extend(require('./note.vue'));
    var noteInstance = null;
    var __time = 1000;
    Object.defineProperty(Vue.prototype, '$noter', {
        get: function () {
            return (param) => {
                if (noteInstance && noteInstance.$el!==null) {
                    noteInstance.$remove();
                };
                noteInstance = new NoteConstructor({
                    el: document.createElement('div'),
                    data() {
                        return {
                            headMsg: param.headMsg||'',
                            bodyMsg: param.bodyMsg||'',
                            hintMsg: param.hintMsg||'',
                            buttons: param.buttons||null
                        };
                    }
                });
                noteInstance.$appendTo(document.body);
            };
        }
    });

}
module.exports = install;