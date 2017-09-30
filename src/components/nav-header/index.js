require('./index.scss');

var myMessageNotice = require('components/my-message-notice/index.js');
var header = (function() {
    console.log('this is nav')
	Ipmph.UserModel.init();
	myMessageNotice.appendTo('#test-nav')
})();

module.exports = header;