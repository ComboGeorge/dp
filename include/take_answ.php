<?
require_once "../include/connection.php";
$res=array();
$answ_id = $_POST['value'];
$answ_query = mysqli_query($connection, "SELECT * FROM users_answers WHERE group_id='$answ_id'");
while ($row = $answ_query->fetch_assoc()) {
       $res[] = $row;
}
echo json_encode($res);

?>