 <!DOCTYPE HTML>
<html>
<head>
<style>
.error {color: #FF0000;}
body{
	font: 14px arial;
	color: #333;
	margin:0;
	padding: 0;
}
.content {
	margin: 0 auto;
	width: 100%;
	max-width: 1200px;
	height: 100%;
	overflow: hidden;	
}
header {
	width: 100%;
	height: 30px;
	margin: 0 auto 20px;
	border-bottom: 1px solid #eee;
	background: #000;
	color: #fff;
}
nav ul {
	margin: 0 auto;
	padding: 0;
}
nav ul li{
	list-style:none;
	float: left;
	padding: 5px 10px;
}
footer {
	width:100%;
	height: 30px;
	background: #eee;
}
</style>
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
</div>
<?PHP include ("includes/footer.php"); ?>
</body>
</html>
