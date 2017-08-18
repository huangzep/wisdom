define(['jquery', 'form'], function ($) {
	$('#btnCreate').on('click', function () {
		$('form').ajaxSubmit({
			url: '/api/course/create',
			type: 'post',
			success(info) {
				if (info.code === 200) {
					alert('提交成功')
					location.href = '/views/course/basic?cs_id=' + info.result.cs_id
				}
			}
		})
		return false
	})
})