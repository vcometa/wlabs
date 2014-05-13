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
	width: 1200px;
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
	margin: 0 1% 20px 0;
}
.form-body .inline.right{
	margin: 0 0 20px 1%;
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
.form-body .inline.right > select {
	width: 100%;
	height: 35px;
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
	margin: 0 auto;
}

.leftpanel{
	width:22%;
	height: 900px;
	padding:0 1%;
	float:left;
	background: #eee;
	overflow: hidden;
}
.rightpanel{
	width:75%;
	padding:0 0 0 1%;	
	float:right;
}
.leftpanel ul {
	list-style:none;
	margin: 0;
	padding: 0;
}
.leftpanel ul li{
	margin: 10px;
}
.leftpanel span {
    display: block;
    float: left;
	margin: 0 10px 0 0;
}
.leftpanel a {
	text-decoration: none;
	color: #3e8bd7;
}
.leftpanel a:hover {
	text-decoration: underline;
	color: #333;
}
.alert{
	position: absolute;
	top: 20%;
	left: 20%;
	background: #eee;
	border: 1px solid #333;
	width: 200px;
	height: 100px;
}
</style>
</head>
<body>

<?php
// define variables and set to empty values
$authorErr = $titleErr = $descriptionErr = $articleErr = $tagsErr = $categoryErr = "";
$author = $title = $description = $article = $tags = $id = $thumbnail = $category = "";
$user_name = "root";
$password = "";
$database = "simplecms";
$server = "127.0.0.1";
$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database);
$authorPass = $galleryidPass = $titlePass = $descriptionPass = $categoryPass = $articlePass = $tagsPass = false;

if ($_GET){
	$id = htmlspecialchars($_GET["id"]);	
	$SQL = "SELECT * FROM content WHERE id='$id'";
	$result = mysql_query($SQL);
	
	while ( $db_field = mysql_fetch_assoc($result) ) {
	
		$author = html_entity_decode($db_field['author']);
		$title = html_entity_decode($db_field['title']);
		$description = html_entity_decode($db_field['description']);
		$thumbnail = html_entity_decode($db_field['thumbnail']);
		$article = html_entity_decode($db_field['article']);
		$tags = html_entity_decode($db_field['tags']);
		$category = html_entity_decode($db_field['category']);
	}
	
}



if ($_SERVER["REQUEST_METHOD"] == "POST"){

	if(empty($_POST["author"])){		
		$authorErr = "author is required";
		$authorPass = false;
	}else{
		$author = test_input($_POST["author"]);
		$authorPass = true;
	}
	
	if(empty($_POST["title"])){		
		$titleErr = "title is required";
		$titlePass = false;
	}else{
		$title = test_input($_POST["title"]);
		$titlePass = true;
	}
	
	if(empty($_POST["description"])){		
		$descriptionErr = "description is required";
		$descriptionPass = false;
	}else{
		$description = test_input($_POST["description"]);
		$descriptionPass = true;
	}
	
	if(empty($_POST["category"])){		
		$categoryErr = "category is required";
		$categoryPass = false;
	}else{
		$category = test_input($_POST["category"]);
		$categoryPass = true;
	}
	
	$thumbnail = test_input($_POST["thumbnail"]);
	
	if(empty($_POST["article"])){		
		$articleErr = "article is required";
		$articlePass = false;
	}else{
		$article = test_input($_POST["article"]);
		$articlePass = true;
	}
	
	if(empty($_POST["tags"])){		
		$tagsErr = "tags is required";
		$tagsPass = false;
	}else{
		$tags = test_input($_POST["tags"]);
		$tagsPass = true;
	}

	if($db_found){
	
		//mysql_query("UPDATE blogEntry SET content = '$udcontent', title = '$udtitle' WHERE id = $id");
		
		
		
		if($authorPass == true && $titlePass == true && $descriptionPass == true && $articlePass == true && $tagsPass == true){
		
			if ($_POST["id"] != ""){
			
				$id = test_input($_POST["id"]);							
				$SQL = "UPDATE content SET author='$author', lastupdated=CURRENT_TIMESTAMP, title='$title', category='$category', description='$description', thumbnail='$thumbnail', article='$article', tags='$tags' WHERE id = '$id'";	
				$result = mysql_query($SQL);
				
			} else {
				$SQL = "INSERT INTO content (author, created, lastupdated, title, description, thumbnail, category, article, tags ) VALUES ('$author', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'$title','$description','$thumbnail', '$category', '$article','$tags' )";	
				$result = mysql_query($SQL);
				mysql_close($db_handle);
			}
			
			if( $result == 1){
				print '<div class="alert">Success! The article has been saved.</div>';
			}else{
				print '<div class="alert">Sorry something went wrong!</div>';
			}
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
	<?php
		if ($db_found) {

			$SQL = "SELECT * FROM content ORDER BY lastupdated DESC";
			$result = mysql_query($SQL);
			print "<ul>";
			while ( $db_field = mysql_fetch_assoc($result) ) {

				print '<li><span>('.  date('d/m/Y', strtotime($db_field['lastupdated']) ) .')</span> <a href="http://localhost/php/wlabs/pageedit.php?id='.html_entity_decode($db_field['id']).'">'.html_entity_decode($db_field['title']).'</a>';
			}
			print "</ul>";
			mysql_close($db_handle);

		}
	?>
	</div>
	<div class="rightpanel">
		<form method="post" id="formPost" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">

		<button class="submit"> SAVE ARTICLE</button>
			<div class="form-body">
				<input type="hidden" name="id" value="<?php echo htmlentities($id); ?>">
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
				
				<div class="inline left">
					<label for="thumbnail">thumbnail:</label>
					<input type="text" name="thumbnail" value="<?php echo htmlentities($thumbnail); ?>">			
				</div>
				
				<div class="inline right">
					<label for="category">category:</label>
					<input type="hidden" id="category" name="category" value="<?php echo htmlentities($category); ?>">
					<select name="categorydrop" id="categorydrop">
						<option>select a category</option>
						<option value="news">news</option>
						<option value="reviews">reviews</option>
					</select>
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
	
</div>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script>
var description = new TINY.editor.edit('description', {
	id: 'edt-description',
	width: 894,
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
var article = new TINY.editor.edit('article', {
	id: 'edt-article',
	width: 894,
	height: 360,
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


$(function() {


	$('.submit').on('click', function(){
	description.post();
	article.post();
	setTimeout(function(){$( "#formPost" ).submit();}, 800);
});

if( $('#category').val().length > 0 ){

	//$("#categorydrop option[value="+$('#category').val()+"]").index();
	
	$("#categorydrop").val( $('#category').val() );
	

}


$('#categorydrop').on('change', function(e){

	var val = $("#categorydrop option:selected").index() > 0?$(this).val():'';

	$('#category').val( val );

});

});

</script>
</body>
</html>
