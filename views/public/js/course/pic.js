define(['jquery', 'utils', 'template', 'uploadify', 'jcrop'], function ($, utils, template, uploadify, Jcrop) {
	var cs_id = utils.queryString().cs_id
	$.ajax({
		url: '/api/course/picture',
		type: 'get',
		data: {cs_id: cs_id},
		success(data) {
			if (data.code === 200) {
				var htmlStr = template('cs_pic_tpl', data.result)
				$('.steps').html(htmlStr)
				$('.preview img').attr('src', data.result.cs_cover_original)
			}
		}
	})

	
	setTimeout(() => {
		//上传图片
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
		//裁切
		$('.steps').on('click', '#cropBtn', function () {
			if ($(this).attr('data-status') != 'save') {
				$(this).attr('data-status', 'save').text('保存')
				$('.preview img').Jcrop({
					aspectRatio: 2,
					setSelect: [20, 20, 300, 150],
					boxWidth: 400,
					boxHeight: 300
				}, function () {
					jcrop_obj = this
					jcrop_obj.initComponent('Thumbnailer', {width: 240, height: 120 })
					$('.thumb').append($('.jcrop-thumb'))
				})
			} else {
				var result = jcrop_obj.getSelection()
				console.log(result)
				$.ajax({
					url: '/api/course/update/picture',
					type: 'post',
					data: {
						cs_id,
						x: result.x,
						y: result.y,
						w: result.w,
						h: result.h
					},
					success(info) {
						if (info.code === 200) {
							location.href = '/views/course/lesson?cs_id=' + info.result.cs_id
						}
					}
				})
			}
		})

	}, 1000)
})