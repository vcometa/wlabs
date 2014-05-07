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
$database = "books";
$server = "127.0.0.1";

$db_handle = mysql_connect($server, $user_name, $password);

$db_found = mysql_select_db($database);

if ($db_found) {

	$SQL = "INSERT INTO books (name) VALUES ('Gone With The Wind')";	
	$result = mysql_query($SQL);

	$SQL = "SELECT * FROM books";
	$result = mysql_query($SQL);

	while ( $db_field = mysql_fetch_assoc($result) ) {

		print $db_field['id'].': ';
		print $db_field['name'] . "<BR>";;

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
