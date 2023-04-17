<HTML>
<HEAD>

    
        <meta charset="utf-8" />
        <title>Paramétrage des plans hors système</title>
    <script src="JS/regexp.js"></script>
    <script src="JS/passVerif.js"></script>
    <script src="JS/forms.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.js"></script>

    <link rel="stylesheet" href="CSS/forms.css" />
    <link rel="stylesheet" href="CSS/design.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<style>
.TabCommon {FONT: 18px Verdana; COLOR: #6D6D6D; PADDING: 5px; FONT-WEIGHT: bold; TEXT-ALIGN: center; HEIGHT: 30px; WIDTH: 100px;}
.TabContent {PADDING: 5px;}
.TabContentBottom {PADDING: 10px; BORDER-BOTTOM: 2px outset #99ccff;}
.TabOff {CURSOR: hand; BACKGROUND-COLOR: #E2E2E3; BORDER-LEFT: 1px solid #BBBBBB;}
.TabOn {CURSOR: default; BORDER-TOP: 2px outset #D1D1D1; COLOR: #000000;}
.TabBorderBottom{BORDER-BOTTOM: 2px inset #D1D1D1;}
.TabActiveBorderLeftRight{BORDER-RIGHT: 2px outset #D1D1D1; BORDER-LEFT: 2px outset #D1D1D1;}
.TabActiveBackground {BACKGROUND-COLOR: #F7F8F3;}
</style>

<script>
  $(document).ready(function() {
  var i = 1;
  $("#add_row").click(function() {
  $('tr').find('input').prop('disabled',false)
    $('#addr' + i).html("<td>" + (i + 1) + "</td><td><input type='text' name='uname" + i + "' placeholder='Article(s)' class='form-control input-md'/></td><td><select  name='nic" + i + "'  class='form-control select-md'><option value='QTE'>QTE</option><option value='CA'>CA</option></select></td><td><input type='text' name='amount" + i + "' placeholder='Min to order' class='form-control input-md'/></td>");

    $('#tab_logic').append('<tr id="addr' + (i + 1) + '"></tr>');
    i++;
  });
});


 $(document).ready(function() {
  var i = 1;
  $("#add_row_palier").click(function() {
  $('tr').find('input').prop('disabled',false)
    $('#addrPalier' + i).html("<td>" + (i + 1) + "</td><td><input type='text' name='uname" + i + "' placeholder='Article(s)' class='form-control input-md'/></td><td><input type='text' name='uname" + i + "' placeholder='Article(s)' class='form-control input-md'/></td><td><select  name='nic" + i + "'  class='form-control select-md'><option value='QTE'>QTE</option><option value='CA'>CA</option></select></td><td><input type='text' name='amount" + i + "' placeholder='Min to order' class='form-control input-md'/></td>");

    $('#tab_logicPalier').append('<tr id="addrPalier' + (i + 1) + '"></tr>');
    i++;
  });
});
function TabClick( nTab ){
  Col = document.getElementsByName("Content");
  for (i = 0; i < document.getElementsByName("Content").length; i++)
      {
    document.getElementsByName("tabs")[i].className = "TabBorderBottom TabCommon TabOff";
      document.getElementsByName("Content")[i].style.display = "none";
    }
  document.getElementsByName("Content")[nTab].style.display = "block";  
  document.getElementsByName("tabs")[nTab].className = "TabCommon TabOn TabActiveBackground TabActiveBorderLeftRight";
}
</script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
    <script>
  $(function () {
    $('#add').click(function () {
      let $options = $('#select1 option:selected');
      $options.appendTo("#select2");
    });
    $('#add_all').click(function () {
      let $options = $('#select1 option');
      $options.appendTo("#select2");
    });
    $('#select1').dblclick(function () {
      let $option = $('option:selected',this);
      $option.appendTo('#select2');
    });
    $("#remove").click(function () {
      let $options = $('#select2 option:selected');
      $options.appendTo("#select1");
    });
    $("#remove_all").click(function () {
      let $options = $('#select2 option');
      $options.appendTo('#select1');
    });
    $('#select2').dblclick(function () {
      let $option = $('option:selected');
      $option.appendTo("#select1");
    });
  });

// function articleSetting(){
//   if (that.value) {
//         document.getElementById("simple").style.display = "block";
//     } else {
//         document.getElementById("simple").style.display = "none";
//     }
 
// }

$(function() {
  $(document).on('click','#arts',function (e) {
    if($(this).is(":checked")){
      document.getElementById("simple").style.display = "block";
      document.getElementById("simpleOne").style.display = "none";
    }else{
      document.getElementById("simple").style.display = "none";
      document.getElementById("simpleOne").style.display = "block";
      
    }
  });

  $(document).on('click','#Allcustomers',function (e) {
    if($(this).is(":checked")){
      // alert('Home is checked')
      document.getElementById("customers").style.display = "none";
      // document.getElementById("simpleOne").style.display = "none";
    }else{
      // alert('Home is unchecked')
      document.getElementById("customers").style.display = "block";
      // document.getElementById("simpleOne").style.display = "block";
      
    }
  });

  $(document).on('click','#sousConditi',function (e) {
    if($(this).is(":checked")){
      document.getElementById("sousCond").style.display = "block";
      // document.getElementById("simpleOne").style.display = "none";
    }else{
      document.getElementById("sousCond").style.display = "none";
      // document.getElementById("simpleOne").style.display = "block";
      
    }
  });





});

function paliersCheck(that){
  if (that.value > 1) {
    // alert(that.value);
        createCookie("EEE", that.value, "10");
        document.getElementById("offreInline").style.display = "none";
        document.getElementById("paliersExist").style.display = "block";
    } else {
      // alert(that.value);
        document.getElementById("offreInline").style.display = "block";
        document.getElementById("paliersExist").style.display = "none";
        
    }
 
};

$(document).ready(function () {
  // createCookie("height", $(window).height(), "10");
});


function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  else {
    expires = "";
  }
  document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

  </script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Plans hors système</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="#">Paramétrage <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="uploadDirect.php">Upload</a>
      <a class="nav-item nav-link" href="#">Lancement du calcul</a>
      <a class="nav-item nav-link" href="downloadResults.php">Téléchargement des résultats</a>
      <a class="nav-item nav-link" href="modifyJsonTable.php">Modifications des destinataires et signataires</a>
      
      <!-- <a class="nav-item nav-link disabled" href="#">Téléchargement des résultats</a> -->
    </div>
  </div>
</nav>
</HEAD>
<BODY onload="TabClick(0);">
 
 
  <TABLE CELLPADDING=0 CELLSPACING=0 ALIGN="center" STYLE="width: 100%">

     
      <!-- <TR> -->
         
      <!-- </TR>
      <TR> -->
        <?php 
        // Premier formulaire
      if (!isset($_POST['submitDef']) && !isset($_POST['sousCond']) && !isset($_POST['subSousCond']) && !isset($_POST['subTypeC'])) {
            ?>
        <form enctype="multipart/form-data" action="" method="POST">
          <TD COLSPAN=5 CLASS="TabContent TabActiveBackground TabActiveBorderLeftRight TabContentBottom">     
         <!-- <DIV id="Content" name="Content"> -->
           <div class="form-group col-lg-3">

            <label>Code:</label>
            <input class="form-control" type="text" name="code">

            <label>Date début:</label>
            <input class="form-control"  type="date" name="dateDebut">

            <label>Date fin:</label>
            <input class="form-control"  type="date" name="dateFin">

  <div id="simpleOne" style="display: block;">
      <label>Article:</label>
      <input class="form-control"  type="text" name="Article">
  </div>
            <label>Plusieurs articles : </label>
            <input id="arts" type="checkbox" name="manyarticles" > <br />
              

<div id="simple" style="display: none;">
              <label>Upload articles : </label>
              <input class="form-control"  type="file" name="articles">
</div>
           

    <label>Type:</label>
    <select class="form-control" name="type">
           <option>QTE</option>
           <option>CA</option> 
        </select>

    <label>Min to order:</label>
    <input class="form-control" type="text" name="minOrder">

    <label>Paliers: </label>
    <input  class="form-control" type="number" name="NoPaliers" onchange="paliersCheck(this);">

    <label>Sous-condition: </label>
    <input id="sousConditi" type="checkbox" name="sousCond"> 

    <label>Cumul des commandes : </label>
    <input type="checkbox" name="cumul"> 

    <label>All customers : </label>
    <input id="Allcustomers" type="checkbox" name="allcustomers"><br /> 
      

<div id="customers" style="display: block;">
    <label>Upload customers : </label>
    <input class="form-control"  type="file" name="cutomersup"> 
</div>


<div id="offreInline" style="display: block;">
    <label>Type d'offre:</label>
    <select class="form-control" name="typeOffre">
    <option value="AVS">AVS</option>
    <option value="GRATUITE">Gratuité</option> 
    <option value="REMISE">Remise</option> 
    <option value="GIFT">Gift</option> 
    </select>
    <label>Valeur d'offre : </label>
    <input class="form-control" type="text" name="valueOffre"> 
</div>

<label>Adresses mail : </label>
    <input required class="form-control" type="text" name="mails" placeholder=" ',' between adresses"> 
  
    <label>Description plan : </label>
    <input required class="form-control" type="text" name="descriptionPlan" > 


<br />
<input class="btn btn-dark" type="submit" name="submitDef" value="Valider">
</form>
            </div>
         <!-- </DIV> -->
         <?php
        } ?>

         
         <!-- <DIV id="Content" name="Content"> -->
   <?php

          //  JSON Plan de type A
           if (isset($_POST['submitDef']) && !isset($_POST['sousCond']) && $_POST['NoPaliers']==1) {
             $code=$_POST['code'];
             $dateDebut=$_POST['dateDebut'];
             $dateFin=$_POST['dateFin'];
             $type=$_POST['type'];
             $minOrder=$_POST['minOrder'];
             $NoPaliers=$_POST['NoPaliers'];
             $typeOffre=$_POST['typeOffre'];
             $valueOffre=$_POST['valueOffre'];

             $mails=$_POST['mails'];
             $descriptionPlan=$_POST['descriptionPlan'];
             
             
             
             define('CSV_PATH', 'C:\xampp\htdocs\hors');
             if(isset($_POST['cumul'])){
               $cumul=1;
              }else{$cumul=0;}
            if(isset($_POST['allcustomers'])){
             $customers=1;
         }else{$customers=0;}
            if(isset($_POST['Article'])){
              $Articles=$_POST['Article'];
            }
            if (isset($_FILES['articles'])) {
                $repertoireDestination = dirname(__FILE__)."/";
                $nomDestination        = "articles.csv";
                // $Articles=[];
                if (is_uploaded_file($_FILES["articles"]["tmp_name"])) {
                    if (rename(
                        $_FILES["articles"]["tmp_name"],
                        $repertoireDestination.$nomDestination
                    )) {
                        // define('CSV_PATH', 'C:\xampp\htdocs\hors');
                        $csv_file = CSV_PATH . "/articles.csv";
                        if (($handle = fopen($csv_file, "r")) !== false) {
                            fgetcsv($handle);
                            while (($data = fgetcsv($handle, 1000, ";")) !== false) {
                                $num = count($data);
                                for ($c=0; $c < $num; $c++) {
                                    $col[$c] = $data[$c];
                                }
                                $col0=$col[0];
                                $Articles .= $col[0].',';
             
                                // array_push($Articles,$col[0]);
                            }
                            $Articles= substr($Articles, 0, -1);
             
                            fclose($handle);
                        }
                    }
                }
            }

            if (isset($_FILES['cutomersup'])) {
              $repertoireDestination = dirname(__FILE__)."/";
              $nomDestination        = "cutomersup.csv";
              // $Articles=[];
              $allcustomers='';
              if (is_uploaded_file($_FILES["cutomersup"]["tmp_name"])) {
                  if (rename(
                      $_FILES["cutomersup"]["tmp_name"],
                      $repertoireDestination.$nomDestination
                  )) {
                      // define('CSV_PATH', 'C:\xampp\htdocs\hors');
                      $csv_file = CSV_PATH . "/cutomersup.csv";
                      if (($handle = fopen($csv_file, "r")) !== false) {
                          fgetcsv($handle);
                          while (($data = fgetcsv($handle, 1000, ";")) !== false) {
                              $num = count($data);
                              for ($c=0; $c < $num; $c++) {
                                  $col[$c] = $data[$c];
                              }
                              $col0=$col[0];
                              $allcustomers .= $col[0].',';
           
                              // array_push($Articles,$col[0]);
                          }
                          $allcustomers= substr($allcustomers, 0, -1);
           
                          fclose($handle);
                      }
                  }
              }
          }else{
            $allcustomers="";
          }


            $planA = new stdClass();
                      $planA->CODE = $code;
                      $planA->TYPE = $type;
                      $planA->ARTICLES=$Articles;
                      $planA->OFFRE=$typeOffre;
                      $planA->valueOffre=$valueOffre;
                      $planA->valeurMinCondition = $minOrder;
                      $planA->cumulCommandes=$cumul;
                      $planA->allCustomers=$customers;
                      $planA->specifiqueCustomers=$allcustomers;
                      $planA->dateDebut = $dateDebut;
                      $planA->dateFin = $dateFin;
                      $planA->mails =$mails;
                      $planA->descriptionPlan=$descriptionPlan;
                      // $planA->Paliers = $paliersAremplir;
            $testArray=[];
            $myJSON = json_encode($planA);
            $string = file_get_contents("PlansTypeA.json");
          
            // $string = str_replace("[", "", $string);
            $string = str_replace("]", "", $string);
            $string .= ','.$myJSON."]";

            // array_push($testArray, $string);
            // array_push($array2, $value);
            // $string= json_encode($string);
            
            // echo count($testArray);

            $fp = fopen('PlansTypeA.json', 'w');
            fwrite($fp, $string);
            fclose($fp);
            // echo $string;

        
          }






          //  Plan de type B 
      if (isset($_POST['submitDef']) && isset($_POST['sousCond']) && $_POST['NoPaliers']==1) {

        define('CSV_PATH', 'C:\xampp\htdocs\hors');
          $code=$_POST['code'];
          $dateDebut=$_POST['dateDebut'];
          $dateFin=$_POST['dateFin'];
          $type=$_POST['type'];
          $minOrder=$_POST['minOrder'];
          $NoPaliers=$_POST['NoPaliers'];
          $valueOffre=$_POST['valueOffre'];
          $typeOffre=$_POST['typeOffre'];

          $mails=$_POST['mails'];
          $descriptionPlan=$_POST['descriptionPlan'];

         if(isset($_POST['cumul'])){
           $cumul=1;
         } else {
          $cumul=0;
         }


          if(isset($_POST['Article'])){  
            $Articles=$_POST['Article'];
          }
         

          if (isset($_FILES['articles'])) {
            $repertoireDestination = dirname(__FILE__)."/";
            $nomDestination        = "articles.csv";
            // $Articles=[];
            if (is_uploaded_file($_FILES["articles"]["tmp_name"])) {
                if (rename(
                    $_FILES["articles"]["tmp_name"],
                    $repertoireDestination.$nomDestination
                )) {
                    // define('CSV_PATH', 'C:\xampp\htdocs\hors');
                    $csv_file = CSV_PATH . "/articles.csv";
                    if (($handle = fopen($csv_file, "r")) !== false) {
                        fgetcsv($handle);
                        while (($data = fgetcsv($handle, 1000, ";")) !== false) {
                            $num = count($data);
                            for ($c=0; $c < $num; $c++) {
                                $col[$c] = $data[$c];
                            }
                            $col0=$col[0];
                            $Articles .= $col[0].',';
         
                            // array_push($Articles,$col[0]);
                        }
                        $Articles= substr($Articles, 0, -1);
         
                        fclose($handle);
                    }
                }
            }
         }


          if(isset($_POST['allcustomers'])){  
            $allcustomers=1;
          }
         if (isset($_FILES['cutomersup'])) {
          $repertoireDestination = dirname(__FILE__)."/";
          $nomDestination        = "cutomersup.csv";
          // $Articles=[];
          $allcustomers='';
          if (is_uploaded_file($_FILES["cutomersup"]["tmp_name"])) {
              if (rename(
                  $_FILES["cutomersup"]["tmp_name"],
                  $repertoireDestination.$nomDestination
              )) {
                  // define('CSV_PATH', 'C:\xampp\htdocs\hors');
                  $csv_file = CSV_PATH . "/cutomersup.csv";
                  if (($handle = fopen($csv_file, "r")) !== false) {
                      fgetcsv($handle);
                      while (($data = fgetcsv($handle, 1000, ";")) !== false) {
                          $num = count($data);
                          for ($c=0; $c < $num; $c++) {
                              $col[$c] = $data[$c];
                          }
                          $col0=$col[0];
                          $allcustomers .= $col[0].',';
         
                          // array_push($Articles,$col[0]);
                      }
                      $allcustomers= substr($allcustomers, 0, -1);
         
                      fclose($handle);
                  }
              }
          }
         }

         

?>

<div class="container">
  <div class="row clearfix">
    <div class="col-md-12 column">
        <br />
        <br />
      <table class="table table-bordered table-hover" id="tab_logic">
        <thead>
          <tr>
       
            <th class="text-center">
             N° palier
            </th>
            <th class="text-center">
              Articles
            </th>
            <th class="text-center">
              Details
            </th>
            <th class="text-center">
              Min to order
            </th>
          
          </tr>
        </thead>
        <tbody>
          <?php 
                $NoPaliers=$_POST['NoPaliers'];
                // echo $NoPaliers;
?>
<form method="POST" action="">
 <input type="hidden" value="<?php echo $code ?>" name="code">
  <input type="hidden" value="<?php echo $dateDebut ?>" name="dateDebut">
  <input type="hidden" value="<?php echo $dateFin ?>" name="dateFin">
  <input type="hidden" value="<?php echo $allcustomers ?>" name="allcustomers">
  <input type="hidden" value="<?php echo $type ?>" name="type">
  <input type="hidden" value="<?php echo $minOrder ?>" name="minOrder">
  <input type="hidden" value="<?php echo $NoPaliers ?>" name="NoPaliers">
  <input type="hidden" value="<?php echo $cumul ?>" name="cumul">
  <input type="hidden" value="<?php echo $typeOffre ?>" name="typeOffre">
  <input type="hidden" value="<?php echo $valueOffre ?>" name="valueOffre">
  <input type="hidden" value="<?php echo $Articles ?>" name="Article">
  <input type="hidden" value="<?php echo $mails ?>" name="mails">
  <input type="hidden" value="<?php echo $descriptionPlan ?>" name="descriptionPlan">

  

<?php
//  for($i=0;$i<$NoPaliers;$i++)
 // {
 //     echo '<input type="hidden" name="DE[]" value="'. $de[$i]. '">';
 //     echo '<input type="hidden" name="A[]" value="'. $A[$i]. '">';
 //     echo '<input type="hidden" name="OffrePal[]" value="'. $OffrePal[$i]. '">';
 //     echo '<input type="hidden" name="valueOffrePal[]" value="'. $valueOffrePal[$i]. '">';
     
   
 // }
                // for ($i=1;$i<=$NoPaliers;$i++) {
                    ?>
          <tr id='addr0'>
            <td>
           1
            </td>
         
            <td>
              <input type="text" name='ArticlesSousCond' placeholder='Article(s) "," between each one' class="form-control" />
            </td>
            <td>
              <select  name='TypeSousCond'  class="form-control"> <option value="QTE">QTE</option><option value="CA">CA</option></select>
            </td>
            <td>
              <input type="text" name='MinToorderSousCond' placeholder='Min to order' class="form-control" />
            </td>
        
          </tr>
                </table>
                <br />
          <?php
                // }
                ?>
                <input class="btn btn-outline-success" type="submit" name="subSousCond" value="Valider">
              </form>
                <?php
      
    }
    // JSON TYPE B
    if(isset($_POST['subSousCond'])){
      
$code=$_POST['code'];
$dateDebut=$_POST['dateDebut'];
$dateFin=$_POST['dateFin'];
$type=$_POST['type'];
$minOrder=$_POST['minOrder'];
$NoPaliers=$_POST['NoPaliers'];
$valueOffre=$_POST['valueOffre'];
$typeOffre=$_POST['typeOffre'];
$cumul=$_POST['cumul'];

$mails=$_POST['mails'];
$descriptionPlan=$_POST['descriptionPlan'];

// $allcustomers=$_POST['allcustomers'];
$allcustomers=$_POST['allcustomers'];
$Articles=$_POST['Article'];


$ArticlesSousCond=$_POST['ArticlesSousCond'];
$TypeSousCond=$_POST['TypeSousCond'];
$MinToorderSousCond=$_POST['MinToorderSousCond'];

// define('CSV_PATH', 'C:\xampp\htdocs\hors');

// if(isset($_POST['cumul'])){
//   $cumul=1;
//  }else{$cumul=0;}

if($_POST['allcustomers']==1){
$customers=1;
}else{$customers=0;}
// if(isset($_POST['Article'])){
//  $Articles=$_POST['Article'];
// }









      $planB = new stdClass();
      $planB->CODE = $code;
      $planB->TYPE = $type;
      $planB->ARTICLES=$Articles;
      $planB->OFFRE=$typeOffre;
      $planB->valueOffre=$valueOffre;
      $planB->valeurMinCondition = intval($minOrder);
      // $planB->paliers = $NoPaliers;
      // $planB->sousCondition = 1;
      $planB->ArticlesSousCond = $ArticlesSousCond;
      $planB->detailsSousCond = $TypeSousCond;
      $planB->minToOrderSousCond = intval($MinToorderSousCond);
      $planB->cumulCommandes=intval($cumul);
      $planB->allCustomers=$customers;
      $planB->specifiqueCustomers=$allcustomers;
      $planB->dateDebut = $dateDebut;
      $planB->dateFin = $dateFin;
      $planB->mails = $mails;
      $planB->descriptionPlan = $descriptionPlan;

   
      
$myJSON = json_encode($planB);

// echo $myJSON;



// $myJSON = json_encode($planA);
$string = file_get_contents("PlansTypeB.json");

// $string = str_replace("[", "", $string);
$string = str_replace("]", "", $string);
$string .= ','.$myJSON."]";

// array_push($testArray, $string);
// array_push($array2, $value);
// $string= json_encode($string);

// echo count($testArray);

$fp = fopen('PlansTypeB.json', 'w');
fwrite($fp, $string);
fclose($fp);


    }
      
       
    
  
    
    
         // Plan de type C
     
        if(isset($_POST['submitDef']) && !isset($_POST['sousCond']) && $_POST['NoPaliers']>1){
          
        define('CSV_PATH', 'C:\xampp\htdocs\hors');
        $code=$_POST['code'];
        $dateDebut=$_POST['dateDebut'];
        $dateFin=$_POST['dateFin'];
        $type=$_POST['type'];
        $minOrder=$_POST['minOrder'];
        $NoPaliers=$_POST['NoPaliers'];
        $valueOffre=$_POST['valueOffre'];
        $typeOffre=$_POST['typeOffre'];
        $mails=$_POST['mails'];
        $descriptionPlan=$_POST['descriptionPlan'];

       if(isset($_POST['cumul'])){
         $cumul=1;
       } else {
        $cumul=0;
       }


        if(isset($_POST['Article'])){  
          $Articles=$_POST['Article'];
        }
       

        if (isset($_FILES['articles'])) {
          $repertoireDestination = dirname(__FILE__)."/";
          $nomDestination        = "articles.csv";
          // $Articles=[];
          if (is_uploaded_file($_FILES["articles"]["tmp_name"])) {
              if (rename(
                  $_FILES["articles"]["tmp_name"],
                  $repertoireDestination.$nomDestination
              )) {
                  // define('CSV_PATH', 'C:\xampp\htdocs\hors');
                  $csv_file = CSV_PATH . "/articles.csv";
                  if (($handle = fopen($csv_file, "r")) !== false) {
                      fgetcsv($handle);
                      while (($data = fgetcsv($handle, 1000, ";")) !== false) {
                          $num = count($data);
                          for ($c=0; $c < $num; $c++) {
                              $col[$c] = $data[$c];
                          }
                          $col0=$col[0];
                          $Articles .= $col[0].',';
       
                          // array_push($Articles,$col[0]);
                      }
                      // echo $Articles; 
                      $Articles= substr($Articles, 0, -1);
                      // echo $Articles; 
       
                      fclose($handle);
                  }
              }
          }
       }


        if(isset($_POST['allcustomers'])){  
          $allcustomers=1;
        }
       if (isset($_FILES['cutomersup'])) {
        $repertoireDestination = dirname(__FILE__)."/";
        $nomDestination        = "cutomersup.csv";
        // $Articles=[];
        if (is_uploaded_file($_FILES["cutomersup"]["tmp_name"])) {
          $allcustomers='';
            if (rename(
                $_FILES["cutomersup"]["tmp_name"],
                $repertoireDestination.$nomDestination
            )) {
                // define('CSV_PATH', 'C:\xampp\htdocs\hors');
                $csv_file = CSV_PATH . "/cutomersup.csv";
                if (($handle = fopen($csv_file, "r")) !== false) {
                    fgetcsv($handle);
                    while (($data = fgetcsv($handle, 1000, ";")) !== false) {
                        $num = count($data);
                        for ($c=0; $c < $num; $c++) {
                            $col[$c] = $data[$c];
                        }
                        $col0=$col[0];
                        $allcustomers .= $col[0].',';
       
                        // array_push($Articles,$col[0]);
                    }
                    $allcustomers= substr($allcustomers, 0, -1);
       
                    fclose($handle);
                }
            }
        }
       }
            ?>
<div class="container">
 <div class="row clearfix">
   <div class="col-md-12 column">
     <table class="table table-bordered table-hover" id="tab_logicPalier">
       <thead>
         <tr>
       
           <th class="text-center">
            N° palier
           </th>
           <th class="text-center">
             De
           </th>
           <th class="text-center">
             A
           </th>
           <th class="text-center">
             Offre
           </th>
           <th class="text-center">
             Valeur
           </th>
         </tr>
       </thead>
       <tbody>
       <form method="POST" action="">
  <input type="hidden" value="<?php echo $code ?>" name="code">
  <input type="hidden" value="<?php echo $dateDebut ?>" name="dateDebut">
  <input type="hidden" value="<?php echo $dateFin ?>" name="dateFin">
  <input type="hidden" value="<?php echo $allcustomers ?>" name="allcustomers">
  <input type="hidden" value="<?php echo $type ?>" name="type">
  <input type="hidden" value="<?php echo $minOrder ?>" name="minOrder">
  <input type="hidden" value="<?php echo $NoPaliers ?>" name="NoPaliers">
  <input type="hidden" value="<?php echo $cumul ?>" name="cumul">
  <input type="hidden" value="<?php echo $typeOffre ?>" name="typeOffre">
  <input type="hidden" value="<?php echo $valueOffre ?>" name="valueOffre">
  <input type="hidden" value="<?php echo $Articles ?>" name="Article">
  <input type="hidden" value="<?php echo $mails ?>" name="mails">
  <input type="hidden" value="<?php echo $descriptionPlan ?>" name="descriptionPlan">


    
         <?php
        // $paliers= $_POST['NoPaliers'];
         for ($i=1;$i<=$NoPaliers;$i++) {
             ?>
         <tr id='addrPalier0'>
           <td>
             <?php echo $i ?>
           </td>
         
           <td>
             <input type="text" name='de[]' placeholder='De' class="form-control" />
           </td>
           <td>
              <input type="text" name='A[]' placeholder='A' class="form-control" />
           </td>
           <td>
             <select name='OffrePal[]' class="form-control" ><option value="AVS">AVS</option><option value="GRATUITE">Gratuité</option><option value="REMISE">Remise</option><option value="GIFT">Gift</option></select>
           </td>
           <td>
             <input type="text" name='valueOffrePal[]' placeholder="Valeur de l'offre" class="form-control" />
           </td>
         </tr>
         <br />
         
         <?php
         }
         ?>
         </table>
    
              <input class="btn btn-outline-success" type="submit" name="subTypeC" value="Valider">
              </form>

              <?php
        }

        // JSON TYPE C
        if(isset($_POST['subTypeC'])){

          $de=$_POST['de'];
          $A=$_POST['A'];
          $OffrePal=$_POST['OffrePal'];
          $valueOffrePal=$_POST['valueOffrePal'];
          $NoPaliers=$_POST['NoPaliers'];
          
  $mails=$_POST['mails'];
  $descriptionPlan=$_POST['descriptionPlan'];
     
$code=$_POST['code'];
$dateDebut=$_POST['dateDebut'];
$dateFin=$_POST['dateFin'];
$type=$_POST['type'];
$minOrder=$_POST['minOrder'];
$NoPaliers=$_POST['NoPaliers'];
$valueOffre=$_POST['valueOffre'];
$typeOffre=$_POST['typeOffre'];
$cumul=$_POST['cumul'];
$Articles=$_POST['Article'];

  if($_POST['allcustomers']==1){
    $allcustomers="";
    $customers=1;
  }else{
    $customers=0;
    $allcustomers=$_POST['allcustomers'];
  
  
  }
        
  $paliersAremplir=[];
  
  for($j=0;$j<$NoPaliers;$j++){          
            $mespaliers = new stdClass();
            $mespaliers -> NoPalier=$j+1;
            $mespaliers -> De=$de[$j];
            $mespaliers -> A=$A[$j];
            $mespaliers -> Offre=$OffrePal[$j];
            $mespaliers -> DetailsOffre=$valueOffrePal[$j];
            array_push($paliersAremplir,$mespaliers);
          }
        
          $myObj = new stdClass();
          $myObj->CODE = $code;
          $myObj->TYPE = $type ;
          $myObj->ARTICLES = $Articles ;
          // $myObj->OFFRE = $typeOffre;
          $myObj->valeurMinCondition = $minOrder;
          $myObj->paliers = $paliersAremplir ;
          $myObj->cumulCommandes = $cumul ;
          $myObj->allCustomers = $customers ;
          $myObj->specifiqueCustomers = $allcustomers ;
          $myObj->dateDebut = $dateDebut ;
          $myObj->dateFin =  $dateFin;

          $myObj-> mails=$mails;
          $myObj->descriptionPlan=$descriptionPlan;

          
$myJSON = json_encode($myObj);

$string = file_get_contents("PlansTypeC.json");

$lengthOf=strlen($string);
// $string = str_replace("]", "", $string);
$string= substr($string, 0, -1);

if($lengthOf==0){
  $string .= '['.$myJSON."]";  
}
elseif($lengthOf==2){
  $string .= $myJSON."]";  
}else{
  $string .= ','.$myJSON."]";
}

$fp = fopen('PlansTypeC.json', 'w');
fwrite($fp, $string);
fclose($fp);        
        }








          // Plan de type D
      if(isset($_POST['submitDef']) &&  isset($_POST['sousCond']) && $_POST['NoPaliers']>1){
        define('CSV_PATH', 'C:\xampp\htdocs\hors');
        $code=$_POST['code'];
        $dateDebut=$_POST['dateDebut'];
        $dateFin=$_POST['dateFin'];
        $type=$_POST['type'];
        $minOrder=$_POST['minOrder'];
        $NoPaliers=$_POST['NoPaliers'];
        $valueOffre=$_POST['valueOffre'];
        $typeOffre=$_POST['typeOffre'];

        
  $mails=$_POST['mails'];
  $descriptionPlan=$_POST['descriptionPlan'];

       if(isset($_POST['cumul'])){
         $cumul=1;
       } else {
        $cumul=0;
       }


        if(isset($_POST['Article'])){  
          $Articles=$_POST['Article'];
        }
       

        if (isset($_FILES['articles'])) {
          $repertoireDestination = dirname(__FILE__)."/";
          $nomDestination        = "articles.csv";
          // $Articles=[];
          if (is_uploaded_file($_FILES["articles"]["tmp_name"])) {
              if (rename(
                  $_FILES["articles"]["tmp_name"],
                  $repertoireDestination.$nomDestination
              )) {
                  // define('CSV_PATH', 'C:\xampp\htdocs\hors');
                  $csv_file = CSV_PATH . "/articles.csv";
                  if (($handle = fopen($csv_file, "r")) !== false) {
                      fgetcsv($handle);
                      while (($data = fgetcsv($handle, 1000, ";")) !== false) {
                          $num = count($data);
                          for ($c=0; $c < $num; $c++) {
                              $col[$c] = $data[$c];
                          }
                          $col0=$col[0];
                          $Articles .= $col[0].',';
       
                          // array_push($Articles,$col[0]);
                      }
                      // echo $Articles; 
                      $Articles= substr($Articles, 0, -1);
                      // echo $Articles; 
       
                      fclose($handle);
                  }
              }
          }
       }


        if(isset($_POST['allcustomers'])){  
          $allcustomers=1;
        }
       if (isset($_FILES['cutomersup'])) {
        $repertoireDestination = dirname(__FILE__)."/";
        $nomDestination        = "cutomersup.csv";
        // $Articles=[];
        if (is_uploaded_file($_FILES["cutomersup"]["tmp_name"])) {
          $allcustomers='';
            if (rename(
                $_FILES["cutomersup"]["tmp_name"],
                $repertoireDestination.$nomDestination
            )) {
                // define('CSV_PATH', 'C:\xampp\htdocs\hors');
                $csv_file = CSV_PATH . "/cutomersup.csv";
                if (($handle = fopen($csv_file, "r")) !== false) {
                    fgetcsv($handle);
                    while (($data = fgetcsv($handle, 1000, ";")) !== false) {
                        $num = count($data);
                        for ($c=0; $c < $num; $c++) {
                            $col[$c] = $data[$c];
                        }
                        $col0=$col[0];
                        $allcustomers .= $col[0].',';
       
                        // array_push($Articles,$col[0]);
                    }
                    $allcustomers= substr($allcustomers, 0, -1);
       
                    fclose($handle);
                }
            }
        }
       }
          
            ?>
<div class="container">
 <div class="row clearfix">
   <div class="col-md-12 column">
       <br />
     <table class="table table-bordered table-hover" id="tab_logicPalier">
       <thead>
         <tr>
         <th class="text-center">
           
           </th>
           <th style="background-color:#d1e0e0" class="text-center" COLSPAN=3>
         Définition de la sous condition
           </th>
           <th  style="background-color:#80aaff"   class="text-center" COLSPAN=4>
         Définition des intervalles et de l'offre
           </th>
      </tr>
         <tr>
         <!--   <th class="text-center">
             #
           </th> -->
           <th class="text-center">
            N° palier
           </th>
           <th class="text-center">
             Articles Sous condition
           </th>
           <th class="text-center">
             Type sous cond
           </th>
           <th class="text-center">
             Min to order Sous cond
           </th>
           <th class="text-center">
             De
           </th>
           <th class="text-center">
             A
           </th>
           <th class="text-center">
             Offre
           </th>
           <th class="text-center">
             Valeur
           </th>
         </tr>
       </thead>
       <tbody>
           <form action="" method="POST">  
  <input type="hidden" value="<?php echo $code ?>" name="code">
  <input type="hidden" value="<?php echo $dateDebut ?>" name="dateDebut">
  <input type="hidden" value="<?php echo $dateFin ?>" name="dateFin">
  <input type="hidden" value="<?php echo $allcustomers ?>" name="allcustomers">
  <input type="hidden" value="<?php echo $type ?>" name="type">
  <input type="hidden" value="<?php echo $minOrder ?>" name="minOrder">
  <input type="hidden" value="<?php echo $NoPaliers ?>" name="NoPaliers">
  <input type="hidden" value="<?php echo $cumul ?>" name="cumul">
  <input type="hidden" value="<?php echo $typeOffre ?>" name="typeOffre">
  <input type="hidden" value="<?php echo $valueOffre ?>" name="valueOffre">
  <input type="hidden" value="<?php echo $Articles ?>" name="Article">
  
  <input type="hidden" value="<?php echo $mails ?>" name="mails">
  <input type="hidden" value="<?php echo $descriptionPlan ?>" name="descriptionPlan">
  
         <?php
        $paliers= $_POST['NoPaliers'];
         for ($i=1;$i<=$paliers;$i++) {
             ?>
         <tr id='addrPalier0'>
           <td>
             <?php echo $i ?>
           </td>
           <td>
             <input type="text" name='articlesSousCond[]' placeholder='"," between articles' class="form-control" />
           </td>
           <td>
           <select name='typeSouscond[]' class="form-control" ><option value="QTE">Qte</option><option value="CA">CA</option></select>
           </td>
           <td>
             <input type="text" name='minSouscond[]' placeholder='Min to order sous cond' class="form-control" />
           </td>
           <td>
             <input type="text" name='De[]' placeholder='De' class="form-control" />
           </td>
           <td>
              <input type="text" name='A[]' placeholder='A' class="form-control" />
           </td>
           <td>
           <select name='OffrePal[]' class="form-control" ><option value="AVS">AVS</option><option value="GRATUITE">Gratuité</option><option value="REMISE">Remise</option><option value="GIFT">Gift</option></select>
             </td>
           <td>
             <input type="text" name='valueOffre[]' placeholder="Valeur de l'offre" class="form-control" />
           </td>
         </tr>
         <?php
         }
         ?>
          </table>
          <input class="btn btn-outline-success" type="submit" name="subTypeD" value="Valider">
          
        </form>
    <?php    
    }
if(isset($_POST['subTypeD'])){

$articlesSousCond=$_POST['articlesSousCond'];
$typeSouscond=$_POST['typeSouscond'];
$minSouscond=$_POST['minSouscond'];
$De=$_POST['De'];
$A=$_POST['A'];
$OffrePal=$_POST['OffrePal'];
$valueOffre=$_POST['valueOffre'];

$mails=$_POST['mails'];
  $descriptionPlan=$_POST['descriptionPlan'];

$code=$_POST['code'];
$dateDebut=$_POST['dateDebut'];
$dateFin=$_POST['dateFin'];
$type=$_POST['type'];
$minOrder=$_POST['minOrder'];
$NoPaliers=$_POST['NoPaliers'];
$valueOffre=$_POST['valueOffre'];
$typeOffre=$_POST['typeOffre'];
$cumul=$_POST['cumul'];
$Articles=$_POST['Article'];

  if($_POST['allcustomers']==1){
    $allcustomers="";
    $customers=1;
  }else{
    $customers=0;
    $allcustomers=$_POST['allcustomers'];
  }
        
  $paliersAremplir=[];
  





  for($j=0;$j<$NoPaliers;$j++){   
     
            $mespaliers = new stdClass();
            $mespaliers -> NoPalier=$j+1;
            $mespaliers -> De=intval($De[$j]);
            $mespaliers -> A=intval($A[$j]);
            $mespaliers -> Offre=$OffrePal[$j];
            $mespaliers -> DetailsOffre=$valueOffre[$j];
            $mespaliers -> ArticlesSousCond = $articlesSousCond[$j];
            $mespaliers -> detailsSousCond = $typeSouscond[$j] ;
            $mespaliers -> minToOrderSousCOnd = intval($minSouscond[$j]);
            array_push($paliersAremplir,$mespaliers);
          }
        
          $myObj = new stdClass();
          $myObj->CODE = $code;
          $myObj->TYPE = $type ;
          $myObj->ARTICLES = $Articles ;
          // $myObj->OFFRE = $typeOffre;
        //   $myObj->valeurMinCondition = $minOrder;
          $myObj->valeurMinCondition =   $De[0];
          $myObj->paliers = $paliersAremplir ;
          $myObj->cumulCommandes = intval($cumul) ;
          $myObj->allCustomers = $customers ;
          $myObj->specifiqueCustomers = $allcustomers ;
          $myObj->dateDebut = $dateDebut ;
          $myObj->dateFin =  $dateFin;
          
 $myObj-> mails=$mails;
 $myObj->descriptionPlan=$descriptionPlan;

          
$myJSON = json_encode($myObj);

$string = file_get_contents("PlansTypeD.json");

$lengthOf=strlen($string);
// $string = str_replace("]", "", $string);
$string= substr($string, 0, -1);

if($lengthOf==0){
  $string .= '['.$myJSON."]";  
}
elseif($lengthOf==2){
  $string .= $myJSON."]";  
}else{
  $string .= ','.$myJSON."]";
}

$fp = fopen('PlansTypeD.json', 'w');
fwrite($fp, $string);
fclose($fp);   




}
?>

        </tbody>
      </table>
    </div>
  </div>
</div>

         </DIV>
        
         
      </TD>
      
      </TR>
    
  </TABLE>
 
</BODY>
</HTML>

