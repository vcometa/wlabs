 <!DOCTYPE HTML>
<html>
<head>
<?PHP include ("includes/css.php"); ?>
</head>
<body>
<?PHP include ("includes/header.php"); ?>
<div class="content js-masonry" data-masonry-options='{ "itemSelector": ".ablock" }'>
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
		
		$string = html_entity_decode($db_field['description']);
		$string = (strlen($string) > 100) ? substr($string,0,97).'...' : $string;
	
		print '<a href="/page/'.html_entity_decode($db_field['articlename']).'" class="ablock"><article>';
		print '<img src="'.html_entity_decode($db_field['thumbnail']).'"/>';
		print '<h2>'.html_entity_decode($db_field['title']).'</h2>';		
		//print '<span> By: '.html_entity_decode($db_field['author']).'</span>';
		print '<div>'.  date("F j, Y", strtotime($db_field['lastupdated']) ) .'</div>';
		print '<p>'.$string.'</p></article></a>';		
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
<?PHP include ("includes/javascript.php"); ?>
</body>
</html>
