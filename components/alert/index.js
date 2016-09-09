/**
 * Vue Plugin Install.
 */

//  **********  example ********
// var VueAlert = require('../ui/alert');
// Vue.use(VueAlert);

// vm.$alert('password is required!');
// vm.$alert('password is required!', 'top');
// vm.$alert('password is required!', 'bottom');

function install(Vue) {

    var AlertConstructor = Vue.extend(require('./alert.vue'));
    var alertInstance = null;
    var __time = 2000;

    Object.defineProperty(Vue.prototype, '$alert', {

        get: function () {

            return (param) => {
                alert('debugging ');
                if (alertInstance) return;

                if(typeof param === 'string'){
                    param = {
                        msg: param
                    }
                }

                if(param.time) {
                    __time = param.time;
                }
                alertInstance = new AlertConstructor({
                    el: document.createElement('div'),
                    data() {
                        return {
                            message: param.msg,
                            position: param.position
                        };
                    }
                });
                alertInstance.$appendTo(document.body);
            };
        }

    });

    Vue.transition('fadeIn', {
        afterEnter: function (el) {
            setTimeout(() => {
                alertInstance.$remove();
            }, __time);
        },
        afterLeave: function (el) {
            alertInstance = null;
        }
    });
}

if (window.Vue) {
    Vue.use(install);
}

module.exports = install;