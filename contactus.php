 <!DOCTYPE HTML>
<html>
<head>
<title>Pinstacular.com - Contact Us</title>
<?PHP include ("includes/css.php"); ?>
</head>
<body class="contact">
	<div class="page">
	<?PHP include ("includes/header.php"); ?>
	<div class="content centered">
	
	<div class="left-rail">
	
	<h1>Contact Us</h1>
	
	<?php
		 
		if(isset($_POST['email'])) {
		 
			// EDIT THE 2 LINES BELOW AS REQUIRED
		 
			$email_to = "info@pinstacular.com";
		 
			$email_subject = "Contact us at Pinstacular";
			
			$error_check = false;
		 
			function success($err) {
		 
				// your error code can go here
				if($err == true) {
					
					echo "<p>We're sorry but the form seems to contain some errors.</p>";
					
				}else{
		 
					echo "<p>Thank you for contacting us. We will be in touch with you very soon.</p>";
					die();				
				}
				$error_check = false;
		 
			}
		 
			// validation expected data exists
		 
			if(!isset($_POST['first_name']) ||
		 
				!isset($_POST['last_name']) ||
		 
				!isset($_POST['email']) ||
		 
				!isset($_POST['telephone']) ||
		 
				!isset($_POST['comments'])) {
		 
				success('We are sorry, but there appears to be a problem with the form you submitted.');      
		 
			}
		 
			$first_name = $_POST['first_name']; // required
		 
			$last_name = $_POST['last_name']; // required
		 
			$email_from = $_POST['email']; // required
		 
			$telephone = $_POST['telephone']; // not required
		 
			$comments = $_POST['comments']; // required
		 
			$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
		 
		  if(!preg_match($email_exp,$email_from)) {
		 
			$error_email = 'The Email Address you entered does not appear to be valid.<br />';
			
			$error_check = true;
		 
		  }else{
			$error_check = false;
		  }
		 
			$string_exp = "/^[A-Za-z .'-]+$/";
		 
		  if(!preg_match($string_exp,$first_name)) {
		 
			$error_first_name = 'The First Name you entered does not appear to be valid.<br />';
			$error_check = true;
		  }else{
			$error_check = false;
		  }
		 
		  if(!preg_match($string_exp,$last_name)) {
		 
			$error_last_name = 'The Last Name you entered does not appear to be valid.<br />';
			$error_check = true;
		  }else{
			$error_check = false;
		  }
		 
		  if(strlen($comments) < 2) {
		 
			$error_comments.= 'The Comments you entered do not appear to be valid.<br />';
			$error_check = true;
		  }else{
			$error_check = false;
		  }
		 
		 $email_message = "Form details below.\n\n";
		 
			function clean_string($string) {
		 
			  $bad = array("content-type","bcc:","to:","cc:","href");
		 
			  return str_replace($bad,"",$string);
		 
			}
		 
			$email_message .= "First Name: ".clean_string($first_name)."\n";
		 
			$email_message .= "Last Name: ".clean_string($last_name)."\n";
		 
			$email_message .= "Email: ".clean_string($email_from)."\n";
		 
			$email_message .= "Telephone: ".clean_string($telephone)."\n";
		 
			$email_message .= "Comments: ".clean_string($comments)."\n";
		 
		// create email headers
		 
			$headers = 'From: '.$email_from."\r\n".
			 
			'Reply-To: '.$email_from."\r\n" .
			 
			'X-Mailer: PHP/' . phpversion();
			 
			@mail($email_to, $email_subject, $email_message, $headers); 
			
		
			success($error_check);
		}
		 
		?>
		
		<form name="contactform" method="post" action="contactus.php">
		
				<ul class="contact-body">
					<li>
						<label for="first_name">First Name<sup>*</sup> <div class="error"><?php echo $error_first_name?></div></label>
						<input  type="text" name="first_name" maxlength="50" size="30">
						
					</li>
					<li>
						<label for="last_name">Last Name<sup>*</sup> <div class="error"><?php echo $error_last_name?></div></label>
						<input  type="text" name="last_name" maxlength="50" size="30">						
					</li>
					<li>
						<label for="email">Email Address<sup>*</sup> <div class="error"><?php echo $error_email?></div></label>
						<input  type="text" name="email" maxlength="80" size="30">
						
					</li>
					<li>
						<label for="telephone">Telephone Number</label>
						<input  type="text" name="telephone" maxlength="30" size="30">
					</li>
					<li>
						<label for="comments">Comments<sup>*</sup> <div class="error"><?php echo $error_comments?></div></label>
						<textarea  name="comments" maxlength="1000"></textarea>
						
					</li>
					<li>
						<input type="submit" value="Submit" class="submit-btn"> 
					</li>
				</ul>
		 
		</form>
		
		</div>
		<div class="right-rail">
			<div class="bigbox">
			
				<iframe src="http://rcm-na.amazon-adsystem.com/e/cm?t=pinstacularco-20&o=15&p=12&l=ur1&category=amazonhomepage&f=ifr" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>

			</div>
			<h3>Featured Articles</h3>
			<?PHP include ("includes/feature.php"); ?>
			<div class="bigbox">
				<iframe src="http://rcm-na.amazon-adsystem.com/e/cm?t=pinstacularco-20&o=15&p=12&l=ur1&category=dealsstore&banner=1VSBTE74K842BYNBX182&f=ifr" width="300" height="250" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>
			</div>
		</div>
		<?PHP include ("includes/taglist.php"); ?>
		
	</div>
	<?PHP include ("includes/footer.php"); ?>
	</div>
	<?PHP include ("includes/javascript.php"); ?>
</body>
</html>