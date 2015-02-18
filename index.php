 <!DOCTYPE HTML>
<html>
<head>
<title>Pinstacular</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<?PHP include ("includes/metaindex.php"); ?>
<?PHP include ("includes/css.php"); ?>
</head>
<body class="home">
<?php include_once("includes/analyticstracking.php") ?>
<!-- fb begins -->
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<!--fb ends -->

<?PHP include ("includes/feature.php"); ?>

<?PHP include ("includes/header.php"); ?>

<div class="leaderboard">
<iframe src="http://rcm-na.amazon-adsystem.com/e/cm?t=pinstacularco-20&o=15&p=48&l=ur1&category=amazonhomepage&f=ifr" width="728" height="90" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>

</div>

<div id="container" class="content" data-layout="true" data-layout-options='{"columnCount":[5,3,1], "containerSelector":".content", "itemSelector":".ablock", "itemBorderWidth":1, "itemGutterWidth":25}'>
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

	if ($_SERVER["REQUEST_METHOD"] == "POST"){
		$searchTerm = $_POST["searchTerm"];
		$query = "SELECT * FROM content WHERE title LIKE '%$searchTerm%' OR tags LIKE '%$searchTerm%' OR description LIKE '%$searchTerm%' ORDER BY lastupdated DESC";
	}else if ($_GET){
		$cat = htmlspecialchars($_GET["cat"]);
		$tag = htmlspecialchars($_GET["tag"]);
		
		if( $tag != null){
		
			$query = "SELECT * FROM content WHERE tags LIKE '%$tag%' ORDER BY lastupdated DESC";
			
		}else{
		
			if($cat != 'home'){
				$query = "SELECT * FROM content WHERE category LIKE '%$cat%' ORDER BY lastupdated DESC";
			}else{
				$query = "SELECT * FROM content WHERE featured=0 ORDER BY lastupdated DESC";
			}
		
		}
	}else {
		$query = "SELECT * FROM content WHERE featured=0 ORDER BY lastupdated DESC";
	}

	
	$result = $db_handle->query($query); //mysql_query($SQL);
	$rowCount = 0;

	while ( $db_field = mysqli_fetch_assoc($result) ) {
		
		$desc = html_entity_decode($db_field['description']);
		$desc = (strlen($desc) > 100) ? substr($desc,0,97).'...' : $desc;
		
		$titleShort = html_entity_decode($db_field['title']);
		$titleShort = (strlen($titleShort) > 60) ? substr($titleShort,0,57).'...' : $titleShort;
		
		$category = strtolower(str_replace(', ', ' ', html_entity_decode($db_field['category'])));
	
		//print '<article class="ablock '.$category.'" id="article_'.html_entity_decode($db_field['id']).'" data-href="/article/'.html_entity_decode($db_field['articlename']).'">';
		
		if( $rowCount == 0){
		
			print '<article class="ablock latest '.$category.'" id="article_'.html_entity_decode($db_field['id']).'" data-href="/article/'.html_entity_decode($db_field['articlename']).'">';
		
		}else{
			//print '<a href="/article/'.html_entity_decode($db_field['articlename']).'" class="ablock '.$category.'" id="article_'.html_entity_decode($db_field['id']).'">';
			print '<article class="ablock '.$category.'" id="article_'.html_entity_decode($db_field['id']).'" data-href="/article/'.html_entity_decode($db_field['articlename']).'">';
		
		}
		
		$tags = explode(", ", $db_field['tags']);
		
		print '<figure><img src="/images/thumbnails/'.html_entity_decode($db_field['imgname']).'" title="'.html_entity_decode($db_field['articlename']).'"/><span>Courtesy Of '.html_entity_decode($db_field['sourcename']).'</span></figure>';		
		print '<div class="caption-block">';
		print '<h2>'.$titleShort.'</h2>';
		print '<a class="source" href="'.html_entity_decode($db_field['source']).'" target="_blank">'.html_entity_decode($db_field['author']).'</a>';
		//print '<div class="dateline">'.  date("F j, Y", strtotime($db_field['lastupdated']) ) .'</div>';		
		print '<p>'. preg_replace('/[^A-Za-z0-9\. -]/', '', $desc).'</p>';
		print '<div class="tags">';
		
		for ($i = 0; $i < count($tags); ++$i) {
		
			$lowerTag = strtolower($tags[$i]);
		
			if( $i == count($tags)-1 ){
			
				if( $tag == $lowerTag ){
					print '<a href="../topic/'.$lowerTag.'" class="selected">'.$lowerTag.'</a>';
				}else{
					print '<a href="../topic/'.$lowerTag.'">'.$lowerTag.'</a>';
				}
				
			}else{
			
				if( $tag == $lowerTag ){
					print '<a href="../topic/'.$lowerTag.'" class="selected">'.$lowerTag.'</a>, ';
				}else{
					print '<a href="../topic/'.$lowerTag.'">'.$lowerTag.'</a>, ';
				}
				
			}
		}
		
		print '</div></div>';
		print '</article>';
		
		//print '<p data-char-limit="60">'.$desc.'</p>';	
		

		++$rowCount;
	}
	mysqli_free_result($result);
} else {

	print "Database NOT Found " . $db_handle;
	
}
mysqli_close($db_handle);
?>

</div>
<?PHP include ("includes/footer.php"); ?>
<?PHP include ("includes/javascript.php"); ?>
</body>
</html>
