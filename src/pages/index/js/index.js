require('components/nav-header/index');
require('components/footer/index');

require('../sass/layout.scss');

var imageCrop = require('components/imageCrop/index.js');
$(function () {
	Ipmph.UserModel.on(Ipmph.UserModel.eventType.LOGIN_SUCCESS,function (data) {
		console.log('接收到登录成功事件');
		Ipmph.message.success('接收到登录成功事件');
		// console.log(data)
	});

	var options = {
		totalPages: 100,
		onPageChange: function (num, type) {
		}
	}

	$('#example').jqPaginator(options);

	$('.message').on('click',function(){
		var type = $(this).attr('data-type');

        Ipmph.message[type]('这是一段提示文字信息');
	});
	$('.uploadheadImage').on('click',function () {
        imageCrop.show();
    });

    imageCrop.on('imageCrop:upload_success',function (imageUrl) {
		var image = new Image();
        image.src = imageUrl;
        $('.page-main').append(image)
    });
});

