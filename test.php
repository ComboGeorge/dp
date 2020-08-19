<?
    include("include/connection.php");
    $take_questions=mysqli_query($connection, "SELECT * FROM questions WHERE test_id=1");  //поменять test_id
    $question_count = mysqli_num_rows($take_questions);
    $answ_array = array();
    $test_id=1;
    if(isset($_POST["send_answers"]) && isset($_POST["select_group"])){
        foreach ($_POST as $key => $value) {
            array_push($answ_array, $value);
        }
        $last_elem = array_pop($answ_array);
        $last_elem = array_pop($answ_array);
        $answ_string = implode($answ_array);
        $group_id=$_POST['select_group'];
        $addanswers = mysqli_query($connection, "INSERT INTO users_answers(id,group_id,test_id,answers) VALUES('NULL','$group_id','$test_id','$answ_string')");
        header("location: index.php");
    }
    include("include/header.php");
?>
<section class="container">
	<div class="row justify-content-center">
        <div class="col-8 main-slider">
            <div class="navigation">
            </div>
            <div class="slider">
                <form method="POST" action="" name="load_answers">
                   <?
                    while ($questions_array=mysqli_fetch_assoc($take_questions)){
                        echo "<div class='slide'>
                                <p class='questions'>".$questions_array["question_text"]."</p>
                                <div class='answer_div'>";
                                $take_answers=mysqli_query($connection, "SELECT * FROM answers WHERE test_id=1 ORDER BY answer_text ASC"); //поменять test_id
                                while ($answers_array=mysqli_fetch_assoc($take_answers)){
                                echo "<input type='radio' class='radiobtn' name='".$questions_array["id_question"]."' value='".$answers_array["id_answer"]."' class='answer'>
                                <label class='labels' for='".$questions_array["id_question"]."'>".$answers_array["answer_text"]."</label><br>";
                                };
                            echo "</div></div>";
                    }
                ?>
                    <div class="slide">
                        <div class="col-6 offset-6 select_div">
                            <label class="title_label">Выберите группу</label>
                            <select class="form-control select_group" name="select_group" id="select_group">
                                <option disabled selected>---</option>
                                <?
                                $take_groups=mysqli_query($connection, "SELECT * FROM groups ORDER BY group_title ASC");
                                while ($group_array=mysqli_fetch_assoc($take_groups)){
                                    echo "<option value='".$group_array["id_group"]."'>".$group_array["group_title"]."</option>";
                                }
                                ?>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary send_answers_button" name="send_answers" id="send_answers" disabled>Завершить тестирование</button>
                    </div>
                </form>   
            <button type="button" class="btn btn-info prev-button">Предыдущий вопрос</button>
            <button type="button" class="btn btn-info next-button">Следующий вопрос</button>
            
            
              
        </div>
    </div>
</section>

<?mysqli_close($connection);?>
<script src="../distr/jquery-3.5.0.min"></script>
<script src="../distr/bootstrap-4.4.1-dist/js/bootstrap.min.js"></script>
<script src="../script/slider.js"></script>
<!-- <script src="../script/script_main.js"></script> -->
</body>
</html>