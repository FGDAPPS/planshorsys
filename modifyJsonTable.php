<HTML>
<HEAD>   
        <meta charset="utf-8" />
        <title>Paramétrage des plans hors système</title>
    <!-- <link rel="stylesheet" href="CSS/forms.css" /> -->
    <!-- <link rel="stylesheet" href="CSS/design.css" /> -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</HEAD> 
<BODY>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css" ></script>
    <script src="https://code.jquery.com/jquery-3.5.1.js" ></script>
    <script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js" ></script>
  <script>
    
    $(document).ready(function() {
    $('#example').DataTable( {
        columnDefs: [ {
            targets: [ 0 ],
            orderData: [ 0, 1 ]
        }, {
            targets: [ 1 ],
            orderData: [ 1, 0 ]
        }, {
            targets: [ 4 ],
            orderData: [ 4, 0 ]
        } ]
    } );
} );
    </script>

<!-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Plans hors système</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link" href="index.php">Paramétrage <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="uploadDirect.php">Upload</a>
      <a class="nav-item nav-link" href="#">Lancement du calcul</a>
      <a class="nav-item nav-link" href="downloadResults.php">Téléchargement des résultats</a>
      <a class="nav-item nav-link active" href="#">Modifications des destinataires et signataires</a>
    </div>
  </div>
</nav> -->

<?php

session_start(); 
$_SESSION['SomeVar'] = 'modif';

include('menu.php');


$json=    file_get_contents("signataire.json");
$stand =  json_decode($json);



?>

<form action="" method="POST">
    <br />
<table  id="example" class="table">
    <tr>
<th></th>
<th>Sales Operations</th>
<th>FBP Manager</th>
<th>FBP Director</th>
<th>GM</th>
<th>WS Manager</th>

</tr>

<?php
?>

<?php
    // foreach ($data as $idx => $stand) {

        // Output a row
        echo "<tr>
        <th> Nom </th>
<td><input type='text' name='SOP' value='$stand->SOP'></td>
<td><input type='text' name='FBPM' value='$stand->FBPM'></td>
<td><input type='text' name='FBPD' value='$stand->FBPD'></td>
<td><input type='text' name='GM' value='$stand->GM'> </td>
<td><input type='text' name='WSM' value='$stand->WSM'></td>
</tr>
<th> Mail </th>
<td><input type='text' name='SOPemail' value='$stand->SOPemail'></td>
<td><input type='text' name='FBPMemail' value='$stand->FBPMemail'></td>
<td><input type='text' name='FBPDemail' value='$stand->FBPDemail'></td>
<td><input type='text' name='GMemail' value='$stand->GMemail'> </td>
<td><input type='text' name='WSMemail' value='$stand->WSMemail'></td>
</tr>
       ";
    // }

    
    echo "</table>
    <input class='btn btn-primary' type='submit' value='Modifier' name='submit'>
    </form>";

    if(isset($_POST['submit'])) {
        $modif = new stdClass();
        $modif->SOP = $_POST['SOP'];
        $modif->FBPM = $_POST['FBPM'];
        $modif->FBPD = $_POST['FBPD'];
        $modif->GM = $_POST['GM'];
        $modif->WSM = $_POST['WSM'];
        $modif->SOPemail = $_POST['SOPemail'];
        $modif->FBPMemail = $_POST['FBPMemail'];
        $modif->FBPDemail = $_POST['FBPDemail'];
        $modif->GMemail = $_POST['GMemail'];
        $modif->WSMemail = $_POST['WSMemail'];
      $myJSON = json_encode($modif);
   
//     $data[0]['activity_name'] = "TENNIS";
// foreach ($data as $idx => $stand) {
//     // if ($entry['activity_code'] == '1') {
//     //     $data[$key]['activity_name'] = "TENNIS";
//     // }
//     $stand->SOP;

// }


// $newJsonString = json_encode($data);
file_put_contents('signataire.json', $myJSON);
echo '<script language="javascript">';
echo 'alert("Well done !");'; 
echo '</script>';
 }

?>
 
</BODY>
</HTML>

