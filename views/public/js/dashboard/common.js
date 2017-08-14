
	// NProgress.start();

	// NProgress.done();

	// $('.navs ul').prev('a').on('click', function () {
	// 	$(this).next().slideToggle();
	// });


	// if (!$.cookie('PHPSESSID') && location.pathname != "/login") {
	// 	window.location.href = '/login'
	// }


define(['jquery', 'cookie', 'template'], function ($, cookie, template) {
	if (!$.cookie('PHPSESSID') && location.pathname != '/login') {
		location.href = '/login'
	}
	if (location.pathname.indexOf('login') == -1) {
		var tcInfo = JSON.parse($.cookie('tcInfo'))
		var htmlStr = template('tpl_info', tcInfo)
		$('.aside>.profile').html(htmlStr)
	}
	$('#logout').on('click', function() {
		$.ajax({
			url: '/api/logout',
			type: 'post',
			success() {
				alert('OUT')
				location.href = '/login'
			}
		})
	})
})