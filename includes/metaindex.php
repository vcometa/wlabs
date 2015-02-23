
<?php
	$user_name = "vcometa_admin";
	$password = "vc0m3t@";
	$database = "vcometa_simplecms";
	$server = "localhost";
	$db_handle = mysqli_connect($server, $user_name, $password, $database);
	$keywords = '';
	if ($db_handle) {

		$query = 'SELECT t.tag FROM tags t';
		
		$result = $db_handle->query($query);
		
		while ( $db_field = mysqli_fetch_assoc($result) ) {
		
	
				$keywords = $keywords . strtolower($db_field['tag']) . ', ';
			
		}
		mysqli_close($db_handle);

	}
?>
<meta name="msvalidate.01" content="42695535BC22992387200DDBBDA26DED" />
<meta name="description" content="Latest articles from various topics about <?PHP print $keywords ?>">
<meta name="keywords" content="<?PHP print $keywords ?>">
<meta name="author" content="VBC Consulting INC">
<meta itemprop="copyrightYear" content="<?php echo date("Y"); ?>"/>		
<meta name="robots" content="index, follow">

