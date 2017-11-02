/**
 *
 * 仿照element-ui封装一个消息提醒的功能，常用于主动操作后的反馈提示。
 * 提示状态success/warning/info/error
 * 使用示例：Ipmph.message.success('这里是提示信息');
 *
 */
require('./message.css');


module.exports=(function () {
    //如果已经初始化定义了message模块直接返回该对象
    if(window.Ipmph.common.message)
        return window.Ipmph.common.message;

    //引入html
    let html= require('./message.html');
    let typeClass = {
        success: 'success',
        warning: 'warning',
        info   : 'info',
        error  : 'error'
    };
    var zIndex = 1000;//设一个z-index初始值
    /**
     * CreatMessage类用于创建一个message实体类提供
     * @param type
     * @param text
     * @constructor
     */
    var CreatMessage = function(type,text){
        this.type = type;
        this.text = text;
        this.typeClass = typeClass[this.type]||'success';
        this.domHanddler = null;
        //初始化
        this.init()
    }
    CreatMessage.prototype={
        init(){
            var self = this;
            this.creat();
            //将dom插入文档中
            $('body').append(this.domHanddler);

            //渐入渐出
            var promise = new Promise((resolve, reject)=>{
                self.domHanddler.animate({top:'20px',opacity:1},280,'linear',()=>{
                    resolve();
                });
            });
            promise.then(()=>{
                //驻留时间设为2000ms
                var tempTimer = setTimeout(()=>{
                    self.domHanddler.animate({top:'-20px',opacity:0},'fast',()=>{
                        self.remove();
                    });
                    clearTimeout(tempTimer);
                },2000)
            }).catch((e)=>{console.log(e)});
        },
        creat(){
            this.domHanddler = $(html);
            this.domHanddler.addClass(this.typeClass);
            this.domHanddler.css({'z-index':zIndex++});
            this.domHanddler.find('.message-text').html(this.text);
        },
        remove(){
            this.domHanddler.remove();
        }
    }

    window.Ipmph.common.message = {
        success: text => {new CreatMessage('success',text);},
        warning: text => {new CreatMessage('warning',text);},
        info   : text => {new CreatMessage('info',text);},
        error  : text => {new CreatMessage('error',text);},
    }

    return Ipmph.common.message;

})();

// -------------------------------我好歹也是有底线的-----------------------------------