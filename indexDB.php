<!DOCTYPE html>
<html>
<body>

<?php
$con=mysqli_connect("localhost","root","","delta");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql="INSERT INTO useraccounts (username, firstname, lastname, age, email, password)
VALUES
('$_POST[username]','$_POST[firstname]','$_POST[lastname]','$_POST[age]','$_POST[email]','$_POST[password]')";

if (!mysqli_query($con,$sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added";

$result = mysqli_query($con,"SELECT * FROM useraccounts ORDER BY joindate");

?>


<form action="indexDB.php" method="post">
User Name: <input type="text" name="username">
First Name: <input type="text" name="firstname">
Last Name: <input type="text" name="lastname">
Age: <input type="text" name="age">
Email: <input type="text" name="email">
Password: <input type="text" name="password">
<input type="submit">
</form>
<br/><br/><br/>
<table border="1" cellpadding="1">
<tr>
	<th>Join Date</th>
	<th>User Name</th>
	<th>First Name</th>
	<th>Last Name</th>
	<th>Age</th>
	<th>E-mail</th>
	<th>Password</th>
</tr>
<?php
while($row = mysqli_fetch_array($result))
  {
  echo "<tr>";
  echo "<td>" . $row['joindate']. "</td>";
  echo "<td>" . $row['username']. "</td>";
  echo "<td>" . $row['firstname']. "</td>";
  echo "<td>" . $row['lastname']. "</td>";
  echo "<td>" . $row['age']. "</td>";
  echo "<td>" . $row['email']. "</td>";
  echo "<td>" . $row['password']. "</td>";
  echo "</tr>";
 }
mysqli_close($con);
?> 
</table>

</body>
</html>