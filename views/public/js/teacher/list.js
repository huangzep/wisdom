define(['jquery', 'template', 'bootstrap'], function ($, template) {
	$.ajax({
		url: '/api/teacher',
		type: 'get',
		success(data) {
			if (data.code === 200) {
				var htmlStr = template('tc_list_tpl', data)
				$('#tc_list_tBody').html(htmlStr)
			}
		}
	})

	//模态框
	$('#tc_list_tBody').on('click','a.btn-info',function (){
	     var id = $(this).parent().attr('data-id');
	      $.ajax({
	        url:'/api/teacher/view',
	        type:'get',
	        data:{tc_id:id},
	        success:function (info){
	          if(info.code ==200){
	            //要渲染模板
	            var htmlStr = template('tc_info_tpl',info.result);
	            $('#teacherModal tbody').html(htmlStr);
	            $('#teacherModal').modal();  //让模态框弹出来
	          }
	        }
	      })
	})

	//启用注销
	$('#tc_list_tBody').on('click', 'a.btn-warning', function () {
		var _this = $(this)
		$.ajax({
			url: '/api/teacher/handle',
			type: 'get',
			data: {
				tc_id:$(this).parent().data('id'),
				tc_status:$(this).data('status')
			},
			success(res) {
				_this.data('status',res.result.tc_status);
				if (res.result.tc_status==1) {
					_this.text('启 用')
				} else {
					_this.text('注 销')
				}
			}
		})
	})
})