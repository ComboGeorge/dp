<?
//Подключение к БД
require_once "../include/connection.php";

//Получение переменных
$group_id = $_POST['value'];

$group_query = mysqli_query($connection, "SELECT * FROM groups WHERE id_group='$group_id'");
$group_query_row=mysqli_fetch_assoc($group_query);
echo "<table class='table table-bordered table-hover table-sm mt-5 mb-5'>".
            "<thead>".
                "<tr class='thead-dark'><th colspan='26'>".$group_query_row["group_title"]."</th></tr>".
            "</thead><tbody>";
        
$answ_query = mysqli_query($connection, "SELECT * FROM users_answers WHERE group_id='$group_id'");
$answ_query_row=mysqli_fetch_assoc($answ_query);
for ($z=1; $z<=mysqli_num_rows($answ_query); $z++){
    $answers_array = $answ_query_row["answers"];
    
    //line 1
    
    echo "<tr><th>№ вопроса</th>";
    for($i=0; $i<25; $i++){
        $a=$i+1;
        echo "<th>".$a."</th>";
    }
    echo "</tr>"; 
    
    
    echo "<tr><th>Студент ".$z."</th>";
    for($i=0; $i<25; $i++){
        $a=$i+1;
        echo "<td>";
        if($answers_array[$i]==1){
            echo "Да";
        } else {
            echo "Нет";
        };
        echo"</td>";
    }
    echo "</tr>";
    
    //line 2
    
    echo "<tr><th>№ вопроса</th>";
    for($i=25; $i<50; $i++){
        $a=$i+1;
        echo "<th>".$a."</th>";
    }
    
    echo "</tr>";
    
    echo "<tr><th>Студент ".$z."</th>";
    for($i=25; $i<50; $i++){
        $a=$i+1;
        echo "<td>";
        if($answers_array[$i]==1){
            echo "Да";
        } else {
            echo "Нет";
        };
        echo"</td>";
    }
    echo "</tr>";   
    
    //line 3
    
     echo "<tr><th>№ вопроса</th>";
    for($i=50; $i<strlen($answers_array); $i++){
        $a=$i+1;
        echo "<th>".$a."</th>";
    }
    
    echo "</tr>";
    
    echo "<tr><th>Студент ".$z."</th>";
    for($i=50; $i<strlen($answers_array); $i++){
        $a=$i+1;
        echo "<td>";
        if($answers_array[$i]==1){
            echo "Да";
        } else {
            echo "Нет";
        };
        echo"</td>";
    }
    echo "</tr>";  
        
    }
echo "</tbody></table>";
?>