<?php 

		if(isset($_POST['submit'])) {
$type=$_POST['type'];
$Par=$_POST['Par'];
$offre=$_POST['offre'];
// $taux=$_POST['taux'];
$nbrUC=$_POST['nbrUC'];
$unitOrCaisse=$_POST['unitOrCaisse'];








// $article=$_POST['article'];

echo '- Type du plan: '.$type."<br>";
echo '- '.$type.' en : '.$unitOrCaisse."<br>";
echo '- Nombre '.$unitOrCaisse.' : '.$nbrUC."<br>";
echo '- '.$unitOrCaisse.' par : '.$Par."<br>";
if(!isset($_POST['article'])){
	echo '- Articles: ALL <br>';
}
else{
	?>
<br/>
<table>
	<form action="otherone.php" method="POST">
		<input type="hidden" name="type" value="<?php echo $type ?>"/>
		<input type="hidden" name="source" value="<?php echo $Par ?>"/>
		<input type="hidden" name="plan" value="<?php echo $offre ?>"/>
		<input type="hidden" name="qtePrimary" value="<?php echo $nbrUC ?>"/>
	<tr>
	<th>
		<b>Articles</b>
	</th>
	<th>
		<b>Min qte</b>
	</th>
</tr>

	<?php
	echo "<br>".'- Articles: ';
	foreach ($_POST['article'] as $article)
 	   // echo "<br>"."&nbsp;&nbsp;&nbsp;".'-'.$article;
 	   echo' <tr><td>'.$article.'</td><td><input type="hidden" name="arts[]" value="'.$article.'"/><input type="number" name="minQte[]"></td></tr>';
?>
<!-- <br/>
<table>
	<tr>
		<b>Name</b>
	<th>
	</th> -->
	<input type="submit" name="ssms">

</form>
</table>

<?php

}
// print_r('Article: '.$article."<br>");

 if(!empty($_POST['marque'])){
$marque=$_POST['marque'];
echo '- Marque: '.$marque."<br>";

}
//  else{
// echo 'Marque: Any '."<br>";
// }
echo "<br>".'- Offre: '.$offre;

if(!isset($_POST['gift'])){
	// echo 'Articles: All <br>';
}
else{
	echo "<br>".'- GIFT(S): ';
	foreach ($_POST['gift'] as $gift)
 	   echo "<br>"."&nbsp;&nbsp;&nbsp;".'-'.$gift;
 }	


if(!isset($_POST['gratuite'])){
	// echo 'Articles: All <br>';
}
else{
	echo '- GRATUITE(S): ';
	foreach ($_POST['gratuite'] as $gratuite)
 	   echo "<br>"."&nbsp;&nbsp;&nbsp;".'-'.$gratuite;
 }	


 if(isset($_POST['taux'])){
 	echo "<br>".'- Taux de remise: '.$_POST['taux'].'';
 }


}


		?>
<!-- <table>
	<tr>
	<th>
		<b>Articles</b>
	</th>
</tr>

<tr><td>Walid</td><td>ww</td></tr>
<tr><td>Walid</td></tr>
<tr>Walid</tr>
<tr>Walid</tr>
</table> -->