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

function artOrGrp(that){
  
  if (that.value == "art") {
        document.getElementById("simple").style.display = "block";
    } else {
        document.getElementById("simple").style.display = "none";
    }

      if (that.value == "grp") {
        document.getElementById("groupe").style.display = "block";
    } else {
        document.getElementById("groupe").style.display = "none";
    }



}



function sousCondition(that) {
 if (that.value == "oui") {
        document.getElementById("nature").style.display = "block";
    } else {
        document.getElementById("nature").style.display = "none";
    }



     if (that.value == "non") {
       // document.getElementById("submitMe").submit();
    } 


}




function sousConditionDet(that){

 if (that.value == "conditionsimple") {
        document.getElementById("simplecondition").style.display = "block";
    } else {
        document.getElementById("simplecondition").style.display = "none";
    }



 if (that.value == "or" || that.value == "and") {
        document.getElementById("orcondition").style.display = "block";
    } else {
        document.getElementById("orcondition").style.display = "none";
    }



 // if (that.value == "and") {
 //        document.getElementById("andcondition").style.display = "block";
 //    } else {
 //        document.getElementById("andcondition").style.display = "none";
 //    }


}


function articleSetting(that) {
    if (that.value) {
        document.getElementById("qteOrCA").style.display = "block";
    } else {
        document.getElementById("qteOrCA").style.display = "none";
    }
                           }

function articleSettingSousCond(that) {
    if (that.value) {
        document.getElementById("sousConditionType").style.display = "block";
        
        document.getElementById("submittingbutton").style.display = "block";

    } else {
        document.getElementById("sousConditionType").style.display = "none";
        
        document.getElementById("submittingbutton").style.display = "none";
    }
                           }

function SettingCheck(that) {
    if (that.value) {
        document.getElementById("sousCond").style.display = "block";
    } else {
        document.getElementById("sousCond").style.display = "none";
    }
                           }
function SettingCheckPalier(that) {
    if (that.value) {
        document.getElementById("sousCond").style.display = "block";
    } 
    else {
        document.getElementById("sousCond").style.display = "none";
    }
                           }


function SettingSousCondCheck(that){
    if (that.value) {
        document.getElementById("sousCond").style.display = "block";
    } else {
        document.getElementById("sousCond").style.display = "none";
    }
                           }


                       function    SettingSousCondCheckPalier(that){
    if (that.value) {
        document.getElementById("sousCond").style.display = "block";
    } else {
        document.getElementById("sousCond").style.display = "none";
    }
                           }


                function QteOrCaCheck(that) {
    if (that.value == "qte") {
        document.getElementById("Qte").style.display = "block";
    } else {
        document.getElementById("Qte").style.display = "none";
    }
    //  if (that.value == "ca") {
    //     document.getElementById("ca").style.display = "block";

    // } 
    if(that.value=='ca'){
      document.getElementById("sousCond").style.display = "block";
    }
    else {
        document.getElementById("ca").style.display = "none";
    }
}


 function sousCondQteOrCaCheck(that) {
 if (that.value == "qte") {
        document.getElementById("QteSousCond").style.display = "block";
    } else {
        document.getElementById("QteSousCond").style.display = "none";
    }
     if (that.value == "ca") {
        document.getElementById("caSousCond").style.display = "block";
    } else {
        document.getElementById("caSousCond").style.display = "none";
    }
 }



function uOrcCheck(that){

    if (that.value == "unite" || that.value == "caisse" ) {
        document.getElementById("nbr").style.display = "block";
    } else {
        document.getElementById("nbr").style.display = "none";
    }
  
  if(that.value=='unite'){
    disp='d\'unité'
  }
  else{
     disp='de caisse'
  }
  document.getElementById("myText").innerHTML = disp;

}




function SousCondUnOrcCheck(that){

    if (that.value == "Unités" || that.value == "Caisses" ) {
        document.getElementById("nbrSousCond").style.display = "block";
    } else {
        document.getElementById("nbrSousCond").style.display = "none";
    }
  
  if(that.value=='Unités'){
    disp='d\'unité'
  }
  else{
     disp='de caisse'
  }
  document.getElementById("myTextS").innerHTML = disp;

}


function autoSubmit(that){
  if (that.value) {
        
       document.getElementById("submitMe").submit();
    } 
}
			
// 	function sourceCheck(that) {
//     if (that.value == "produit") {
//         document.getElementById("produit").style.display = "block";
//     } else {
//         document.getElementById("produit").style.display = "none";
//     }
//      if (that.value == "marque") {
//         document.getElementById("marque").style.display = "block";
//     } else {
//         document.getElementById("marque").style.display = "none";
//     }

