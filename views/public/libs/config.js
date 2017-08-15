require.config({
	baseUrl: '/views/public',
	paths: {
		  'jquery':'assets/jquery/jquery.min',
	      'bootstrap':'assets/bootstrap/js/bootstrap.min',
	      'cookie':'assets/jquery-cookie/jquery.cookie',
	      'echarts': 'assets/echarts/echarts.min.js',
	      'nprogress':'assets/nprogress/nprogress',
	      'template':'assets/artTemplate/template',
	      'common': 'js/dashboard/common',
	      'login': 'js/dashboard/login',
	},
	shim: {
		'bootstrap': {
			deps: ['jquery']
		}
	}
})

require(['common'])