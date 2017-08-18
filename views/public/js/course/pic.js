define(['jquery', 'utils', 'template', 'uploadify'], function ($, utils, template, uploadify) {
	var cs_id = utils.queryString().cs_id
	$.ajax({
		url: '/api/course/picture',
		type: 'get',
		data: {cs_id: cs_id},
		success(data) {
			if (data.code === 200) {
				var htmlStr = template('cs_pic_tpl', data.result)
				$('.steps').html(htmlStr)
			}
		}
	})

	//上传图片
	setTimeout(() => {
		$('#upload').uploadify({
			swf: '/views/public/assets/uploadify/uploadify.swf',
			uploader: '/api/uploader/cover',
			width: 85,
			height: 'auto',
			buttonText: '请选择图片',
			formData: {cs_id: cs_id},
			fileObjName: 'cs_cover_original',
			buttonClass: 'btn btn-success btn-sm',
			itemTemplate: '<span></span>',
			onUploadSuccess(file, data, response) {
				console.log(JSON.parse(data))
				$('.preview img').attr('src', JSON.parse(data).result.path)
				$('#cropBtn').prop('disabled', false)
			}
		})
	}, 1000)
})