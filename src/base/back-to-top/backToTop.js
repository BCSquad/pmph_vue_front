/**
 * Created by huang on 2017/9/21.
 */

require('./backToTop.css');

module.exports=(function(){
    let html = require('./backToTop.html');
    let $dom = $(html);
    //插入文档流中
    $('body').append($dom);
    //返回到顶部按钮
    new BackTop($dom);

})();

/**
 *返回顶部按钮逻辑
 */
function BackTop($dom){
    var timer;
    var $window=$(window)
    var windowH = $window.height();
    if(!$dom||$dom.length==0){
        return false;
    }
    //点击go to top按钮时，以300的速度回到顶部，这里的300可以根据你的需求修改
    $dom.on('click',function(){
        $("html,body").animate({scrollTop:0},300);
        return false;
    });
    //监听滚动事件
    $window.scroll(function(){
        var scrollY = $(this).scrollTop();
        clearTimeout(timer);
        timer = setTimeout(function(){
            if(scrollY>windowH*1.5){
                $dom.fadeIn();
            }else{
                $dom.fadeOut();
            }
        },100)
    });

    if($window.scrollTop()>windowH*1.5){
        $dom.fadeIn();
    }else{
        $dom.fadeOut();
    }
}

// -------------------------------我是有底线的-----------------------------------