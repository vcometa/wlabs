<nav>
	<ul>
	
		<?php
			$user_name = "vcometa_admin";
			$password = "vc0m3t@";
			$database = "vcometa_simplecms";
			$server = "localhost";
			$db_handle = mysqli_connect($server, $user_name, $password, $database);
			//$db_found = mysql_select_db($database);
			if ($db_handle) {
			
				$cat = htmlspecialchars($_GET["cat"]);
				$tag = htmlspecialchars($_GET["tag"]);
				$articlename = htmlspecialchars($_GET["articlename"]);

				$query = 'SELECT category FROM content GROUP BY category ';
				//$query = "SELECT * FROM categories ORDER BY category ASC";
				//$result = mysqli_query($SQL);
				$result = $db_handle->query($query);
				
				
				if($cat == null && $tag == null){
				
					if( $articlename == null ){
						print '<li><a href="http://www.pinstacular.com/index.php" class="selected">All</a></li>';					
					}else{
						print '<li><a href="http://www.pinstacular.com/index.php">Home</a></li>';
					}
					
				}else{
					print '<li><a href="http://www.pinstacular.com/index.php">All</a></li>';
				}
				while ( $db_field = mysqli_fetch_assoc($result) ) {
				
					if($cat == strtolower($db_field['category']) ){
						print '<li><a href="../category/'.strtolower($db_field['category']).'" class="selected">'.$db_field['category'].'</a></li>';
					}else{
						print '<li><a href="../category/'.strtolower($db_field['category']).'">'.$db_field['category'].'</a></li>';
					}

					
				}
				mysqli_close($db_handle);

			}
		?>
	</ul>
	<?PHP include ("search.php"); ?>
	<?PHP
		if ($_GET){
			$tag = htmlspecialchars($_GET["tag"]);
			if( $tag != null){
				print '<h1 class="topic-tag">All about '.$tag.'</h1>';
			}
		}
	?>
</nav>