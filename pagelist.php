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

	if ($_GET){
		$cat = htmlspecialchars($_GET["cat"]);
		if($cat != 'home'){
			$SQL = "SELECT * FROM content WHERE category='$cat'ORDER BY lastupdated DESC";
		}else{
			$SQL = "SELECT * FROM content ORDER BY lastupdated DESC";
		}
	} else {
		$SQL = "SELECT * FROM content ORDER BY lastupdated DESC";
	}

	
	$result = mysql_query($SQL);

	while ( $db_field = mysql_fetch_assoc($result) ) {

		print '<h2><a href="page/'.html_entity_decode($db_field['articlename']).'">'.html_entity_decode($db_field['title']).'</a></h2>';		
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
