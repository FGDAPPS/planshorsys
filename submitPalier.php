<?php 
if(isset($_POST['submit'])){


$nbrPaliers=$_POST['nbrPaliers'];

if(empty($_POST['chiffreAffaire'])){
$unitOrCaisse=$_POST['unitOrCaisse']; 
// $nbrUC=$_POST['nbrUC'].' '.$unitOrCaisse;
}
else{
  $nbrUC=$_POST['chiffreAffaire'].' MAD';
}

if(!empty($_POST['article'])){
$article=$_POST['article'];
}
else{
$article=[];
array_push($article, $_POST['articlex']);
}
// $nbrUCSousCond=$_POST['nbrUCSousCond'];
// $articleSousCond=$_POST['articleSousCond'];



// if(isset($_POST['articlex']) && isset($unitOrCaisse) && !isset($chiffreAffaire)){
  echo '1 A l\'achat de : '.$nbrUC."<br>";
echo 'De: '."<br>";
for($i=0;$i<count($article);$i++){
  echo '-'.$article[$i]."<br>";
} 






if(!empty($_POST['articleSousCond'])){
$articleSousCond=$_POST['articleSousCond'];
}
else{
$articleSousCond=[];
array_push($articleSousCond, $_POST['articleSousCondX']);
}
if(empty($_POST['chiffreAffaireSousCond'])){
$unitOrCaisseSousCond=$_POST['unitOrCaisseSousCondition']; 
// $nbrUCSousCond=$_POST['nbrUCSousCond'].' '.$unitOrCaisseSousCond;
}
else{
  $nbrUCSousCond=$_POST['chiffreAffaireSousCond'].' MAD';
}


$YesorNo=$_POST['sousConditionYesorNo'];
$QteOrCa=$_POST['typeSousCondition'];


$AndOrSimple =$_POST['natureSousCond'] ;

if($AndOrSimple=='conditionsimple'){

echo ' Dont : ';
echo ' '.$nbrUCSousCond."<br>";
echo 'De: '."<br>";
for($i=0;$i<count($articleSousCond);$i++){
  echo '-'.$articleSousCond[$i]."<br>";
} 
}

if($AndOrSimple=='or'){

echo ' Dont : ';
echo ' '.$nbrUCSousCond."<br>";
echo 'De: '."<br>";
for($i=0;$i<count($articleSousCond);$i++){
  echo '-'.$articleSousCond[$i]."<br>".$AndOrSimple."<br>";
} 




?>
<!-- <table>

  <tr>
    <th><center>ID</center></th>
    <th><center>Article</center></th>
    <th><?php echo $QteOrCa.' min' ?></th>
  </tr> -->
<?php 
// for($i=0;$i<count($articleSousCond);$i++){
?>

  <!-- <tr>
    <td><?php echo $i; ?></td>
    <td><?php echo $articleSousCond[$i]; ?></td>
   <td><input type="number" name="taux[]" placeholder="Entrer <?php echo $QteOrCa; ?>"></td>
   

  </tr> -->

<?php 
// }

?>
<!-- <input type="submit" name="sendit"> -->
<!-- </table>   -->

<?php

}

// 
// and






$unitOrCaisse=$_POST['unitOrCaisseSousCondition'];
// $nombreUniteOrCaisseSousCond=$_POST['nbrUCSousCond'];


// $chiffreAffaireSousCond=$_POST['chiffreAffaireSousCond'];



// }
// elseif(isset($_POST['articlex']) && isset($chiffreAffaire)){
//   echo '2 A l\'achat de : '.$chiffreAffaire.' MAD'."<br>";
// echo 'De: '."<br>";
// // for($i=0;$i<count($_POST['article']);$i++){
//   echo '-'.$_POST['articlex']."<br>";
// // } 
// }
// elseif(isset($_POST['article']) && isset($chiffreAffaire)){
//   echo '3 A l\'achat de : '.$chiffreAffaire.' MAD'."<br>";
// echo 'De: '."<br>";
// for($i=0;$i<count($_POST['article']);$i++){
//   echo '-'.$_POST['article'][$i]."<br>";
// } 
// }
// elseif(isset($_POST['article']) && !isset($chiffreAffaire)){
//   echo '4 A l\'achat de : '.$nbrUC.' '.$unitOrCaisse."<br>";
// echo 'De: '."<br>";
// for($i=0;$i<count($_POST['article']);$i++){
//   echo '-'.$_POST['article'][$i]."<br>";
// } 
// }










?>

  
<CENTER><TABLE width=60% border=1>



<tr>

  <th>    Palier  </th>
  <th>    Valeur Palier  </th>
  <th>    Offre  </th>

  <?php if($YesorNo=='oui') {?>
  <th>    Articles  </th>
<!--   <th>    QTE OR CA MIN  </th> -->
  <th>  <?php echo   $QteOrCa; ?> </th>

<?php } ?>


</tr>



<?php 
// $paliers=[1,2,3];

// $articles=['nova','pandoo','dalaa','fizz'];

// $articles=$_POST['articleSousCond'];

$articles=$articleSousCond;



$rowspan=count($articles)+1;
// foreach ($paliers as $palier) {

for($i=1;$i<=$nbrPaliers;$i++){

?>


<tr>
<TD width=33% rowspan="<?php echo $rowspan;?>" style="border-bottom: solid; ">Palier <?php echo $i; ?></TD>
  <TD width=33% rowspan="<?php echo $rowspan;?>" style="border-bottom: solid; "> <input type="number" name="valeurPalier"></TD>   
  <!-- <TD width=34%>3</TD> -->
  <td  rowspan="<?php echo $rowspan;?>" style="border-bottom: solid; "><input type="number" name="offre"></td>   
</tr>
<?php 

for($j=0;$j<count($articles);$j++){
?>
<TR>
  <!-- <td></td> -->

  <?php if($YesorNo=='oui') {?>
<TD width=33% ><?php echo $articles[$j];?></TD>
<TD width=34% ><input type="number" name="offre"></TD>
<?php } ?>
</TR>

<?php 
}
}



}
?>