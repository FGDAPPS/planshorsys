<?php 
if(isset($_POST['ssms'])) {
include("config.php");



$source=$_POST['source'];
$plan=$_POST['plan'];
$qtePrimary=$_POST['qtePrimary'];
$type=$_POST['type'];


$query="INSERT INTO remiseMaster(Type,Source,nbrLevel,Plans,Active) values('".$type."','".$source."','".$qtePrimary."','".$plan."',1)";
$result =  sqlsrv_query($conn, $query);
	// foreach ($_POST['arts'] as $arts)
 // 	   echo "<br>"."&nbsp;&nbsp;&nbsp;".'-'.$arts;

 // 	foreach ($_POST['minQte'] as $minQte)
 // 	   echo "<br>"."&nbsp;&nbsp;&nbsp;".'-'.$minQte;

for($i=0;$i<count($_POST['arts']);$i++){

	echo nl2br($_POST['arts'][$i].'     QTE: '.$_POST['minQte'][$i].PHP_EOL);
	$query="INSERT INTO source(ID_plan,CodeX3,Qte) values((select max(ID) from remiseMaster),'".$_POST['arts'][$i]."','".$_POST['minQte'][$i]."')";
	$result =  sqlsrv_query($conn, $query);
}




 }	


 ?>