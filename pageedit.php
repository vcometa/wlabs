<!DOCTYPE HTML>
<html>
<head>
<link rel="stylesheet" href="tinyeditor/tinyeditor.css">
<script src="tinyeditor/tiny.editor.packed.js"></script>
<style>
.error {color: #FF0000;}
body{
	overflow: auto;
	margin: 0;
	padding: 0;
	font: 14px Arial;
	color: #333;
}
.page{	
	width: 100%;
	margin: 0 auto;
	overflow: hidden;
}
label {
	display:block;
	width: 100px;
	clear: both;
	float: left;
	text-transform: capitalize;
}
.form-body{
	margin: 20px auto 0;
}
.form-body > div {
	margin: 10px 0;	
	float: left;
}
.form-body .inline{
	width: 49%;
}
.form-body .inline.left{
	margin: 0 1% 0 0;
}
.form-body .inline.right{
	margin: 0 0 0 1%;
}
.form-body .full{
	width: 100%;
}
.form-body input{
	width: 97%;
	height: 20px;
	border: 1px solid #ccc;
	padding: 5px;
}
.form-body textarea {
	width: 300px;
	height: 100px;
	border: 1px solid #ccc;
	padding: 5px;
}
.form-body .full input{
	width: 98.5%;
	
}
.submit{	
	/*position: fixed;
	top: 0;
	left: 0;*/
	width: 100%;
	height: 40px;
	cursor: pointer;
	background: #333;
	color: #fff;
	font-weight: bold;
	text-transform: uppercase;
	border:1px solid #eee;	
	margin: 0 auto 20px;
}

.leftpanel{
	width:56%;	
	padding:2%;
	float:left;
}
.rightpanel{
	width:36%;
	padding:2%;
	background: #eee;
	float:right;
}
.rightpanel ul {
	list-style:none;
	margin: 0;
	padding: 0;
}
.rightpanel ul li{
	margin: 10px;
}
</style>
</head>
<body>

<?php
// define variables and set to empty values
$authorErr = $titleErr = $descriptionErr = $articleErr = $tagsErr = "";
$author = $title = $description = $article = $tags = $id = "";
$user_name = "root";
$password = "";
$database = "simplecms";
$server = "127.0.0.1";
$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database);
$author_pass = $galleryid_pass = $title_pass = $description_pass = $article_pass = $tags_pass = false;

if ($_GET){
	$id = htmlspecialchars($_GET["id"]);	
	$SQL = "SELECT * FROM content WHERE id='$id'";
	$result = mysql_query($SQL);
	
	while ( $db_field = mysql_fetch_assoc($result) ) {
	
		$author = html_entity_decode($db_field['author']);
		$title = html_entity_decode($db_field['title']);
		$description = html_entity_decode($db_field['description']);
		$article = html_entity_decode($db_field['article']);
		$tags = html_entity_decode($db_field['tags']);
	}
	
}



