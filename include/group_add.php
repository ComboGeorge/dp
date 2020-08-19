<?
//Подключение к БД
require_once "../include/connection.php";

//Получение переменных
$group_title = $_POST['enter_group'];

//удаление пробелов, экранированных символов, Html тэгов, проверка на валидность
function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);
    return $value;
}

$group_title=clean($group_title);

//Проверка на пустые переменные и повторы и добавление в бд
if(!empty($group_title)){
    $duplicate_check=mysqli_query($connection, "SELECT * FROM groups");
    $flag=0;
    while ($duplicate_checkRow=mysqli_fetch_assoc($duplicate_check)){
        if($duplicate_checkRow["group_title"]==$group_title){
           $flag=$flag+1; 
        }
    };
    if($flag==0){
        $group_add_query = mysqli_query($connection, "INSERT INTO groups(id_group,group_title) VALUES('NULL','$group_title')");
    } else{echo "<script>alert('Такая группа уже в базе данных!');</script>";}
} else {echo "<script>alert('Введите группу!');</script>";};


//извлечение записей
$selectGroupsUPD=mysqli_query($connection, "SELECT * FROM groups ORDER BY group_title ASC");
while ($selectGroupsUPD_row=mysqli_fetch_assoc($selectGroupsUPD)){
    echo "<tr scope='row' id=".$selectGroupsUPD_row["id_group"].">".
        "<td>".$selectGroupsUPD_row["group_title"]."</td>".
        "<td class='delete_btn'></td>".
        "</tr>";
    }
?>