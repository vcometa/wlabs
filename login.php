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
$nameErr = $pwdErr = $emailErr = "";
$name = $pwd = $email = "";
$user_name = "root";
$password = "";
$database = "test";
$server = "127.0.0.1";
$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database);
$name_pass = $pwd_pass = $email_pass = false;

if ($_SERVER["REQUEST_METHOD"] == "POST"){

	if(empty($_POST["username"])){
		$name_pass = false;
		$nameErr = "Username is required";
	}else{
		$name = test_input($_POST["username"]);
		// check if name only contains letters and whitespace
		if (!preg_match("/^[a-zA-Z ]*$/",$name)){
			$nameErr = "Only letters and white space allowed";
			$name_pass = false;
		}else{		
			$name_pass = true;		
		}
	}

	if(empty($_POST["password"])){
		$pwdErr = "Password is required";
		$pwd_pass = false;
	}else{
		$pwd = test_input($_POST["password"]);
	
		$uppercase = preg_match('@[A-Z]@', $pwd);
		$lowercase = preg_match('@[a-z]@', $pwd);
		$number    = preg_match('@[0-9]@', $pwd);
		
		if(!$uppercase || !$lowercase || !$number || strlen($pwd) < 8) {
		  $pwdErr = "Password is invalid";
		  $pwd_pass = false;
		}else{
			$pwd_pass = true;		
		}
		
	}  

	if(empty($_POST["email"])){
		$emailErr = "Email is required";
		$email_pass = false;
	}else{
		$email = test_input($_POST["email"]);
		// check if e-mail address syntax is valid
		if(!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)){
			$emailErr = "Invalid email format";
			$email_pass = false;
		}else{
			$email_pass = true;
		}
	}	

	if($db_found){
		if($name_pass == true && $email_pass == true && $pwd_pass == true){
			$name = mysql_real_escape_string($name, $db_handle);
			$SQL = "INSERT INTO users (username, password, email) VALUES ('$name', '$pwd', '$email')";	
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

<p><span class="error">* required field.</span></p>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
Username: <input type="text" name="username">
<span class="error">* <?php echo $nameErr;?></span>
<br><br>
Password: <input type="password" name="password">
<span class="error">* <?php echo $pwdErr;?></span>
 E-mail: <input type="text" name="email">
<span class="error">* <?php echo $emailErr;?></span>
<input type="submit" name="submit" value="Submit">
</form>


</body>
</html>
