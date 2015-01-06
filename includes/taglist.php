<div class="tag-list">
	<div class="content">
		<?php
			$user_name = "vcometa_admin";
			$password = "vc0m3t@";
			$database = "vcometa_simplecms";
			$server = "localhost";
			$db_handle = mysqli_connect($server, $user_name, $password, $database);
			if ($db_handle) {
			
				$cat = htmlspecialchars($_GET["cat"]);
				
				$tag = htmlspecialchars($_GET["tag"]);

				$query = 'SELECT t.tag FROM tags t';
				
				$result = $db_handle->query($query);
				
				while ( $db_field = mysqli_fetch_assoc($result) ) {
				
					//$color = '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
					
					if( $tag == strtolower($db_field['tag']) ){
						print '<a class="tag-block selected" href="../topic/'.strtolower($db_field['tag']).'" >'.$db_field['tag'].'</a>';
					}else{				
						print '<a class="tag-block" href="../topic/'.strtolower($db_field['tag']).'" >'.$db_field['tag'].'</a>';
					}
					
				}
				mysqli_close($db_handle);

			}
		?>
	</div>	
</div>
