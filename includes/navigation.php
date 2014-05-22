<nav class="content">
	<ul>
		<?php
			$user_name = "root";
			$password = "";
			$database = "simplecms";
			$server = "127.0.0.1";
			$db_handle = mysql_connect($server, $user_name, $password);
			$db_found = mysql_select_db($database);
			$db_handle = mysql_connect($server, $user_name, $password);
			$db_found = mysql_select_db($database);
			if ($db_found) {

				$SQL = "SELECT * FROM categories ORDER BY category ASC";
				$result = mysql_query($SQL);
				while ( $db_field = mysql_fetch_assoc($result) ) {

					print '<li><a href="#">'.$db_field['category'].'</a></li>';
				}
				mysql_close($db_handle);

			}
		?>
	</ul>
</nav>