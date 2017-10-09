require('components/nav-header/index');
require('components/footer/index');

require('../sass/layout.scss');


// init();

// function init() {
	// const a = 1;
	// console.log(a);
	//
	// var b = ['1','2d','4f']
	//
	// var c = b.map(function (iterm) {
		// return parseInt(iterm);
    // });
	// console.log(c);
	//
    // let d  = function (t) {
    //     var n = t && t.__esModule ? function () {
    //         return t.default
    //     } : function () {
    //         return t
    //     };
    //     return n
    // }.bind(this)

    // let promise = new Promise(function(resolve,reject){
		// setTimeout(function () {
    //         resolve('success')
    //     },3000)
    // })
    //
    // promise.then(function (val) {
		// console.log(val);
    // })
// }

// var promise = new Promise(function(resolve){
// 	resolve(42);
// })
//
// promise.then(function(value){
// 	console.log(value);
// 	return 444
// }).then(function (value) {
// 	console.log(value,' this is two')
// }).catch(function (e) {
// 	console.log(e);
// });

// class MyError extends Error{
// 	// 继承了Error类的对象
// }

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
    })
});

