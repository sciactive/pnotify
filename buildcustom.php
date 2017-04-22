<?php

$type = (false ? 'inline' : 'attachment');
$ext = ($_REQUEST['mode'] !== "css" ? "js" : "css");
$mime = ($_REQUEST['mode'] !== "css" ? "text/javascript" : "text/css");
$dir = !empty($_REQUEST['min']) ? 'dist' : 'src';
$min = !empty($_REQUEST['min']) ? 'min.' : '';
$files = explode('-', preg_replace("/[^a-z0-9-]/", '', substr($_REQUEST['modules'], 0, 1024)));
if (!$files || $files === ['']) {
  $content = file_get_contents($dir.'/pnotify.'.$ext);
  header("Content-Disposition: $type; filename=pnotify.custom.$min$ext");
  header("Content-Length: ".strlen($content));
  header("Content-Type: $mime");
  echo $content;
  exit;
}
sort($files);

if ($min === '') {
  $content = "/* PNotify modules included in this custom build file:\n".
  implode("\n", $files).
  "\n*/\n";
}

$content .= file_get_contents("$dir/pnotify.$ext")."\n";
foreach ($files as $cur_file) {
  $filename = "$dir/pnotify.$cur_file.$ext";
  if (!file_exists($filename)) {
    $filename_other = "$dir/pnotify.$cur_file.".($ext === "css" ? "js" : "css");
    if (file_exists($filename_other)) {
      continue;
    }
    header('HTTP/1.1 400 Bad Request', true, 400);
    echo "Your request could not be completed because a file you requested is invalid.";
    exit;
  }
  $content .= file_get_contents($filename)."\n";
}


header("Content-Disposition: $type; filename=pnotify.custom.$min$ext");
header("Content-Length: ".strlen($content));
header("Content-Type: $mime");
echo $content;
