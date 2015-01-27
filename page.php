 <!DOCTYPE HTML>

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
		$result = $db_handle->query($query);

		while ( $db_field = mysqli_fetch_assoc($result) ) {
			
			$articleTags = html_entity_decode($db_field['tags']);
			$articleDesc = html_entity_decode($db_field['description']);
			$articleTitle = html_entity_decode($db_field['title']);
			$articleAuthor = html_entity_decode($db_field['author']);
			$articleLastUpdate = html_entity_decode($db_field['lastupdated']);
			$articlePublished = html_entity_decode($db_field['created']);
			
			$contentBlock = '<h1>'.$articleTitle.'</h1>'.
			'<h2>'.$articleDesc.'</h2>'.	
			'<div class="source">'.$articleAuthor.'</div>'.
			'<a class="source" href="'.html_entity_decode($db_field['source']).'">'.html_entity_decode($db_field['sourcename']).'</a>'.
			'<figure><img src="/images/photos/'.html_entity_decode($db_field['imgname']).'" title="'.html_entity_decode($db_field['articlename']).'"/></figure>'.		
			'<article>'.html_entity_decode($db_field['article']) . '</article>'.
			'<div class="tags">'.$articleTags. '</div>';

		}
		mysqli_close($db_handle);

	}
	else {

		print "Database NOT Found " . $db_handle;
		mysqli_close($db_handle);

	}

	?>
<html>
<head>
<title>Pinstacular.com - <?PHP echo $articleTitle; ?></title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<meta name="description" content="<?PHP echo $articleTitle.' : '.$articleDesc; ?>">
<meta name="keywords" content="<?PHP echo $articleTags ?>">
<meta itemprop="dateModified" content="<?PHP echo $articleLastUpdate ?>">
<meta itemprop="datePublished" content="<?PHP echo $articlePublished ?>">
<meta itemprop="copyrightYear" content="<?php echo date("Y"); ?>"/>		
<meta name="robots" content="index, follow">
<meta name="author" content="<?PHP echo $articleAuthor ?>">
<?PHP include ("includes/css.php"); ?>
</head>
<body class="story" id="story">
<div id="fb-root"></div>

<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>



<div class="page">

	<?PHP include ("includes/header.php"); ?>
	
	<div class="leaderboard">
	<iframe src="http://rcm-na.amazon-adsystem.com/e/cm?t=pinstacularco-20&o=15&p=48&l=ur1&category=amazonhomepage&f=ifr" width="728" height="90" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>

</div>

	<div class="content">
		<div class="left-rail">
		
			<div class="socialmedia" style="display:none;">
				<ul>
					<li class="facebook">
						<!--a title="facebook" target="_blank" href="http://www.facebook.com/sharer.php?u=http%3A%2F%2Fpinstacular.com%2Farticle%2F<?PHP echo $articlename ?>&amp;t=<?PHP echo $articleTitle ?>"></a-->
						<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="icon"></div>					
					</li>
					<li class="twitter"><a title="twitter" target="_blank" href="https://twitter.com/intent/tweet?text=Land+Rover+gives+closer+look+at+upcoming+Discovery%C2%A0Sport - http://driving.wpdev5.canada.com/land-rover/auto-news/news/land-rover-gives-closer-look-at-upcoming-discovery-sport - via @drivingdotca"></a>
					
					</li>
					<li class="pinterest"><a class="addthis_button_pinterest_pinit"><span class="at_PinItButton"></span></a></li>
					<li class="email"><a class="addthis_button_email" target="_blank" title="Email" href="#"></a></li>
				</ul>
			</div>
			
			<?PHP echo $contentBlock ?>
			<div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-action="like" data-show-faces="true" data-share="true"></div>
			<div class="fb-comments" data-href="<?php echo 'http://pinstacular.com/article/'.html_entity_decode($articlename) ?>" data-width="100%" data-numposts="7" data-colorscheme="light"></div>
		</div>
		<div class="right-rail">
			<div class="bigbox">
			
				<iframe src="http://rcm-na.amazon-adsystem.com/e/cm?t=pinstacularco-20&o=15&p=12&l=ur1&category=amazonhomepage&f=ifr" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>

			</div>
			<?PHP include ("includes/feature.php"); ?>
			<div class="bigbox">
				<iframe src="http://rcm-na.amazon-adsystem.com/e/cm?t=pinstacularco-20&o=15&p=12&l=ur1&category=dealsstore&banner=1VSBTE74K842BYNBX182&f=ifr" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>
			</div>
		</div>

	</div>
	
	<?PHP include ("includes/footer.php"); ?>
</div>


<?PHP include ("includes/javascript.php"); ?>
</body>
</html>
