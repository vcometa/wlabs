 <!DOCTYPE HTML>
<html>
<head>
<?PHP include ("includes/css.php"); ?>
</head>
<body>
<?PHP include ("includes/header.php"); ?>
<div class="content">
<?PHP

$user_name = "vcometa_admin";
$password = "vc0m3t@";
$database = "vcometa_simplecms";
$server = "localhost";

$db_handle = mysql_connect($server, $user_name, $password);

$db_found = mysql_select_db($database);
date_default_timezone_set('America/New_York');
if ($db_found) {

	$articlename = htmlspecialchars($_GET["articlename"]);	
	$SQL = "SELECT * FROM content WHERE articlename='$articlename'";
	$result = mysql_query($SQL);

	while ( $db_field = mysql_fetch_assoc($result) ) {

		print '<h1>'.html_entity_decode($db_field['title']).'</h1>';
		print '<h2>'.html_entity_decode($db_field['description']).'</h2>';		
		print '<span> By: '.html_entity_decode($db_field['author']).'</span>';
		print '<div>'.  date("F j, Y", strtotime($db_field['lastupdated']) ) .'</div>';		
		print '<article>'.html_entity_decode($db_field['article']) . '</article>';
		print '<div>'.html_entity_decode($db_field['tags']). '</div>';

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