if ($_SERVER["REQUEST_METHOD"] == "POST"){

	if(empty($_POST["author"])){		
		$authorErr = "author is required";
		$author_pass = false;
	}else{
		$author = test_input($_POST["author"]);
		$author_pass = true;
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
	
		//mysql_query("UPDATE blogEntry SET content = '$udcontent', title = '$udtitle' WHERE id = $id");
		
		
		
		if($author_pass == true && $title_pass == true && $description_pass == true && $article_pass == true && $tags_pass == true){
		
			if ($_POST["id"] != ""){
			
				$id = test_input($_POST["id"]);							
				$SQL = "UPDATE content SET author='$author', lastupdated=CURRENT_TIMESTAMP, title='$title', description='$description', article='$article', tags='$tags' WHERE id = '$id'";	
				$result = mysql_query($SQL);
				
				
			} else {
				$SQL = "INSERT INTO content (author, created, lastupdated, title, description, article, tags ) VALUES ('$author', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'$title','$description','$article','$tags' )";	
				$result = mysql_query($SQL);
				mysql_close($db_handle);
			}
			
			print $result;
			print "Success!";
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
	$data = mysql_real_escape_string($data);
	return $data;
}
?>

<div class="page">
	<div class="leftpanel">
		<form method="post" id="formPost" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">

		<button class="submit"> SAVE ARTICLE</button>
			<div class="form-body">
				<input type="text" name="id" value="<?php echo htmlentities($id); ?>">
				<div class="full">
					<label for="title">title<span class="error">*</span>:</label> <span class="error"><?php echo $titleErr;?></span>
					<input type="text" name="title" value="<?php echo htmlentities($title); ?>">			
				</div>
				<div class="inline left">
					<label for="author">author<span class="error">*</span>:</label> <span class="error"><?php echo $authorErr;?></span>
					<input type="text" name="author" value="<?php echo htmlentities($author); ?>">			
				</div>
				
				<div class="inline right">
					<label for="tags">tags<span class="error">*</span>:</label> <span class="error"><?php echo $tagsErr;?></span>
					<input type="text" name="tags" value="<?php echo htmlentities($tags); ?>">			
				</div>
				<div>
					<label for="description">description<span class="error">*</span>: </label> <span class="error"><?php echo $descriptionErr;?></span>
					<br>
					<textarea name="description" id="edt-description"><?php echo htmlentities($description); ?></textarea>			
				</div>
				<div>
					<label for="article">article<span class="error">*</span>: </label> <span class="error"><?php echo $articleErr;?></span>
					<br/>
					<textarea name="article" id="edt-article"><?php echo htmlentities($article); ?></textarea>			
				</div>
				

			</div>
			
		</form>
	</div>
	<div class="rightpanel">
	<?php
		if ($db_found) {

			$SQL = "SELECT * FROM content";
			$result = mysql_query($SQL);
			print "<ul>";
			while ( $db_field = mysql_fetch_assoc($result) ) {

				print '<li><span>'.  date('Y - m - d', strtotime($db_field['lastupdated']) ) .'</span> | <a href="http://localhost/php/wlabs/pageedit.php?id='.html_entity_decode($db_field['id']).'">'.html_entity_decode($db_field['title']).'</a>';
			}
			print "</ul>";
			mysql_close($db_handle);

		}
	?>
	</div>
</div>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script>
var description = new TINY.editor.edit('editor', {
	id: 'edt-description',
	width: 926,
	height: 80,
	cssclass: 'tinyeditor',
	controlclass: 'tinyeditor-control',
	rowclass: 'tinyeditor-header',
	dividerclass: 'tinyeditor-divider',
	controls: ['bold', 'italic', 'underline', 'strikethrough', '|', 'subscript', 'superscript', '|',
		'orderedlist', 'unorderedlist', '|', 'outdent', 'indent', '|', 'leftalign',
		'centeralign', 'rightalign', 'blockjustify', '|', 'unformat', '|', 'undo', 'redo', 'n',
		'font', 'size', 'style', '|', 'image', 'hr', 'link', 'unlink', '|', 'print'],
	footer: true,
	fonts: ['Verdana','Arial','Georgia','Trebuchet MS'],
	xhtml: true,
	cssfile: '',
	bodyid: 'editor',
	footerclass: 'tinyeditor-footer',
	toggle: {text: 'source', activetext: 'wysiwyg', cssclass: 'toggle'},
	resize: {cssclass: 'resize'}
});
var article = new TINY.editor.edit('editor', {
	id: 'edt-article',
	width: 926,
	height: 480,
	cssclass: 'tinyeditor',
	controlclass: 'tinyeditor-control',
	rowclass: 'tinyeditor-header',
	dividerclass: 'tinyeditor-divider',
	controls: ['bold', 'italic', 'underline', 'strikethrough', '|', 'subscript', 'superscript', '|',
		'orderedlist', 'unorderedlist', '|', 'outdent', 'indent', '|', 'leftalign',
		'centeralign', 'rightalign', 'blockjustify', '|', 'unformat', '|', 'undo', 'redo', 'n',
		'font', 'size', 'style', '|', 'image', 'hr', 'link', 'unlink', '|', 'print'],
	footer: true,
	fonts: ['Verdana','Arial','Georgia','Trebuchet MS'],
	xhtml: true,
	cssfile: '',
	bodyid: 'editor',
	footerclass: 'tinyeditor-footer',
	toggle: {text: 'source', activetext: 'wysiwyg', cssclass: 'toggle'},
	resize: {cssclass: 'resize'}
});
$('.submit').on('click', function(){
	description.post();
	article.post();
	setTimeout(function(){$( "#formPost" ).submit();}, 800);
});
</script>
</body>
</html>
