<link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
<?php


// $nature=$_GET['nat'];
if (isset($_SESSION['SomeVar'])) {
    $nature=$_SESSION['SomeVar'];
}else{
    $nature='';
}

$user=$_SESSION['user'] ;
$role=$_SESSION['role'];
// echo $role;

    if ($nature=='parametrage') {
        $classParam='nav-item nav-link active';
    } else {
        $classParam='nav-item nav-link';
    }
    

    if ($nature=='upload') {
        $classUpload='nav-item nav-link active';
    } else {
        $classUpload='nav-item nav-link';
    }

    if ($nature=='download') {
        $classTelechargement='nav-item nav-link active';
    } else {
        $classTelechargement='nav-item nav-link';
    }

    if ($nature=='modif') {
        $classModification='nav-item nav-link active';
    } else {
        $classModification='nav-item nav-link';
    }


    if ($nature=='lancement') {
        $classLancement='nav-item nav-link active';
    } else {
        $classLancement='nav-item nav-link';
    }




?>


<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Plans hors système</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
    <?php 
if ($role=='admin' || $role=='user') {
    ?>
    <a class="<?php echo $classParam ?>" href="parametrage.php">Paramétrage <span class="sr-only">(current)</span></a>
      <?php
}if($role=='admin' || $role=='user'){
    ?>
      <a class="<?php echo $classUpload ?>" href="uploadDirect.php">Upload</a>
<?php 
}if($role=='admin'){
    ?>
      <a class="<?php echo $classLancement ?>" href="#">Lancement du calcul</a>
      <?php 
      }if($role=='admin'){
          ?>
      <a class="<?php echo $classTelechargement ?>" href="downloadResults.php">Téléchargement des résultats</a>
     <?php 
     }if($role=='admin'){
         ?>
      <a class="<?php echo $classModification ?>" href="modifyJsonTable.php">Modifications des destinataires et signataires</a>
    <?php
} ?>
    </div>
</div>
<a style="color: grey"  class='nav-item nav-link' href="login.php"> <i class="fas fa-sign-out-alt"></i></a>
</nav>