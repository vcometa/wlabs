 <!DOCTYPE HTML>
<html>
<head>
<?PHP include ("includes/css.php"); ?>
</head>
<body>
<?PHP include ("includes/header.php"); ?>
<div class="content">
<?PHP

$user_name = "root";
$password = "";
$database = "simplecms";
$server = "127.0.0.1";

$db_handle = mysql_connect($server, $user_name, $password);

$db_found = mysql_select_db($database);

if ($db_found) {

	$SQL = "SELECT * FROM content ORDER BY lastupdated DESC";
	$result = mysql_query($SQL);

	while ( $db_field = mysql_fetch_assoc($result) ) {

		print '<h2><a href="http://localhost/php/wlabs/page.php?articlename='.html_entity_decode($db_field['articlename']).'">'.html_entity_decode($db_field['title']).'</a></h2>';		
		print '<span> By: '.html_entity_decode($db_field['author']).'</span>';
		print '<div>'.  date("F j, Y", strtotime($db_field['lastupdated']) ) .'</div>';
		print '<p>'.html_entity_decode($db_field['description']).'</p>';		
	}
	mysql_close($db_handle);

}
else {

	print "Database NOT Found " . $db_handle;
	mysql_close($db_handle);

}

?>
</div>
<?PHP include ("includes/footer.php"); ?>
</body>
</html>
