require('./index.scss');

var html = require('./index.html');

var myMessageNotice = {
	appendTo(selector){
		var $html = $(html);
		$(selector).html($html);
	},
	init(dataList){

	},
};

module.exports = myMessageNotice;