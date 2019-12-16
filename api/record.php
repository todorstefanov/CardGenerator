<?php
session_start();
	$session['phpsessionid'] = session_id();
	$servername = "localhost";
	$username = "cardgen";
	$password = "0ww7stZ6LEpA3WOW";
	$dbname = "cardgen";
	$body = file_get_contents("php://input");
	$json = json_decode(json_encode($body), true);
	$merge = array_merge(json_decode($json, true), $_SERVER, $session);
	$sqlkeys = implode(', ', array_keys($merge));
	$sqlvalues = implode("', '", array_values($merge));


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "INSERT INTO data ($sqlkeys) VALUES  ('$sqlvalues')";

if (!mysqli_query($conn,$sql)) {
  die('Error: ' . mysqli_error($conn));
}
echo "1 record added".$sqlkeys ;

mysqli_close($conn);
 ?>
