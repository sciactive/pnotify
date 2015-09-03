<?php

$type = (false ? 'inline' : 'attachment');
$ext = ($_REQUEST['mode'] !== "css" ? "js" : "css");
$mime = ($_REQUEST['mode'] !== "css" ? "text/javascript" : "text/css");
$min = !empty($_REQUEST['min']) ? 'min.' : '';
$files = explode('-', preg_replace("/[^a-z0-9-]/", '', substr($_REQUEST['modules'], 0, 1024)));
if (!$files || $files === ['']) {
    $content = file_get_contents('src/pnotify.core.'.$min.$ext);
    header("Content-Disposition: $type; filename=pnotify.custom.$min$ext");
    header("Content-Length: ".strlen($content));
    header("Content-Type: $mime");
    echo $content;
    exit;
}
sort($files);

$content = file_get_contents("src/pnotify.core.$min$ext");
foreach ($files as $cur_file) {
    $filename = "src/pnotify.$cur_file.$min$ext";
    if (!file_exists($filename)) {
        $filename_other = "src/pnotify.$cur_file.$min".($ext === "css" ? "js" : "css");
        if (file_exists($filename_other)) {
            continue;
        }
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
