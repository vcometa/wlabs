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
	color: #666;
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
	padding: 5px 10px;
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
.toolbar{
	width: 100%;
	background: #333;
}
.delete{
	width: 19%;
	height: 30px;
	cursor: pointer;
	background: red;
	color: #fff;
	border:1px solid #eee;
	border-width: 0 1px 0 0;
	font-weight: bold;
}
.submit{
	width: 61%;
	height: 30px;
	cursor: pointer;
	background: #333;
	color: #fff;
	font-weight: bold;
	text-transform: uppercase;
	border:0;
	margin: 0 auto;
}
.clear{
	width: 19%;
	height: 30px;
	cursor: pointer;
	background: #000;
	color: #fff;
	border:1px solid #eee;
	border-width: 0 0 0 1px;
	font-weight: bold;
}
ul {
	list-style:none;
	margin: 0;
	padding: 0;
}
.leftpanel{
	width:18%;
	height: 900px;
	padding:0;
	float:left;
	background: #fff;
	overflow: hidden;
	border-right: 1px solid #999;
}
.centerpanel{
	width:59.85%;
	padding:0;	
	float:left;
	background: #fff;
	border-right: 1px solid #999;
}
.rightpanel{
	width:22%;
	padding:0;
	height: 100%;
	float:right;
	background: #fff;
	overflow: hidden;
}
.rightpanel ul li{
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
.sectionlist {
	width: 100%;
	padding: 0;
	
}
.sectionheader{
	margin: 0;
	background: #ccc;
	color: #333;
	padding: 5px 10px;
}
.sectionlist .sectionlistbody{
	overflow: auto;	
	width: 100%;
	height: 480px;
}

.rightpanel .sectionlist .sectionlistbody{
	height: 360px;
}
.sectionlist .sectionlistbody td:first-child{
	width: 20%;
}
.sectionlist .sectionlistbody td:first-child span:first-child{
	font-weight: bold;
}
.sectionlist .sectionlistbody td:first-child span:last-child{
	font-size:12px;
}
.sectionlist .sectionlistbody td{
	padding: 5px;
}
.sectionlist .sectionlistbody tr:nth-child(odd){
	background: #eee;
}
.alert{
	position: fixed;
	top: 30%;
	left: 50%;
	background: #eee;
	border: 1px solid #333;
	width: 200px;
	height: 100px;
	margin: -50px 0 0 -100px;
	padding: 20px 40px;
	text-align: center;
}

.alert .close {
	background: #333;
	border: 0 none;
    clear: both;
    color: #fff;
	cursor: pointer;
    display: block;
    font-weight: bold;
    margin: 20px auto 0;
    padding: 5px 10px;
    text-align: center;
}
.tagDelete,
.categoryDelete{
    display:block;
	float:right;
    width:25px; 
	height:25px;
    background:red;
	border: 0;
    text-indent:-999px;
    font-size:0px; 
	line-height:0;
	cursor:pointer;
	margin: 0 10px 0 0;
}
.taglist input[type=checkbox],
.categorylist input[type=radio]{
	float: left;
}
.taglist label,
.categorylist label{
	clear: none;
	margin:0 0 0 5px;
}
.taglist li,
.categorylist li{
	line-height: 18px;
	overflow: hidden;
	clear:both;
}
.addtag,
.addcategory{
	margin: 10px;
}
.addtag input,
.addcategory input {
	border:1px solid #ccc;
	padding: 5px;
}
.addtag input,
.addcategory input{
	border:1px solid #ccc;
	padding: 6px 10px;
	width: 56%;
}
.addtag .tagSubmit,
.addcategory .categorySubmit{
	background: #ccc;
	color: #333;
	font-weight:bold;
	width: 35%;
	padding: 5px 10px;
}
</style>
</head>
<body>

<?php

$passphrase = htmlspecialchars($_GET["pass"]);

if($passphrase == 'src123177'){

// define variables and set to empty values
$authorErr = $titleErr = $descriptionErr = $articleErr = $tagsErr = $categoryErr = "";
$author = $title = $articlename = $description = $article = $tags = $id = $thumbnail = $category = $alertmsg = "";
$user_name = "vcometa_admin";
$delete = false;
$password = "vc0m3t@";
$database = "vcometa_simplecms";
$server = "localhost";
$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database);
$authorPass = $galleryidPass = $titlePass = $descriptionPass = $categoryPass = $articlePass = $tagsPass = false;
date_default_timezone_set('America/New_York');
if ($_GET){
	$id = htmlspecialchars($_GET["id"]);	
	$SQL = "SELECT * FROM content WHERE id='$id'";
	$result = mysql_query($SQL);
	
	while ( $db_field = mysql_fetch_assoc($result) ) {
	
		$author = html_entity_decode($db_field['author']);
		$title = html_entity_decode($db_field['title']);
		$articlename = html_entity_decode($db_field['articlename']);
		$description = html_entity_decode($db_field['description']);
		$thumbnail = html_entity_decode($db_field['thumbnail']);
		$article = html_entity_decode($db_field['article']);
		$tags = html_entity_decode($db_field['tags']);
		$category = html_entity_decode($db_field['category']);
	}
	
}

if ($_SERVER["REQUEST_METHOD"] == "POST"){

	if(empty($_POST["categorySubmit"]) && empty($_POST["categoryDelete"]) && empty($_POST["tagSubmit"]) && empty($_POST["tagDelete"]) ){

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
				
			if($authorPass == true && $titlePass == true && $descriptionPass == true && $articlePass == true && $tagsPass == true){
			
				$articlename = test_input($_POST["articlename"]);
			
				if ($_POST["id"] != ""){
				
					$id = test_input($_POST["id"]);	
					
					if(empty($_POST["delete"])){
						$SQL = "UPDATE content SET author='$author', lastupdated=now(), title='$title', category='$category', description='$description', thumbnail='$thumbnail', article='$article', tags='$tags', articlename='$articlename' WHERE id = '$id'";
					} else {
						$SQL = "DELETE FROM content WHERE id='$id'";
					}			
					$result = mysql_query($SQL);
					
				} else {
					$SQL = "INSERT INTO content (author, created, lastupdated, title, description, thumbnail, category, article, tags, articlename ) VALUES ('$author', now(),now(),'$title','$description','$thumbnail', '$category', '$article','$tags', '$articlename' )";	
					$result = mysql_query($SQL);
					mysql_close($db_handle);
				}
				
				if( $result == 1){
					if(empty($_POST["delete"])){
						$alertmsg = 'The article has been succesfully saved!';
					}else{
						$alertmsg = 'The article has been deleted.';
					}
				}else{
					$alertmsg = 'An error has occurred upon submission!';
				}
				
				print '<div class="alert">'.$alertmsg.' <button class="close">close</button></div>';
			}
		}else{
			print "Database NOT Found " . $db_handle;
			mysql_close($db_handle);
		}	
	
	} else if( !empty($_POST["categoryDelete"])){
	
		$cid = test_input($_POST["categoryDelete"]);
		if($db_found){	
			$SQL = "DELETE FROM categories WHERE id='$cid'";
			$result = mysql_query($SQL);
			mysql_close($db_handle);
			
			print '<div class="alert">The category has been successfully deleted. <button class="close">close</button></div>';
		}
	
	} else if(!empty($_POST["categorySubmit"])) {
	
		$newcategory = $newcategoryErr = "";
		$newcategoryPass = false;
	
		if(empty($_POST["newcategory"])){		
			$newcategoryErr = "Category is required";
			$newcategoryPass = false;
		}else{
			$newcategory = test_input($_POST["newcategory"]);
			$newcategoryPass = true;
		}
		
		if($db_found){		
			if($newcategoryPass){			
				$SQL = "INSERT INTO categories (category) VALUES ('$newcategory' )";	
				$result = mysql_query($SQL);
				mysql_close($db_handle);
				
				print '<div class="alert">A new category has been added. <button class="close">close</button></div>';
			}		
		}
	
	}else if(!empty($_POST["tagSubmit"])) {
	
		$newtag = $newtagErr = "";
		$newtagPass = false;
	
		if(empty($_POST["newtag"])){		
			$newtagErr = "Tag is required";
			$newtagPass = false;
		}else{
			$newtag = test_input($_POST["newtag"]);
			$newtagPass = true;
		}
		
		if($db_found){		
			if($newtagPass){			
				$SQL = "INSERT INTO tags (tag) VALUES ('$newtag' )";	
				$result = mysql_query($SQL);
				mysql_close($db_handle);
				
				print '<div class="alert">A new tag has been added. <button class="close">close</button></div>';
			}		
		}
	
	} else if( !empty($_POST["tagDelete"])){
	
		$tid = test_input($_POST["tagDelete"]);
		if($db_found){	
			$SQL = "DELETE FROM tags WHERE id='$tid'";
			$result = mysql_query($SQL);
			mysql_close($db_handle);
			
			print '<div class="alert">The tag has been successfully deleted. <button class="close">close</button></div>';
		}
	
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
		<div class="sectionlist">
			<h3 class="sectionheader">Article Listing</h3>
			<div class="sectionlistbody">
			<?php
				$db_handle = mysql_connect($server, $user_name, $password);
				$db_found = mysql_select_db($database);
				if ($db_found) {

					$SQL = "SELECT * FROM content ORDER BY lastupdated DESC";
					$result = mysql_query($SQL);
					print "<table>";
					while ( $db_field = mysql_fetch_assoc($result) ) {

						print '<tr><td><span>'. date('d-m-Y', strtotime($db_field['lastupdated']) ) .'</span><span>'.date('h:m', strtotime($db_field['lastupdated']) ).'</span></td> <td><a href="pageedit.php?pass='.$passphrase.'&id='.html_entity_decode($db_field['id']).'">'.html_entity_decode($db_field['title']).'</a></td></tr>';
					}
					print "</table>";
					mysql_close($db_handle);

				}
			?>
			</div>
		</div>
	</div>
	<div class="centerpanel">
		<form method="post" id="formPost" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">

		<div class="toolbar">
			<button class="delete"> DELETE</button>
			<button class="submit"> SAVE ARTICLE</button>	
			<button class="clear"> CLEAR</button>			
		</div>
		<div class="form-body">
			<input type="hidden" name="id" value="<?php echo htmlentities($id); ?>">
			<input type="hidden" id="delete" name="delete" value="">
			<div class="full">
				<label for="title">title<span class="error">*</span>:</label> <span class="error"><?php echo $titleErr;?></span>
				<input type="text" name="title" id="title" value="<?php echo htmlentities($title); ?>">
				<input type="hidden" name="articlename" id="articlename" value="<?php echo htmlentities($articlename); ?>">					
			</div>
			<div class="inline left">
				<label for="author">author<span class="error">*</span>:</label> <span class="error"><?php echo $authorErr;?></span>
				<input type="text" name="author" value="<?php echo htmlentities($author); ?>">			
			</div>
						
			<div class="inline left">
				<label for="thumbnail">thumbnail:</label>
				<input type="text" name="thumbnail" value="<?php echo htmlentities($thumbnail); ?>">			
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
			<input type="hidden" id="category" name="category" value="<?php echo htmlentities($category); ?>">
			<input type="text" id="tags" name="tags" value="<?php echo htmlentities($tags); ?>">
		</div>
		
		
	</div>
	<div class="rightpanel">
		<div class="sectionlist">
			<h3 class="sectionheader">Select a category <span class="error">*</span> <span class="error"><?php echo $categoryErr?></span></h3>
			
			<div class="addcategory">
			<form method="post" id="formCategory" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
				<input type="text" name="newcategory" value="">
				<input type="submit" name="categorySubmit" class="categorySubmit" value="Add A Category">			
			</div>
			<div class="sectionlistbody">
			
			<?php
				$db_handle = mysql_connect($server, $user_name, $password);
				$db_found = mysql_select_db($database);
				if ($db_found) {

					$SQL = "SELECT * FROM categories ORDER BY category ASC";
					$result = mysql_query($SQL);
					print "<ul class='categorylist'>";
					while ( $db_field = mysql_fetch_assoc($result) ) {

						print '<li><input type="radio" name="categorylist" id="category'.$db_field['id'].'" value="'.$db_field['category'].'"> <label for="category'.$db_field['id'].'">'.$db_field['category'].'</label> <input type="submit" name="categoryDelete" class="categoryDelete" value="'.$db_field['id'].'"></li>';
					}
					print "</ul>";
					mysql_close($db_handle);

				}
			?></form>
			</div>
			
		</div>
		
		<div class="sectionlist">
			<h3 class="sectionheader">Select Tags <span class="error">*</span> <span class="error"><?php echo $tagsErr?></span></h3>
			
			<div class="addtag">
			<form method="post" id="formTags" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
				<input type="text" name="newtag" value="">
				<input type="submit" name="tagSubmit" class="tagSubmit" value="Add A Tag">			
			</div>
			<div class="sectionlistbody">
				
			
			<?php
				$db_handle = mysql_connect($server, $user_name, $password);
				$db_found = mysql_select_db($database);
				if ($db_found) {

					$SQL = "SELECT * FROM tags";
					$result = mysql_query($SQL);
					print "<ul class='taglist'>";
					while ( $db_field = mysql_fetch_assoc($result) ) {

						print '<li><input type="checkbox" name="taglist" id="tag'.$db_field['id'].'" value="'.$db_field['tag'].'"> <label for="tag'.$db_field['id'].'">'.$db_field['tag'].'</label> <input type="submit" name="tagDelete" class="tagDelete" value="'.$db_field['id'].'"></li>';
					}
					print "</ul>";
					mysql_close($db_handle);

				}
			}?></form>
			</div>
			
		</div>
	</div>
	</form>
</div>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script>
var description = new TINY.editor.edit('description', {
	id: 'edt-description',
	width: 970,
	height: 60,
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
	width: 970,
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

	function clearInputs(){
	
		$( "#formPost input" ).val('');
		$( "#formPost select" )[0].selectedIndex = 0;
		$( "#formPost textarea" ).text('');
		$('#formPost iframe').contents().find('body').html('');
	}	

	$('.delete').on('click', function(){
		var d = confirm('Are you sure you want to delete this article?');
		if(d){
			$('#delete').val('true');
			setTimeout(function(){$( "#formPost" ).submit();clearInputs();}, 800);
		}
		return false;
	});	
	
	$('.clear').on('click', function(){
		clearInputs();
		return false;
	});	
	
	$('.alert .close').on('click', function(){	
		$($(this).parent()).hide();
		clearInputs();
	});


	$('.submit').on('click', function(){
		description.post();
		article.post();
		setTimeout(function(){$( "#formPost" ).submit();}, 800);
	});

	if( $('#category').val().length > 0 ){
		
		var $radios = $('input:radio[name=categorylist]');
		if($radios.is(':checked') === false) {
			$radios.filter('[value='+$('#category').val()+']').prop('checked', true);
		}

	}
	
	$( ".categorylist input:radio" ).on('click', function(){
	
		$('#category').val( $('input[name=categorylist]:checked').val() );
		
	});
	
	$('#title').on('keyup change',function(){
		var str = $(this).val().toLowerCase();
			str = str.replace(/[^a-z0-9\s]/gi, '').replace(/[-\s]/g, '_').replace(/ /g, '_');
		$('#articlename').val(str);
	});
	
	
	function updateCategoryDropdown(){
		$('.categorylist li').each(function(){
			var li = $(this);
			$('#categorydrop').append('<option>'+li.text()+'</option>');
		});
	}

	updateCategoryDropdown();

	$('#categorydrop').on('change', function(e){

		var val = $("#categorydrop option:selected").index() > 0?$(this).val():'';

		$('#category').val( val );

	});
	
	$( ".taglist input:checkbox" ).on('click', function(){
	
		var delim = ($('#tags').val().length==0)?'':', ';
		
		if( $(this)[0].checked ){
	
			$('#tags').val( $('#tags').val()+delim+ $(this).val() );
		
		} else {
		
			$('#tags').val($('#tags').val().replace(delim+$(this).val(),''));
		
		}
		
	});

});

</script>
</body>
</html>
