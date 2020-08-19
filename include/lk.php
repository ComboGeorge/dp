<?session_start();
if(!isset($_SESSION["session_username"])):
header("location: ../index.php");
else:?>
<?require_once("connection.php"); 
    include("header.php"); 
	
    $take_tests=mysqli_query($connection, "SELECT * FROM test_title");
    $take_groups_for_table=mysqli_query($connection, "SELECT * FROM groups ORDER BY group_title ASC");
    $checkbox=mysqli_query($connection, "SELECT * FROM groups ORDER BY group_title ASC");
?>
<section class="container width_percent">
    <div class="row width_px">
        <div class="col-12 header ">
            <h1>Просмотр статистики</h1>
            <a class="lk" href="logout.php">Выход</a>
        </div>
    </div>
    <div class="row">
        <div class="col-4 offset-5 for_right">
            <details class="details">
                <summary>Добавить группу</summary>
                <form action="" method="post" class="form-inline" id="group_form">
                    <div class="form-group mt-3 mb-3 ml-4">
                        <input class="form-control btn-block" type="text" placeholder="Введите группу" name="enter_group" id="enter_group">
                    </div>
                    <div class="form-group mt-3 mb-3 ml-4">
                        <button type="button" class="btn btn-primary btn-block add_group" name="add_group">Добавить</button>
                    </div>
                </form>
                <table class="table table-bordered table-hover table-sm" id="group_res">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Группа</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?
                            while ($group_table=mysqli_fetch_assoc($take_groups_for_table)){
                            echo "<tr scope='row' id=".$group_table["id_group"].">".
                                "<td>".$group_table["group_title"]."</td>".
                                "<td class='delete_btn'></td>".
                                "</tr>";
                            }
                        ?>
                    </tbody>
                </table>
            </details>
        </div>
    </div>
    <h2 class="h2">Выберите группы</h2>
    <div class="row">
        <div class="col-6 offset-5">
            
            <div class="mt-3 checkboxes">
                <?
                while ($checkbox_row=mysqli_fetch_assoc($checkbox)){
                    $count_query=mysqli_query($connection, "SELECT * FROM users_answers WHERE group_id=".$checkbox_row['id_group']);
                    $numrows = mysqli_num_rows($count_query);
                    echo "<div class='form-check'>".
                            "<input class='form-check-input' type='checkbox' value=".$checkbox_row["id_group"]." group_id=".$checkbox_row["id_group"].">".
                            "<label class='form-check-label' value=".$checkbox_row["group_title"]." for=".$checkbox_row["id_group"].">".$checkbox_row["group_title"]." (".$numrows.")</label>".
                         "</div>";
                }
                ?>
                <button type="button" class="mt-3 btn btn-primary show_charts" id="show_charts">Отобразить</button>
            </div>
        </div>
    </div>
    <div class="row">
            <div class="col-12 tables mt-5 mb-5">   
            </div>
    </div>
    <div class="row">
        <div class="charts" style="width:97%;">
        </div>
    </div>
    <div class="col-12 footer">
            <h1>2020</h1>
        </div>
</section>
<?mysqli_close($connection);?>
<script src="../distr/jquery-3.5.0.min"></script>
<script src="../distr/bootstrap-4.4.1-dist/js/bootstrap.min.js"></script>
<script src="../distr/Chart.js"></script>
<script src="../distr/jspdf.min.js"></script>
<script src="../script/script_lk.js"></script>
</body>
</html>
<? endif; ?>