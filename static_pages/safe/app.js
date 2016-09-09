
$(function(){
    var player = new kzPlayer($('.mod-safe')[0], pageData , {});
    player.kzPage.setPlayControl(1);
    weixin.init();

    window.IWpage = player;

    // window.addEventListener("message", function (event) {
    //     if (event.origin !== document.origin){
    //         return;
    //     }
    //     if (event.data === 'prev') {
    //         player.kzPage.prev();
    //     } else if (event.data === 'next') {
    //         player.kzPage.next();
    //     }
    // }, false);
});