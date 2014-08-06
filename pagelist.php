 <!DOCTYPE HTML>
<html>
<head>
<title>Pinstacular</title>
<?PHP include ("includes/css.php"); ?>
</head>
<body>
<!-- fb begins -->
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<!-- fb ends -->

<?PHP include ("includes/header.php"); ?>
<div class="content js-masonry" data-masonry-options='{ "itemSelector": ".ablock" }'>
<?PHP

$user_name = "vcometa_admin";
$password = "vc0m3t@";
$database = "vcometa_simplecms";
$server = "localhost";
//$db_handle = mysql_connect($server, $user_name, $password, $database);
//$db_found = mysql_select_db($database);
$db_handle = mysqli_connect($server, $user_name, $password, $database);
//$db_found = mysql_select_db($database);
date_default_timezone_set('America/New_York');
if ($db_handle) {

	if ($_GET){
		$cat = htmlspecialchars($_GET["cat"]);
		if($cat != 'home'){
			$query = "SELECT * FROM content WHERE category='$cat'ORDER BY lastupdated DESC";
		}else{
			$query = "SELECT * FROM content ORDER BY lastupdated DESC";
		}
	} else {
		$query = "SELECT * FROM content ORDER BY lastupdated DESC";
	}

	
	$result = $db_handle->query($query); //mysql_query($SQL);

	while ( $db_field = mysqli_fetch_assoc($result) ) {
		
		$string = html_entity_decode($db_field['description']);
		$string = (strlen($string) > 100) ? substr($string,0,97).'...' : $string;
	
		print '<a href="/page/'.html_entity_decode($db_field['articlename']).'" class="ablock"><article>';
		print '<figure><img src="'.html_entity_decode($db_field['thumbnail']).'" title="'.html_entity_decode($db_field['articlename']).'"/></figure>';
		print '<h2>'.html_entity_decode($db_field['title']).'</h2>';		
		print '<div class="byline">'.html_entity_decode($db_field['author']).'</div>';
		print '<div class="dateline">'.  date("F j, Y", strtotime($db_field['lastupdated']) ) .'</div>';
		print '<p>'.$string.'</p><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-action="like" data-show-faces="true" data-share="true"></div></article></a>';		
	}
	mysqli_close($db_handle);

}
else {

	print "Database NOT Found " . $db_handle;
	mysqli_close($db_handle);

}

?>
</div>
<?PHP include ("includes/footer.php"); ?>
<?PHP include ("includes/javascript.php"); ?>
</body>
</html>