// }




    //                    function    offreCheck(that) {
    // if (that.value == 'GIFT') {
    //     document.getElementById("giftChoice").style.display = "block";
    // } else {
    //     document.getElementById("giftChoice").style.display = "none";
    // }

    //  if (that.value == 'REMISE') {
    //     document.getElementById("remiseSet").style.display = "block";
    // } else {
    //     document.getElementById("remiseSet").style.display = "none";
    // }

    //  if (that.value == 'GRATUITE') {
    //     document.getElementById("gratuiteChoice").style.display = "block";
    // } else {
    //     document.getElementById("gratuiteChoice").style.display = "none";
    // }
    //                        }
		</script>
		
    </head>
	
    <body>
		
	<form id="submitMe" method="post" action="submitPalier.php">

 <div >
<label>Nombre de paliers</label>
<input type="number" name="nbrPaliers" >
</div>
<label>Choix d'articles</label>
<select name="type" onchange="artOrGrp(this);">
    <option value=""></option>
    <option value="art">Article</option>
    <option value="grp">Groupe d'articles</option>
   
</select>

 <div id="groupe" style="display: none;">
 <label>Articles :</label>  <select name="article[]" onchange="articleSetting(this)" multiple="">
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


 <div id="simple" style="display: none;">
 <label>Articles :</label>  <select name="articlex" onchange="articleSetting(this)" >
    <option  value=""></option>
    <option value="EVERSILK LINGETTES ANTIBACTERIENNES 12x120U"> EVERSILK LINGETTES ANTIBACTERIENNES 12x120U</option>
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

<div id="qteOrCA" style="display: none;">
<label>Type : </label>
<select name="QteOrCa" onchange="QteOrCaCheck(this);">
    <option value=""></option>
    <option value="qte">Qte</option>
    <option value="ca">CA</option>
</select>
</div>

<div id="Qte" style="display: none;">
<label>Par :</label>
<select name="unitOrCaisse" onchange="SettingCheckPalier(this);">
    <option value=""></option>
    <option value="unite">Unité</option>
    <option value="caisse">Caisse</option>
</select>
</div>

<!-- Cas de chiffre d'affaire condition principale -->
<!-- <div id="ca" style="display: none;">
<label>Entrez le chiffre d'affaire:</label>
<input name="chiffreAffaire" type="number"  onchange="SettingCheck(this);">
</div> -->



<!-- Cas de QTE condition principale -->
<!-- <div id="nbr" style="display: none;">
<label> Nombre <span id="myText"></span></label>
<input name="nbrUC" type="number" onchange="SettingCheck(this);">
    </div> -->


<div id="sousCond" style="display: none;">
<label>Sous condition :</label>
<select name="sousConditionYesorNo" onchange="sousCondition(this);">
    <option value=""></option>
    <option value="oui">Oui</option>
    <option value="non">Non</option>
</select>
</div>


<div id="nature" style="display: none;">
<label>Nature condition :</label>
<select name="natureSousCond" onchange="sousConditionDet(this);">
    <option value=""></option>
    <option value="or">OR</option>
    <option value="and">AND</option>
     <option value="conditionsimple">SIMPLE</option>
</select>
</div>

<div id="orcondition" style="display: none;">
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

 <div id="simplecondition" style="display: none;">
 <label>Articles :</label>  <select name="articleSousCondX" onchange="articleSettingSousCond(this)" >
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

<div id="sousConditionType" style="display: none;">
<label>Type : </label>
<select name="typeSousCondition" onchange="sousCondQteOrCaCheck(this);">
    <option value=""></option>
    <option value="qte">Qte</option>
    <option value="ca">CA</option>
</select>
</div>


<div id="QteSousCond" style="display: none;">
<label>Par :</label>
<select name="unitOrCaisseSousCondition" onchange="SettingSousCondCheckPalier(this);">
    <option value=""></option>
    <option value="Unités">Unité</option>
    <option value="Caisses">Caisse</option>
</select>
</div>

<!-- Cas de chiffre d'affaire condition principale -->
<!-- <div id="caSousCond" style="display: none;">
<label>Entrez le chiffre d'affaire:</label>
<input name="chiffreAffaireSousCond" type="number"  onchange="SettingSousCondCheck(this);">
</div> -->



<!-- Cas de QTE condition principale -->
<!-- <div id="nbrSousCond" style="display: none;">
<label> Nombre <span id="myTextS"></span></label>
<input name="nbrUCSousCond" type="number" >
    </div> -->

