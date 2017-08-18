define(['utils', 'jquery', 'template', 'ckeditor', 'form'], function (utils, $, template, CKEDITOR, form) {
	var id = utils.queryString().cs_id
	$.ajax({
		url: '/api/course/basic',
		type: 'get',
		data: {
			cs_id: id
		},
		success(info) {
			if (info.code === 200) {
				var htmlStr = template('cs_basic_tpl', info.result)
				$('.steps').html(htmlStr)

				//添加富文本编辑器
				CKEDITOR.replace('cs_brief')
			}
		}
	})
	//保存按钮
	$('.steps').on('click', '#btnSave', function () {
		$('#cs_brief').val(CKEDITOR.instances.cs_brief.getData())
		$('form').ajaxSubmit({
			url: '/api/course/update/basic',
			type: 'post',
			success(info) {
				if (info.code === 200) {
					alert('保存成功，即将跳转到图片中心...')
					location.href = '/views/course/pic?cs_id=' + info.result.cs_id
				}
			}
		})
		return false
	})
})