<?
//Подключение к БД
require_once "../include/connection.php";

//Получение переменных
$on_delete = $_POST['del_id'];

//Запрос на удаление
$group_del_query=mysqli_query($connection, "DELETE FROM groups WHERE id_group='$on_delete'");

$selectGroupsUPD=mysqli_query($connection, "SELECT * FROM groups ORDER BY group_title ASC");
while ($selectGroupsUPD_row=mysqli_fetch_assoc($selectGroupsUPD)){
    echo "<tr scope='row' id=".$selectGroupsUPD_row["id_group"].">".
        "<td>".$selectGroupsUPD_row["group_title"]."</td>".
        "<td class='delete_btn'></td>".
        "</tr>";
    }
