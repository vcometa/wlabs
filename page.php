 <!DOCTYPE HTML>
<html>
<head>
<title>Pinstacular.com - <?PHP echo $articlename; ?></title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<?PHP include ("includes/css.php"); ?>
</head>
<body class="story" id="story">
<div id="fb-root"></div>
<div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-action="like" data-show-faces="true" data-share="true"></div-->
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<div class="content">
<?PHP

$user_name = "vcometa_admin";
$password = "vc0m3t@";
$database = "vcometa_simplecms";
$server = "localhost";

$db_handle = mysqli_connect($server, $user_name, $password, $database);
$articlename = htmlspecialchars($_GET["articlename"]);
//$db_found = mysql_select_db($database);
date_default_timezone_set('America/New_York');
if ($db_handle) {

		
	$query = "SELECT * FROM content WHERE articlename='$articlename'";
	//$result = mysql_query($SQL);
	$result = $db_handle->query($query);

	while ( $db_field = mysqli_fetch_assoc($result) ) {

		print '<h1>'.html_entity_decode($db_field['title']).'</h1>';
		//print '<figure><img src="'.html_entity_decode($db_field['thumbnail']).'" title="'.html_entity_decode($db_field['articlename']).'"/></figure>';
		//print '<h2>'.html_entity_decode($db_field['description']).'</h2>';		
		//print '<span> By: '.html_entity_decode($db_field['author']).'</span>';
		//print '<div>'.  date("F j, Y", strtotime($db_field['lastupdated']) ) .'</div>';		
		print '<article>'.html_entity_decode($db_field['article']) . '</article>';
		print '<div>'.html_entity_decode($db_field['tags']). '</div>';

	}
	mysqli_close($db_handle);

}
else {

	print "Database NOT Found " . $db_handle;
	mysqli_close($db_handle);

}

?>
</div>

<div class="fb-comments" data-href="<?php echo 'http://pinstacular.com/page/'.html_entity_decode($articlename) ?>" data-width="700px" data-numposts="7" data-colorscheme="light"></div>
</body>
</html>
