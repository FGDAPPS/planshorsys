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
     <!--    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"> -->

		
		<script>
                function QteOrCaCheck(that) {
    if (that.value == "qte") {
        document.getElementById("Qte").style.display = "block";
    } else {
        document.getElementById("Qte").style.display = "none";
    }
     if (that.value == "ca") {
        document.getElementById("ca").style.display = "block";
    } else {
        document.getElementById("ca").style.display = "none";
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
			
	function sourceCheck(that) {
    if (that.value == "produit") {
        document.getElementById("produit").style.display = "block";
    } else {
        document.getElementById("produit").style.display = "none";
    }
     if (that.value == "marque") {
        document.getElementById("marque").style.display = "block";
    } else {
        document.getElementById("marque").style.display = "none";
    }

}




function nombreCheck(that) {
    if (that.value) {
        document.getElementById("offre").style.display = "block";
    } else {
        document.getElementById("offre").style.display = "none";
    }
                           }

function SettingCheck(that) {
    if (that.value) {
        document.getElementById("prOrbr").style.display = "block";
    } else {
        document.getElementById("prOrbr").style.display = "none";
    }
                           }




                       function    offreCheck(that) {
    if (that.value == 'GIFT') {
        document.getElementById("giftChoice").style.display = "block";
    } else {
        document.getElementById("giftChoice").style.display = "none";
    }

     if (that.value == 'REMISE') {
        document.getElementById("remiseSet").style.display = "block";
    } else {
        document.getElementById("remiseSet").style.display = "none";
    }

     if (that.value == 'GRATUITE') {
        document.getElementById("gratuiteChoice").style.display = "block";
    } else {
        document.getElementById("gratuiteChoice").style.display = "none";
    }
                           }
		</script>
		
    </head>
	
    <body>
		
	<form method="post" action="mypage.php">

<label>Choix du type du plan:</label>
<select name="type" onchange="QteOrCaCheck(this);">
    <option value=""></option>
    <option value="ca">Chiffre d'affaire</option>
    <option value="qte">Quantité</option>
   
</select>

<div id="Qte" style="display: none;">
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
    </div>

    <div id="prOrbr" style="display: none;">
<label>Par :</label>
<select name="Par" onchange="sourceCheck(this);">
    <option value=""></option>
    <option value="produit">Produit</option>
    <option value="marque">Marque</option>
</select>
</div>




    <div id="produit" style="display: none;">
 <label>Articles :</label>  <select name="article[]" onchange="nombreCheck(this)" multiple="">
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
     
   
</select>
</div>

<div id="marque" style="display: none;">
 <label>Marque :</label> 
 <select name="marque" onchange="nombreCheck(this)">
    <option value=""></option>
    <option value="Dalaa">Dalaa</option>
    <option value="Pandoo">Pandoo</option>
   
</select>

<!-- <select class="form-control" multiple="multiple" onchange="nombreCheck(this)">
  <option selected="selected">orange</option>
  <option>white</option>
  <option selected="selected">purple</option> 
  <option value="Dalaa">Dalaa</option>
    <option value="Pandoo">Pandoo</option>
</select> -->

</div>



    <!--   <div id="nbr" style="display: none;">

<label> Nombre <span id="myText"></span></label>
<input name="nbrUC" type="number" onchange="nombreCheck(this);">
    
    </div> -->


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







<input type="submit" name="submit" value="valider">
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