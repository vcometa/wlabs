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

		print '<h1>'.$db_field['title'].'</h1>';
		print '<h4>'.$db_field['description'].'</h4>';
		print '<div>'.$db_field['lastupdated'].'</div>';
		print '<article>'.$db_field['article'] . '</article>';
		print '<div>'.$db_field['tags'] . '</div>';

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
