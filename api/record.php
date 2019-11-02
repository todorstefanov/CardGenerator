<?php
session_start();
require_once('credenials.php');
	$session['phpsessionid'] = session_id();
	$body = file_get_contents("php://input");
	$json = json_decode(json_encode($body), true);
	$merge = array_merge(json_decode($json, true), $_SERVER, $session);
	$sqlkeys = implode(', ', array_keys($merge));
	$sqlvalues =implode("', '", array_values($merge));


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
echo "1 record added";

mysqli_close($conn);
 ?>
