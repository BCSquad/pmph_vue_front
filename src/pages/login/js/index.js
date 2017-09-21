require('components/nav-header/index');
require('components/footer/index');

require('../sass/layout.scss');

// 测试懒加载插件库
var lozad = require('@/libs/lozad.js');
$(function () {
	var observer = lozad('.lozad', {
		load: function(el) {
			el.src = el.dataset.src;
			el.onload = function() {
				el.style.width = "100%";
			}
		}
	});
	observer.observe();
});