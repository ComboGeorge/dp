<?session_start();?>
<?require_once("include/connection.php");  
	if(isset($_SESSION["session_username"])){
	header("Location: ../include/lk.php");
	}
	if(isset($_POST["enter_lk"])){
		if(!empty($_POST['username']) && !empty($_POST['password'])) {
		$username=($_POST['username']);
		$password=($_POST['password']);
		$mdpassword=md5($password);

		$query =mysqli_query($connection, "SELECT * FROM users WHERE username='$username' AND password='$mdpassword'");
		$numrows=mysqli_num_rows($query);
		if($numrows!=0)
		{
			while($row=mysqli_fetch_assoc($query))
			{
				$db_username=$row['username'];
				$db_password=$row['password'];
			}
			if($username == $db_username && $mdpassword==$db_password)
			{
				$_SESSION['session_username']=$username;	 
				header("Location: ../include/lk.php");
			}
		} else {
			echo "<script>alert('Неверное имя пользователя или пароль');</script>";
		}
	}
	}
    
//    $username= '';
//    $password = '';
//    $mdpassword=md5($password);
//    $query =mysqli_query($connection, "INSERT INTO users (id_user,username,password) values ('NULL','$username','$mdpassword')");
    $take_tests=mysqli_query($connection, "SELECT * FROM test_title");
    include("include/header.php");
?>
<section class="container">
    <div class="row">
        <div class="col-4 offset-4">
            <form method="POST" action="test.php">
                <h1 class="main_title">Тестирование по психологии</h1>
                <h2 class="test_title">Личностный опросник</h2>
                <input class="btn btn-outline-primary btn-block begin_btn mt-5" type="submit" value="Начать тестирование" name="begin_test">
            </form>
        </div>
        <div class="col-2 offset-2 lk">
            <p href="../include/lk.php" id="teacher">Преподаватель</p>
            <div class="enter_form">
                <form method="POST" action="">
                    <div class="form-group">
                        <input type="text" class="form-control-sm" placeholder="Логин" name="username">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control-sm" name="password" placeholder="Пароль">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block" name="enter_lk">Войти</button>
                </form>
            </div>
        </div>
    </div>
</section>
<?mysqli_close($connection);?>
<script src="../distr/jquery-3.5.0.min"></script>
<script src="../distr/bootstrap-4.4.1-dist/js/bootstrap.min.js"></script>
<script src="../script/script_login.js"></script>
</body>
</html>