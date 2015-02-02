<div class="feature-box">
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

				$query = "SELECT * FROM content WHERE featured=1 ORDER BY lastupdated DESC";
				
				$result = $db_handle->query($query);
				
				while ( $db_field = mysqli_fetch_assoc($result) ) {
				
					$string = html_entity_decode($db_field['description']);
					$string = (strlen($string) > 100) ? substr($string,0,97).'...' : $string;
				
					print '<article class="ablock '.$category.'" id="article_'.html_entity_decode($db_field['id']).'" data-href="/article/'.html_entity_decode($db_field['articlename']).'">';
				
					print '<figure><img src="/images/photos/'.html_entity_decode($db_field['imgname']).'" title="'.html_entity_decode($db_field['articlename']).'"/></figure>';
					print '<div class="caption-block">';
					print '<h2>'.html_entity_decode($db_field['title']).'</h2>';
					print '<a class="source" href="'.html_entity_decode($db_field['source']).'" target="_blank">'.html_entity_decode($db_field['author']).' '.html_entity_decode($db_field['sourcename']).'</a>';
					//print '<div class="dateline">'.  date("F j, Y", strtotime($db_field['lastupdated']) ) .'</div>';		
					print '<p>'. preg_replace('/[^A-Za-z0-9\. -]/', '', $string).'</p>';					
					
					print '</div></article>';
					
				}
				mysqli_close($db_handle);

			}
		?>
	</div>	
</div>
