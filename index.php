<?php
	header("Content-Type: text/html; charset=utf-8");

	$path = '';

	if (array_key_exists('PATH_INFO', $_SERVER)) {
		$path = $_SERVER['PATH_INFO'];

		$arr = explode('/', $path);

		if (count($arr) < 4) {
			$path = '/views/dashboard/'.end($arr);
		};
	} else {
		$path = '/views/dashboard/index';
	};

	include $path.'.html'
?>