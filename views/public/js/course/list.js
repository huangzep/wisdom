define(['jquery', 'template'], function ($, template) {
	$.ajax({
		url: '/api/course',
		type: 'get',
		success(data) {
			if (data.code === 200) {
				var htmlStr = template('cs_list_tpl', data)
				$('.courses').html(htmlStr)
				console.log(htmlStr)
			}
		}
	})
})