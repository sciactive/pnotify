<?php

$type = (false ? 'inline' : 'attachment');
$ext = ($_REQUEST['mode'] !== "css" ? "js" : "css");
$mime = ($_REQUEST['mode'] !== "css" ? "text/javascript" : "text/css");
$min = !empty($_REQUEST['min']) ? 'min.' : '';
$files = explode('-', preg_replace("/[^a-z0-9-]/", '', substr($_REQUEST['modules'], 0, 256)));
if (!$files || $files === array('')) {
	$content = file_get_contents('pnotify.core.'.$min.$ext);
	header("Content-Disposition: $type; filename=pnotify.custom.$min$ext");
	header("Content-Length: ".strlen($content));
	header("Content-Type: $mime");
	echo $content;
	exit;
}
sort($files);
$cache_file = 'build-cache/pnotify.custom.'.implode('-', $files).'.'.$min.$ext;

if (file_exists($cache_file)) {
	$content = file_get_contents($cache_file);
	header("Content-Disposition: $type; filename=pnotify.custom.$min$ext");
	header("Content-Length: ".strlen($content));
	header("Content-Type: $mime");
	echo $content;
	exit;
}

$content = file_get_contents("pnotify.core.$min$ext");
foreach ($files as $cur_file) {
	$filename = "pnotify.$cur_file.$min$ext";
	if (!file_exists($filename)) {
		if ($ext === "css")
			continue;
		header('HTTP/1.1 400 Bad Request', true, 400);
		echo "Your request could not be completed because a file you requested is invalid.";
		exit;
	}
	$content .= file_get_contents($filename);
}


header("Content-Disposition: $type; filename=pnotify.custom.$min$ext");
header("Content-Length: ".strlen($content));
header("Content-Type: $mime");
echo $content;

file_put_contents($cache_file, $content);
