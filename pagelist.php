 <!DOCTYPE HTML>
<html>
<head>
<style>
.error {color: #FF0000;}
</style>
</head>
<body>
<?PHP

$user_name = "root";
$password = "";
$database = "test";
$server = "127.0.0.1";

$db_handle = mysql_connect($server, $user_name, $password);

$db_found = mysql_select_db($database);

if ($db_found) {

	$SQL = "SELECT * FROM content";
	$result = mysql_query($SQL);

	while ( $db_field = mysql_fetch_assoc($result) ) {

		print '<h2>'.html_entity_decode($db_field['title']).'</h2>';		
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

</body>
</html>
