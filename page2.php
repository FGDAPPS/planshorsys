
<?php 

if(isset($_POST['sendit'])){
  // foreach ($_POST['de'] as $De) {
  //   echo 'De: '.$De."<br>";
  // }

  //  foreach ($_POST['a'] as $A) {
  //      echo 'De: '.$A."<br>";
  // }

  //  foreach ($_POST['taux'] as $Taux) {
  //      echo 'De: '.$Taux."<br>";
  // }


for($i=0;$i<count($_POST['de']);$i++){

	echo 'De : '.$_POST['de'][$i].' A: '.$_POST['a'][$i].' Taux de remise: '.$_POST['taux'][$i]."<br>";
}
}

?>