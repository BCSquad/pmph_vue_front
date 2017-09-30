require('./index.scss');

var html = require('./index.html');

var myMessageNotice = {
	appendTo(selector){
		var $html = $(html);
		$(selector).html($html);
	},
};

module.exports = myMessageNotice;