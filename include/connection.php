<?require("constants_to_connect.php");
	$connection=mysqli_connect($db_hostname, $db_username, $db_password, $db_database) or die(mysqli_error());
?>