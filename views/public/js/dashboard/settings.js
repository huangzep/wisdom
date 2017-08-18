define(['jquery', 'template', 'datepicker', 'datepickerzh', 'region', 'uploadify', 'ckeditor', 'form'], function ($, template, datepicker, datepickerzh, region, uploadify, CKEDITOR) {
	//请求数据
	$.ajax({
		url: '/api/teacher/profile',
		type: 'get',
		success(info) {
			if (info.code === 200) {
				var htmlStr = template('profile_tpl', info.result)
				$('.settings').html(htmlStr)
				
				 //日期插件
				 $('input[name=tc_join_date],input[name=tc_birthday]').datepicker({
				 	format: 'yyyy-mm-dd',
				 	language: 'zh-CN'
				 })
				 //省市区三级联动
				 $('#region').region({
				    url:'/views/public/assets/jquery-region/region.json'
				 });
				 //图片插件
				// $('#upfile').uploadify({
				//  	'swf': '/views/public/assets/uploadify/uploadify.swf',
				//  	'uploader': '/api/upload/avatar',
				//  	'buttonText': '请选择图片',
				//  	'width': 200,
				//  	'height': 200,
				//  	'fileSizeLimit': '200k',
				//  	'fileTypeExts': '*.jpg',
				//  	'fileObjName': 'tc_avatar',
				//  	onUploadSuccess(file, data, response) {
				//  		$('.preview img').attr('src', JSON.parse(data).result.ptah)
				//  	}
				//  })


				$('#upfile').uploadify({
		           'swf':'/views/public/assets/uploadify/uploadify.swf',
		           'uploader':'/api/uploader/avatar', //提交的接口
		           'width':120,
		           'height':120,
		           'buttonText':'',
		           'buttonClass': '',
		           'fileObjName':'tc_avatar',//上传到服务器的文件名，也就是当前的input标签的name属性值
		           onUploadSuccess:function (file,data,response){
		           	alert('aa')
		             // var obj = JSON.parse(data);
		             // // obj.result.path
		             //  // 图片上传成功之后，服务器会返回一个图片在服务器的地址
		             // $('.preview img').attr('src',obj.result.path);
		             $('.preview img').attr('src',JSON.parse(data).result.path);
		         	}
		        });

		        // $('#upfile').css('zIndex', -1)

		        //富文本编辑器
		        CKEDITOR.replace('introduce', {
		        	toolBarGroups: [
		        		{name: 'clipboard', groups: ['clipboard', 'undo']},
		        		{name: 'links'},
		        		{name: 'document', groups: ['mode', 'document', 'doctools']},
		        		{name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
		        		{name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']}
		        	]
		        })
			}
		}
	})


	//按钮注册事件
	$('.settings').on('click', '.saveBtn', function () {
		alert(33)
		//更新当前文本内容
	     $("#introduce").val(CKEDITOR.instances.introduce.getData());
	     console.log(CKEDITOR)
         $('form').ajaxSubmit({
           url:'/api/teacher/modify',
           type:'post',
           success:function (info){
              if(info.code==200){
                alert('保存成功...');
                location.href='/settings';
              }
           }
         })
         return false;//阻止默认刷新行为
	})

		 
})


