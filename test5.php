<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>

<?php
$link = mysql_connect('localhost', 'vcometa_admin', 'vc0m3t@');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
echo 'Connected successfully';
mysql_close($link);
?>

 </body>
</html>