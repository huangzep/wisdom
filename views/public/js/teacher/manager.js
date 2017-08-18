define(['jquery', 'template', 'form', 'datepicker', 'datepickerzh'], function ($, template) {
	var search = location.search
	search = search.slice(1).split('&')
	var o = {}
	for (var i = 0; i < search.length; i++) {
		var temp = search[i].split('=')
		o[temp[0]] = temp[1]
	}
	

	//判断id是否存在，有即是编辑功能，无则是添加功能
	if (o.tc_id) {
		//编辑页面
		$.ajax({
			url: '/api/teacher/edit',
			type: 'get',
			data: {tc_id: o.tc_id},
			success(res) {
				if (res.code === 200) {
					res.result.title = '讲师编辑'
					res.result.saveBtnText = '保存'
					var htmlStr = template('tpl_tc_edit', res.result)
					$('.teacher').html(htmlStr)
					//加载日期插件
					$('input[name=tc_join_date]').datepicker({
						format: 'yyyy-mm-dd',
						language: 'zh-CN'
					})
				}
			}
		})

		//保存按钮逻辑
		$('.teacher').on('click', '.btnSave', function () {
			$('form').ajaxSubmit({
				url: '/api/teacher/update',
				type: 'post',
				success(res) {
					alert('提交成功')
					location.href = '/views/teacher/teacher_list'
				}
			})
			return false
		})
	} else {
		//添加功能
		var htmlStr = template('tpl_tc_edit', {
			title: '讲师添加',
			saveBtnText: '添加',
			tc_gender: 1
		})
		$('.teacher').html(htmlStr)
	    $('input[name=tc_join_date]').datepicker({
            format:'yyyy-mm-dd',
            language:'zh-CN'
        });

		//添加按钮功能
		$('.teacher').on('click', '.btnSave', function () {
			$('form').ajaxSubmit({
				url: '/api/teacher/add',
				type: 'post',
				success(res) {
					alert('添加成功')
					location.href = '/views/teacher/teacher_list'
				}
			})
			return false
		}) 
	}

})