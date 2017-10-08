/**
 * Created by huang on 2017/9/26.
 */

require('./plugins/cropper/cropper.min.css');
require('./plugins/cropper/cropper.min.js');

require('./index.css');


var imageCrop = (function () {
	var context = {};

	//注入事件对象
	Ipmph.Events(context);

	//设个变量标识浏览器是否支持
	var isSupport = true;

	var $cropWraper = $(require('./index.html'));
	var innerWrapper = $cropWraper.find('.imagecrop-box-inner');
	var closeBtn = $cropWraper.find('.close');
	var submitBtn = $cropWraper.find('#submitFileBtn');
	var fileBtn = $cropWraper.find('#imagecropFile');
	var cropImage = $cropWraper.find('#imagecropImage-img');
	var loading = $cropWraper.find('.loading');
	var noSupportNoice = $cropWraper.find('.noSupportNoice');

	var cropperOption = {
		dragMode: 'move',
		aspectRatio: 1,
		autoCropArea: 0.65,
		restore: false,
		viewMode: 1,
		guides: true,
		center: false,
		highlight: false,
		cropBoxMovable: true,
		cropBoxResizable: true,
		toggleDragModeOnDblclick: false,
		ready: function () {
		}
	};
	var cropper = new Cropper(cropImage.get(0), cropperOption);

	context.init=function () {
		//将元素插入文档
		$('body').append($cropWraper);
		//事件绑定

		$cropWraper.on('click',()=>{
			this.hide();
		});
		innerWrapper.on('click',(event)=>{
            event.stopPropagation();
		});
		closeBtn.on('click',()=>{
			this.hide();
		});

		//当使用的是Ie9及以下版本，提示浏览器版本过低
		if(Ipmph.Browser.ie&&Ipmph.Browser.ie<10){
			noSupportNoice.show(0);
			isSupport = false;
			submitBtn.attr('disabled','true');
		}

	};
	context.logdingShow=function () {
		loading.show(0);
        return this;
    };
	context.loadingHide=function () {
		loading.hide(0);
		return this;
    };
	context.show=function () {
		$cropWraper.fadeIn(280);
        return this;
	};
	context.hide=function () {
		$cropWraper.fadeOut(280);
        return this;
	};
	context.getImageUrl=function () {
		return imageUrl;
	};


	//监听上传文件操作
	fileBtn.on("change", function () {

		//如果是ie9,ie9则直接上传
		if(!isSupport){
			context.logdingShow();
			uploadImage({'file':this},function () {
				Ipmph.message.success('上传成功');
				context.loadingHide();
				context.trigger('upload_success','http://119.254.226.115/pmph_imesp/upload/sys_userext_avatar/1706/20170623191553876.png');
				context.hide();
			});
			return false;
		}

		var fr = new FileReader();
		var file = this.files[0];

		if (!/image\/\w+/.test(file.type)) {
			Ipmph.message.error("您上传的不是图片文件！");
			return false;
		} else if (file.size > 2 * 1024 * 1024) {
            Ipmph.message.error('图片大小不能超过2M');
			return false;
		}
		fr.readAsDataURL(file);
		fr.onload = function () {
			//这里初始化cropper
			cropImage.attr('src',fr.result);
			cropper.reset().replace(fr.result);
		};
	});
	submitBtn.on('click',function () {
		context.logdingShow();
		$("#registerForm").attr("enctype","multipart/form-data");
		var formData = new FormData($("#registerForm")[0]);
		var imageData = cropper.getCroppedCanvas().toDataURL('image/jpg');
		formData.append("imgBase64",imageData);//
		formData.append("fileFileName","photo.jpg");

		uploadImage(formData,function () {
			Ipmph.message.success('上传成功');
			context.loadingHide();
			context.trigger('upload_success',imageData);
			context.hide();
		});
	});
	
	function uploadImage(formData,callback) {
		$.ajax({
			url:'/upload/userhead',
			type:'POST',
			data:formData,
			timeout:10000,
			contentType: false,
			processData: false,
			success(){},
			error(){},
			complete(){
				callback&&callback();
			},
		})
	}

	context.init();
	return context;
})();

module.exports=imageCrop;