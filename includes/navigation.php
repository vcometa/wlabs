<nav class="content">
	<ul>
	
		<?php
			$user_name = "vcometa_admin";
			$password = "vc0m3t@";
			$database = "vcometa_simplecms";
			$server = "localhost";
			$db_handle = mysql_connect($server, $user_name, $password);
			$db_found = mysql_select_db($database);
			$db_handle = mysql_connect($server, $user_name, $password);
			$db_found = mysql_select_db($database);
			if ($db_found) {

				$SQL = "SELECT * FROM categories ORDER BY category ASC";
				$result = mysql_query($SQL);
				print '<li><a href="../pagelist/home">Home</a></li>';
				while ( $db_field = mysql_fetch_assoc($result) ) {

					print '<li><a href="../pagelist/'.strtolower($db_field['category']).'">'.$db_field['category'].'</a></li>';
				}
				mysql_close($db_handle);

			}
		?>
	</ul>
</nav>