<!-- <input name="nbrUCSousCond" type="number" onchange="SettingSousCondCheck(this);"> -->
<!-- <input name="nbrUCSousCond" type="number" onchange="autoSubmit(this);"> -->









<!-- 
simplecondition
orcondition
 -->

































    <!-- 

    <div id="prOrbr" style="display: none;">
<label>Par :</label>
<select name="Par" onchange="sourceCheck(this);">
    <option value=""></option>
    <option value="produit">Produit</option>
    <option value="marque">Marque</option>
</select>
</div>




   

<div id="marque" style="display: none;">
 <label>Marque :</label> 
 <select name="marque" onchange="nombreCheck(this)">
    <option value=""></option>
    <option value="Dalaa">Dalaa</option>
    <option value="Pandoo">Pandoo</option>
   
</select>
 -->
<!-- <select class="form-control" multiple="multiple" onchange="nombreCheck(this)">
  <option selected="selected">orange</option>
  <option>white</option>
  <option selected="selected">purple</option> 
  <option value="Dalaa">Dalaa</option>
    <option value="Pandoo">Pandoo</option>
</select> -->

<!-- </div> -->



    <!--   <div id="nbr" style="display: none;">

<label> Nombre <span id="myText"></span></label>
<input name="nbrUC" type="number" onchange="nombreCheck(this);">
    
    </div> -->

<!-- 
<div id="offre" style="display: none;">
 <label> Offre </label>
    <select name="offre" onchange="offreCheck(this)" >
    <option  value=""></option>
    <option value="GIFT">GIFT</option>
    <option value="REMISE">REMISE</option>
    <option value="GRATUITE">GRATUITE</option>
   
</select>
</div>

<div id="giftChoice" style="display: none;">
 <label> Gifts choice:</label>  
 <select name="gift[]" onchange="" multiple="">
    <option  value=""></option>
    <option value="Pocco">Pocco X3 NFC</option>
    <option value="Samsung_tab">Samsung tab 7</option>
     <option value="Samsung_TV">Samsung TV 42</option>
   
</select>
</div>

<div id="gratuiteChoice" style="display: none;">
 <label> Gratuité choice:</label>  
 <select name="gratuite[]" onchange="" multiple="">
    <option  value=""></option>
    <option value="Pandoo">Pandoo 3 plis</option>
    <option value="Taj">Taj bladi</option>
     <option value="Dalaa">Dalaa</option>
     <option value="Nova Medium">Nova Medium</option>
   
</select>
</div>


<div id="remiseSet" style="display: none;">

<label> Taux de remise: </span></label>
<input name="taux" type="number" step="0.01" onchange="nombreCheck(this);">

    </div>
</div>



 -->


<!-- last removed -->
<div id="submittingbutton" style="display: none;">
<input type="submit" name="submit" value="valider">
    </div>
    
		</form>
		

		

		<script>
            



  
			// var pseudo = document.getElementById("pseudo");
			// var mdp = document.getElementById("mdp");
			// var mdp2 = document.getElementById("mpd2");
			// var mail = document.getElementById("mail");
			// var nom = document.getElementById("nom");
			// var cp = document.getElementById("cp");		
		</script>
    </body>
</html>



<?php 
if(isset($_POST['submit'])){


if(empty($_POST['chiffreAffaire'])){
$unitOrCaisse=$_POST['unitOrCaisse']; 
$nbrUC=$_POST['nbrUC'].' '.$unitOrCaisse;
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
$nbrUCSousCond=$_POST['nbrUCSousCond'].' '.$unitOrCaisseSousCond;
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
<table>

  <tr>
    <th><center>ID</center></th>
    <th><center>Article</center></th>
    <th><?php echo $QteOrCa.' min' ?></th>
  </tr>
<?php 
for($i=0;$i<count($articleSousCond);$i++){
?>

  <tr>
    <td><?php echo $i; ?></td>
    <td><?php echo $articleSousCond[$i]; ?></td>
   <td><input type="number" name="taux[]" placeholder="Entrer <?php echo $QteOrCa; ?>"></td>
   

  </tr>

<?php 
}

?>
<!-- <input type="submit" name="sendit"> -->
</table>  

<?php

}

// 
// and






$unitOrCaisse=$_POST['unitOrCaisseSousCondition'];
$nombreUniteOrCaisseSousCond=$_POST['nbrUCSousCond'];


$chiffreAffaireSousCond=$_POST['chiffreAffaireSousCond'];



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








}

?>