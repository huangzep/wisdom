require.config({
	baseUrl: '/views/public',
	paths: {
		  'jquery':'assets/jquery/jquery.min',
	      'bootstrap':'assets/bootstrap/js/bootstrap.min',
	      'cookie':'assets/jquery-cookie/jquery.cookie',
	      'echarts': 'assets/echarts/echarts.min',
	      'datepicker': 'assets/bootstrap-datepicker/js/bootstrap-datepicker',
	      'datepickerzh': 'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
	      'region':'assets/jquery-region/jquery.region',
	      'uploadify': 'assets/uploadify/jquery.uploadify',
	      'nprogress':'assets/nprogress/nprogress',
	      'template':'assets/artTemplate/template',
	      'ckeditor': 'assets/ckeditor/ckeditor',
	      'form': 'assets/jquery-form/jquery.form',
	      'common': 'js/dashboard/common',
	      'login': 'js/dashboard/login',
	      'utils': 'libs/utils'
	},
	shim: {
		'bootstrap': {
			deps: ['jquery']
		},
		'datepickerzh': {
			deps: ['jquery']
		},
		'uploadify': {
			deps: ['jquery']
		},
		'ckeditor': {
			exports: 'CKEDITOR'
		}
	}
})

require(['common'])