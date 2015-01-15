
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
		
	
				$keywords = $keywords. ', '.strtolower($db_field['tag']);
			
		}
		mysqli_close($db_handle);

	}
?>
<meta name="description" content="Latest news articles">
<meta name="keywords" content="<?PHP print $keywords ?>">
<meta name="author" content="V.Cometa">

