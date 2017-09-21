//引入公共css


/**
 * 公共对象
 * */
window.Ipmph=window.Ipmph||{};
window.Ipmph.common=window.Ipmph.common||{};

/**
 * 公共函数部分 utils
 */
require('./js/_utils/Browser');
window.Ipmph.Browser=window.Ipmph.common.Browser;//缩写

require('./js/_utils/Cookie');
window.Ipmph.Cookie=window.Ipmph.common.Cookie;//缩写

require('./js/_utils/Events');
window.Ipmph.Events=window.Ipmph.common.Events;//缩写



/**
 * 公共模块
 */
//用户模块
require('./js/UserModel.js');
window.Ipmph.UserModel=window.Ipmph.common.UserModel;//缩写

//分页模块-使用基于bootstrap jquery的分页插件jqPaginator.js，应用了bootstrap样式
require("./js/jqPaginator.js");

//消息提醒的功能，常用于主动操作后的反馈提示。
require("./js/message/index.js");
window.Ipmph.message=window.Ipmph.common.message;//缩写

//立即生效,返回到顶部按钮
require('./js/back-to-top/backToTop.js');




/**
 *                    _ooOoo_
 *                   o8888888o
 *                   88" . "88
 *                   (| -_- |)
 *                    O\ = /O
 *                ____/`---'\____
 *              .   ' \\| |// `.
 *               / \\||| : |||// \
 *             / _||||| -:- |||||- \
 *               | | \\\ - /// | |
 *             | \_| ''\---/'' | |
 *              \ .-\__ `-` ___/-. /
 *           ___`. .' /--.--\ `. . __
 *        ."" '< `.___\_<|>_/___.' >'"".
 *       | | : `- \`.;`\ _ /`;.`/ - ` : | |
 *         \ \ `-. \_ __\ /__ _/ .-` / /
 * ======`-.____`-.___\_____/___.-`____.-'======
 *                    `=---='
 *
 * .............................................
 *          佛祖保佑             永无BUG
 */
