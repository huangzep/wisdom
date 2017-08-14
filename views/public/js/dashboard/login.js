define(['jquery', 'cookie'], function ($) {
	 $('#formList').submit(function () {
        var data = $(this).serialize()
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: data,
            success(res) {
                $.cookie('tcInfo', JSON.stringify(res.result))
                window.location.href = '/'
            },
            error(err) {
                console.log('you are wrong')
            }
        })
      
        return false
    })   
})