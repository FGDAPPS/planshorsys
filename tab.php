<!DOCTYPE html>
<html lang="fr">
    <head>
		
        <meta charset="utf-8" />
        <title>Formulaire actif</title>
		<script src="JS/regexp.js"></script>
		<script src="JS/passVerif.js"></script>
		<script src="JS/forms.js"></script>
		<link rel="stylesheet" href="CSS/forms.css" />
		<link rel="stylesheet" href="CSS/design.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

		
		<script>
                function QteOrCaCheck(that) {
     // var input = document.getElementById("palierEnter").value;
     // document.getElementById("nbrPalier").innerHTML = input;



    if (that.value == "remise") {
        document.getElementById("remiseCheck").style.display = "table-cell";
         document.getElementById("remiseCheck1").style.display = "table-cell";
    } else {
        document.getElementById("remiseCheck").style.display = "none";
        document.getElementById("remiseCheck1").style.display = "none";
    }

     if (that.value == "montant") {
        document.getElementById("montantCheck").style.display = "table-cell";
         document.getElementById("montantCheck1").style.display = "table-cell";
    } else {
        document.getElementById("montantCheck").style.display = "none";
        document.getElementById("montantCheck1").style.display = "none";
    }
    //  if (that.value == "ca") {
    //     document.getElementById("ca").style.display = "block";
    // } else {
    //     document.getElementById("ca").style.display = "none";
    // }
}
 
//  function getPaliers() {
//     // Sélectionner l'élément input et récupérer sa valeur

//     var input = document.getElementById("palierEnter").value;

//      // document.getElementById("nbrPalier").innerHTML = input;
//     // Afficher la valeur
//     alert(input);

    
//     document.getElementById("mytable").style.display = "table-cell";
// var p1 = input;
// }

 // var input = document.getElementById("palierEnter").value;


		</script>
		
    </head>
	
    <body>
<?php 
		if(!isset($_POST['submit'])){
?>
	<form method="post" action="">

<input  id="palierEnter" type="number" name="Palier" placeholder="Entrer le nombre de paliers">
<label>Choix de l'offre:</label>
<select name="type" onchange="QteOrCaCheck(this);">
    <option value=""></option>
    <option value="Taux de remise">Remise</option>
    <option value="Montant à remettre">Montant à remettre</option>
   
</select>

<div id="orcondition" >
 <label>Articles :</label>  <select name="articleSousCond[]" onchange="articleSettingSousCond(this)" multiple="">
    <option  value=""></option>
    <option value="CPF23DALSCO">CPF23DALSCO</option>
    <option value="CNGDALCOUHC20">CNGDALCOUHC20</option>
    <option value="Lingettes EverSilk 120Unités">Lingettes EverSilk 120Unités</option>
    <option value="Sany ET*3">Sany ET*3</option>
    <option value="Eversilk">Eversilk</option>
     <option value="Maxi Citron">Maxi Citron</option>
     <option value=" Sany serviette de table 80"> Sany serviette de table 80</option>
      <option value="Sany Maxi Citron 2+1">Sany Maxi Citron 2+1</option>
       <option value="Nova Medium">Nova Medium</option>
        <option value="Mouchoir de poche 10">Mouchoir de poche 10</option>
        <option value="Mouchoir de poche 15">Mouchoir de poche 15</option>
        <option value="PANDOO Papier hygiénique 3 plis 7+2 Rlx*3">PANDOO Papier hygiénique 3 plis 7+2 Rlx*3</option>
<option value="PANDOO Papier hygiénique 3 plis 12 Rlx*4">PANDOO Papier hygiénique 3 plis 12 Rlx*4</option>
<option value="PANDOO Papier hygiénique 3 plis 32 Rlx">PANDOO Papier hygiénique 3 plis 32 Rlx</option>
<option value="PANDOO Papier hygiénique 3 plis 24 Rlx*4">PANDOO Papier hygiénique 3 plis 24 Rlx*4</option>
<option value="PANDOO Papier hygiénique 3 plis 7+2 Rlx*6">PANDOO Papier hygiénique 3 plis 7+2 Rlx*6</option>
     
   
</select>
</div>

<input type="submit" name="submit" value="valider">
    </form>
<?php 
}
 ?>
<!-- <div id="Qte" style="display: none;">
<label>Par :</label>
<select name="unitOrCaisse" onchange="uOrcCheck(this);">
    <option value=""></option>
    <option value="unite">Unité</option>
    <option value="caisse">Caisse</option>
</select>
</div>

    <div id="nbr" style="display: none;">
<label> Nombre <span id="myText"></span></label>
<input name="nbrUC" type="number" onchange="SettingCheck(this);">
    </div> -->

 <!--    <div id="prOrbr" style="display: none;">
<label>Par :</label>
<select name="Par" onchange="sourceCheck(this);">
    <option value=""></option>
    <option value="produit">Produit</option>
    <option value="marque">Marque</option>
</select>
</div>
 -->

<?php
if(isset($_POST['submit'])){

$paliers=$_POST['Palier'];









 ?>
<!-- <form action="page2.php" method="POST"> -->
<!-- <table>

  <tr>
    <th><center>Palier</center></th>
    <th><center>Valeur</center></th>
    <th><center>Composantes</center></th>
    <th>Offre</th>
    <th id="remiseCheck" style="display: none;">Taux de remise</th>
     <th id="montantCheck" style="display: none;">Montant à remettre</th>
    <th><?php echo $_POST['type'] ?></th>
  </tr> -->
<?php 
// for($i=1;$i<=$nbrPaliers;$i++){
?>

  <!-- <tr>
    <td><?php echo $i; ?></td>
    <td>1S</td>
    <td>my valeur</td>
    <td><input  name="a[]"  type="text"></td>
    <td>



      <select name="check" onchange="QteOrCaCheck(this);"> 
       <option value=""></option>
      <option value="remise">Remise</option>
       <option value="montant">Montant</option>
    </select>
  </td>
   <td><input type="number" name="taux[]" placeholder="Entrer le <?php echo $_POST['type']; ?>"></td>
    <td><input type="number" placeholder="Entrer le montant"></td>




  </tr> -->

<?php 
// }

?>
<!-- <input type="submit" name="sendit">
</table>	
</form> -->

  
<CENTER><TABLE width=60% border=1>



<tr>

  <th>    Palier  </th>
  <th>    Valeur Palier  </th>
  <th>    <?php echo $_POST['type']; ?> </th>
  <th>    Articles  </th>
  <th>    QTE OR CA MIN  </th>


</tr>



<?php 
// $paliers=[1,2,3];

// $articles=['nova','pandoo','dalaa','fizz'];
$articles=$_POST['articleSousCond'];
$rowspan=count($articles)+1;
// foreach ($paliers as $palier) {

for($i=1;$i<=$paliers;$i++){

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
<TD width=33% ><?php echo $articles[$j];?></TD>
<TD width=34% ><input type="number" name="offre"></TD>

</TR>

<?php 
}
}
?>





</TABLE></CENTER>

  </body>
</html>
<?php }
?>
