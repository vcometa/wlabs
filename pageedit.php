<!DOCTYPE HTML>
<html>
<head>
<style>
.error {color: #FF0000;}
</style>
</head>
<body>

<?php
// define variables and set to empty values
$authorErr = $galleryErr = $createdErr = $lastupdatedErr = $titleErr = $descriptionErr = $articleErr = $tagsErr = "";
$authorid = $galleryid = $created = $lastupdated = $title = $description = $article = $tags = "";
$user_name = "root";
$password = "";
$database = "test";
$server = "127.0.0.1";
$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database);
$authorid_pass = $galleryid_pass = $created_pass = $lastupdated_pass = $title_pass = $description_pass = $article_pass = $tags_pass = false;

if ($_SERVER["REQUEST_METHOD"] == "POST"){

	if(empty($_POST["authorid"])){		
		$authorErr = "authorID is required";
		$authorid_pass = false;
	}else{
		$authorid = test_input($_POST["authorid"]);
		$authorid_pass = true;
	}
	
	if(empty($_POST["galleryid"])){		
		$galleryErr = "galleryID is required";
		$galleryid_pass = false;
	}else{
		$galleryid = test_input($_POST["galleryid"]);
		$galleryid_pass = true;
	}
	
	if(empty($_POST["created"])){		
		$createdErr = "created is required";
		$created_pass = false;
	}else{
		$created = test_input($_POST["created"]);
		$created_pass = true;
	}
	
	if(empty($_POST["lastupdated"])){		
		$lastupdatedErr = "lastupdated is required";
		$lastupdated_pass = false;
	}else{
		$lastupdated = test_input($_POST["lastupdated"]);
		$lastupdated_pass = true;
	}
	
	if(empty($_POST["title"])){		
		$titleErr = "title is required";
		$title_pass = false;
	}else{
		$title = test_input($_POST["title"]);
		$title_pass = true;
	}
	
	if(empty($_POST["description"])){		
		$descriptionErr = "description is required";
		$description_pass = false;
	}else{
		$description = test_input($_POST["description"]);
		$description_pass = true;
	}
	
	if(empty($_POST["article"])){		
		$articleErr = "article is required";
		$article_pass = false;
	}else{
		$article = test_input($_POST["article"]);
		$article_pass = true;
	}
	
	if(empty($_POST["tags"])){		
		$tagsErr = "tags is required";
		$tags_pass = false;
	}else{
		$tags = test_input($_POST["tags"]);
		$tags_pass = true;
	}



	if($db_found){
	
		
		if($authorid_pass == true && $galleryid_pass == true && $created_pass == true && $lastupdated_pass == true && $title_pass == true && $description_pass == true && $article_pass == true && $tags_pass ){
						
			$SQL = "INSERT INTO content (authorid, galleryid, created, lastupdated, title, description, article, tags ) VALUES ('$authorid','$galleryid','$created','$lastupdated','$title','$description','$article','$tags' )";	
			$result = mysql_query($SQL);
			mysql_close($db_handle);
			
			print $result;
		}
	}else{
		print "Database NOT Found " . $db_handle;
		mysql_close($db_handle);
	}

}

function test_input($data){
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}
?>

<p>
<span class="error">* required field.</span>
</p>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">

authorID: <input type="text" name="authorid">
<span class="error">* <?php echo $authorErr;?></span>

<br><br>

galleryID: <input type="text" name="galleryid">
<span class="error">* <?php echo $galleryErr;?></span>

created: <input type="text" name="created">
<span class="error">* <?php echo $createdErr;?></span>

lastUpdated: <input type="text" name="lastupdated">
<span class="error">* <?php echo $lastupdatedErr;?></span>

title: <input type="text" name="title">
<span class="error">* <?php echo $titleErr;?></span>

description: <input type="text" name="description">
<span class="error">* <?php echo $descriptionErr;?></span>

article: <textarea name="article"></textarea>
<span class="error">* <?php echo $articleErr;?></span>

tags: <input type="text" name="tags">
<span class="error">* <?php echo $tagsErr;?></span>

<input type="submit" name="submit" value="Submit">
</form>




</body>
</html>
