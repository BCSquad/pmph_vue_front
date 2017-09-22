require('components/nav-header/index');
require('components/footer/index');

require('../sass/layout.scss');

//引入canvas背景计算方法
import {CanvasBackground} from '@/libs/canvas_bg.js';

$(function () {

	/**
	 * 初始化canvas背景
	 */
	var bg=new CanvasBackground({
		canvasContainerID:"canvas",
		circleColor:"rgba(49,210,142,0.8)",
		lineColor:"rgba(49,210,142,1)",
		canvasOpacity:0.2
	});

	/**
	 * 登录按钮点击事件
	 */
	$("#loginBtn").on('click',function () {
		Ipmph.message.info('我还没做登录功能！');
	})

})
