<?php 
if(isset($_SESSION["user"])){
    unset($_SESSION["user"]);
    unset($_SESSION["role"]);



}

?><!DOCTYPE html>
<html>

<head>
       <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link rel="stylesheet" href="login.css">
</head>



<div class="wrapper fadeInDown">
    <div id="formContent">
        <!-- Tabs Titles -->

        <!-- Icon -->
        <div>
            <img src="fgdlogo.png" id="icon" alt="User Icon" />
        </div>

        <!-- Login Form -->
        <h1>Plans hors système </h1>
        <form action="" method="POST">
            <input type="text" id="login" class="fadeIn second" name="UName" placeholder="login">
            <!-- <input type="text" id="password" class="fadeIn third" name="Password" placeholder="password"> -->
            
            <input type="password" id="password" class="third" name="Password" placeholder="password">
            <input type="submit" name="Login" class="fadeIn fourth" value="Log In">
        </form>

        <!-- Remind Passowrd -->

    </div>
</div>











<?php 
require_once('config.php');
$UName=$_POST['UName'];
$Password=$_POST['Password'];






$ini = parse_ini_file('conf.ini');
$salt=$ini['salt'];  


session_start();
$_SESSION["UName"] = $UName;
$sql="select * from compteUser where UName like '$UName' and active=1 ";
            // $result=sqlsrv_query($conn,$sql);
            //  while($rows=sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC))
            // { 
            // $changed=$rows['changed']; 
            // $_SESSION["canal"] = $rows['type'];
            // }

            // if ($changed==1 or $changed==100) {
            //      header("location:/dash/changepwd.php?Empty=1");
            // }
            // else{

               


    if(isset($_POST['Login']))
    {
      
      

       
       if(empty($_POST['UName']) || empty($_POST['Password']))
       {
            header("location:/dash/login.php?Empty= Please Fill in the Blanks");
       }
       else
       {
            $query="select * from compteUser where UName like '$UName' and active=1 ";
            $stmt=sqlsrv_query($conn,$query);
            if( $stmt === false) {
                                      die( print_r( sqlsrv_errors(), true) );
                                  }


            while($row=sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC))
            { 


                
            
                // if($row['UName']==$UName && md5($salt.$Password) == $row['Password']  && $row['type']=='admin')
                // {
                    if($row['UName']==$UName && md5($salt.$Password) == $row['Password'] )
                    {
$sql="Update compteUser set lastLogin=getdate() where UName like '$UName' and active=1 ";
$result=sqlsrv_query($conn,$sql);
if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}

$browser=$_SERVER['HTTP_USER_AGENT']; 
$date=date("Y-m-d H:i:s");
$myfile = fopen("/glpi/logConnexion.txt", "a");
$txt ="-L'utilisateur: ".$UName."  s'est connecté à l'application Master Data.". PHP_EOL;
fwrite($myfile, $txt);
$txt = "details: type : ".$row['type']." , IP:".$ip." , browser: ".$browser.", Date: ".$date." ". PHP_EOL;
fwrite($myfile, $txt);
fclose($myfile);
session_start(); 
$_SESSION['user'] = $row['UName'];
$_SESSION['role'] = $row['type'];
$_SESSION['menus'] = 'Menu principal';
                  // header("Location:/planshorsys/menus/menu.php");

                   header("Location:/planshorsys/menus/parametrage.php");

                } 

//                 elseif($row['UName']==$UName && md5($salt.$Password) == $row['Password']  && $row['type']=='user')
//                      { $sql="Update compteUser set lastLogin=getdate() where UName like '$UName' and active=1 ";
//             $result=sqlsrv_query($conn,$sql);
// if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
//     $ip = $_SERVER['HTTP_CLIENT_IP'];
// } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
//     $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
// } else {
//     $ip = $_SERVER['REMOTE_ADDR'];
// }

// $browser=$_SERVER['HTTP_USER_AGENT']; 
// $date=date("Y-m-d H:i:s");
// $myfile = fopen("/hors/logConnexion.txt", "a");
// $txt ="-L'utilisateur: ".$UName."  s'est connecté à l'application Master Data.". PHP_EOL;
// fwrite($myfile, $txt);
// $txt = "details: type : ".$row['type']." , IP:".$ip." , browser: ".$browser.", Date: ".$date." ". PHP_EOL;
// fwrite($myfile, $txt);
// fclose($myfile);
// session_start(); 
// $_SESSION['user'] = $row['UName'];
// $_SESSION['role'] = $row['type'];
//                  header("Location:/planshorsys/menu.php");
//                      }
                    else { 

                      echo '<script language="javascript">';
        echo 'alert("Password incorrect !");history.back()';
        echo '</script>';}


                 }

             }


}



// }
?>