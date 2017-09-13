define(['jquery', 'utils', 'template', 'bootstrap', 'form'], function ($, utils, template, bt, form) {
	var cs_id = utils.queryString().cs_id

	//1.根据id向后台发送请求要数据
	renderLesson()

	//2.添加按钮注册事件
	$('.steps').on('click', '#addLesson', function () {
		var htmlStr = template('cs_modal_tpl', {
			title:'课时添加',
	        saveTextBtn :'添加',
	        actionUrl:'/api/course/chapter/add'
		})
		$('#tpl_modal').html(htmlStr)
		$('#lesson').modal()
	})

	//3.保存按钮注册事件
	$('#tpl_modal').on('click', '#saveBtn', function () {
		var ct_is_free = Number($('input[name=ct_is_free]').prop('checked'))
		$('form').ajaxSubmit({
			type: 'post',
			data: {
				ct_cs_id: cs_id,  
				ct_is_free
			},
			success(info) {
				if (info.code === 200) {
					alert('添加成功...渲染当前页面...');
			        renderLesson();
			        $('#lesson').modal('hide');
				}
			}
		})
	})

	//4.给编辑按钮注册事件
	$('.steps').on('click', '#btnEdit', function () {
		$.ajax({
			url: '/api/course/chapter/edit',
			type: 'get',
			data: {
				ct_id: $(this).parent().attr('data-id')
			},
			success(info) {
				if (info.code === 200) {
					info.result.title = '编辑课时';
			        info.result.saveTextBtn = '保 存';
			        info.result.actionUrl = '/api/course/chapter/modify';
					var htmlStr = template('cs_modal_tpl',info.result);
			        $('#tpl_modal').html(htmlStr);

			        $('#lesson').modal();
				} 
			}
		})
	})


	//根据id渲染当前页面
	function renderLesson() {
		$.ajax({
			url: '/api/course/lesson',
			type: 'get',
			data: {
				cs_id
			},
			success(info) {
				if (info.code === 200) {
					var htmlStr = template('cs_lesson_tpl', info.result)
					$('.steps').html(htmlStr)
				}
			} 
		})
	}
})