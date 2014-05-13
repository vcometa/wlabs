 <!DOCTYPE HTML>
<html>
<head>
<style>
.error {color: #FF0000;}
</style>
</head>
<body>
<?PHP include ("includes/header.php"); ?>
<?PHP

$user_name = "root";
$password = "";
$database = "simplecms";
$server = "127.0.0.1";

$db_handle = mysql_connect($server, $user_name, $password);

$db_found = mysql_select_db($database);

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
<?PHP include ("includes/footer.php"); ?>
</body>
</html>
