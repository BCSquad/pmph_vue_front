/**
 * Created by huang on 2017/9/26.
 */
require('./plugins/jquery.Jcrop.min');
require('./plugins/css/jquery.Jcrop.min.css');

require('./index.css');

import {getObjectURL,getInputFile} from '../../libs/file'

var imageCrop = (function () {
	var context = {};

	//注入事件对象
	Ipmph.Events(context);

	context.$cropWraper = $(require('./index.html'));
	context.innerWrapper = context.$cropWraper.find('.imagecrop-box-inner');
	context.closeBtn = context.$cropWraper.find('.close');
	context.submitBtn = context.$cropWraper.find('#submitFileBtn');
	context.fileBtn = context.$cropWraper.find('#imagecropFile');
	context.imageBox = context.$cropWraper.find('#imagecropImage-box');
	context.loading = context.$cropWraper.find('.loading')
	context.scale = 1;
	//内部变量用于保存生成的image地址
	var imageUrl = null;

	var $jcrop;

	context.init=function () {
		//将元素插入文档
		$('body').append(this.$cropWraper);
		//事件绑定
		this.$cropWraper.on('click',()=>{
			this.hide();
		});
		this.innerWrapper.on('click',(event)=>{
            event.stopPropagation();
		});
		this.closeBtn.on('click',()=>{
			this.hide();
		});
		this.fileBtn.on('change',()=>{
			var self = this;
			var url = getObjectURL(this.fileBtn.get(0).files[0]);
			var image = new Image();
			image.src = url;
            imageUrl = url;
            getInputFile(this.fileBtn.get(0));
			this.imageBox.empty().append(image);

			image.onload=function () {
				if($jcrop){
					$jcrop.destroy();
					$jcrop = null;
				}
				self.scale = $(this).width()/image.naturalWidth;
				$(image).Jcrop({
					aspectRatio : 1,
					allowSelect: false,
					allowMove: true,
					allowResize:true,
					onChange : self._setCropData.bind(self),
					onSelect : self._setCropData.bind(self),
				},function () {
					$jcrop = this;
					var dim = $jcrop.getWidgetSize();
					var selectSize = Math.min.apply(null, dim)*0.8;
					this.animateTo([(dim[0]-selectSize)/2,(dim[1]-selectSize)/2,(dim[0]+selectSize)/2,(dim[1]+selectSize)/2])
					$('.requiresjcrop').show();
					console.log(self.scale);
				});
			}

		});
		this.submitBtn.on('click',()=>{
			if(!imageUrl){
                Ipmph.message.error('请选择一张图片');
                return false;
			}
			this.logdingShow();
            setTimeout(()=>{
                this.trigger('uploadImageSuccess',imageUrl);
                this.loadingHide().hide();
                Ipmph.message.success('上传成功');
            },3000)
		});
	};
	context.logdingShow=function () {
		this.loading.show(0);
        return this;
    };
	context.loadingHide=function () {
		this.loading.hide(0);
		return this;
    };
	context.show=function () {
		this.$cropWraper.fadeIn(280);
        return this;
	};
	context.hide=function () {
		this.$cropWraper.fadeOut(280);
        $jcrop.destroy();
        $jcrop = null;
        this.imageBox.empty();
        this.fileBtn.val('');
        imageUrl=null;
        return this;
	};
	context.getImageUrl=function () {
		return imageUrl;
	};
	context._setCropData=function(obj) {
		$("#x").val(obj.x/this.scale);
		$("#y").val(obj.y/this.scale);
		$("#w").val(obj.w/this.scale);
		$("#h").val(obj.h/this.scale);
        return this;
	}

	context.init();

	return context;
})();

module.exports=imageCrop;