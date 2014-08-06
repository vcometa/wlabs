<nav class="content">
	<ul>
	
		<?php
			$user_name = "vcometa_admin";
			$password = "vc0m3t@";
			$database = "vcometa_simplecms";
			$server = "localhost";
			$db_handle = mysqli_connect($server, $user_name, $password, $database);
			//$db_found = mysql_select_db($database);
			if ($db_handle) {

				$query = "SELECT * FROM categories ORDER BY category ASC";
				//$result = mysqli_query($SQL);
				$result = $db_handle->query($query);
				print '<li><a href="http://www.pinstacular.com">Home</a></li>';
				while ( $db_field = mysqli_fetch_assoc($result) ) {

					print '<li><a href="../category/'.strtolower($db_field['category']).'">'.$db_field['category'].'</a></li>';
				}
				mysqli_close($db_handle);

			}
		?>
	</ul>
</nav>