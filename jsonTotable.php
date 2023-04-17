<?php 

$json=file_get_contents("PlansTypeA.json");
$data =  json_decode($json);



?>


<table border="1px">
    <tr>

<th>CODE</th>
<th>TYPE</th>
<th>ARTICLES</th>
<th>OFFRE</th>
<th>valueOffre</th>
<th>valeurMinCondition</th>
<th>cumulCommandes</th>
<th>allCustomers</th>
<th>specifiqueCustomers</th>
<th>dateDebut</th>
<th>dateFin</th>
</tr>

<?php
// foreach ($datas as $data) {
// echo '
// <tr>
// <td>'.$data['CODE'].'</td>
// </tr>
// ';

// }


// if (count($data->stand)) {
    // Open the table
    // echo "<table>";

    // Cycle through the array
    foreach ($data as $idx => $stand) {

        // Output a row
        echo "<tr>
<td>$stand->CODE</td>
<td>$stand->TYPE </td>
<td>$stand->ARTICLES </td>
<td>$stand->OFFRE </td>
<td>$stand->valueOffre </td>
<td>$stand->valeurMinCondition </td>
<td>$stand->cumulCommandes </td>
<td>$stand->allCustomers </td>
<td>$stand->specifiqueCustomers </td>
<td>$stand->dateDebut </td>
<td>$stand->dateFin </td>
       ";
    }

    // Close the table
    echo "</table>";
// }

// $items[] = array(
//     "CODE"  => $CodeGroupTarifaire[$i] ,	
//     "NOM"  => $CodeGroupTarifaire[$i] ,	
//     "TYPEGRP"  =>  3,	
//     "UTILISATEUR"  =>  $username,	
//     "DATESAISIE"  => date("Ymd"),
//     "HeureSaisie"  => date("Hi"),	
//     "ACTIVE"  =>  1);

function endsWith( $haystack, $needle ) {
    $length = strlen( $needle );
    if( !$length ) {
        return true;
    }
    return substr( $haystack, -$length ) === $needle;
}

function startsWith( $haystack, $needle ) {
    $length = strlen( $needle );
    return substr( $haystack, 0, $length ) === $needle;
}

$dir    = 'C:\Users\W.NADIFI\node-js-jwt\PlansJSON';

$filesA [] = array(
    "PATH"  => $dir.'/Type A',	
    "DIR"  => scandir($dir.'/Type A'));

    foreach (scandir($dir.'/Type A') as $file) {
      
        if (!in_array(trim($file), ['.', '..'])) {
            if (endsWith($file,'xlsx')) {
                if (!startsWith($file, '~')) {
                    // if (strtolower($fileinfo[extension]) == "xlsx") {
                
                    $filesxx[] = array(
                "PATH"  => $dir.'/Type A'.'/'.$file,
                "DIR"  => $file);
                }
        }  
            }
    }
    foreach (scandir($dir.'/Type B') as $file) {
      
        if (!in_array(trim($file), ['.', '..'])) {
            if (endsWith($file,'xlsx')) {
                if (!startsWith($file, '~')) {

            // if (strtolower($fileinfo[extension]) == "xlsx") {
                
                    $filesxx[] = array(
                "PATH"  => $dir.'/Type B'.'/'.$file,
                "DIR"  => $file);
                }
        }  
            }
    }
    foreach (scandir($dir.'/Type C') as $file) {
      
        if (!in_array(trim($file), ['.', '..'])) {
            if (endsWith($file,'xlsx')) {
            // if (strtolower($fileinfo[extension]) == "xlsx") {
                if (!startsWith($file, '~')) {
                    $filesxx[] = array(
                "PATH"  => $dir.'/Type C'.'/'.$file,
                "DIR"  => $file);
                }
        }  
            }
    }
    foreach (scandir($dir.'/Type D') as $file) {
      
        if (!in_array(trim($file), ['.', '..'])) {
            if (endsWith($file,'xlsx')) {
            // if (strtolower($fileinfo[extension]) == "xlsx") {
                if (!startsWith($file, '~')) {
                    $filesxx[] = array(
                "PATH"  => $dir.'/Type D'.'/'.$file,
                "DIR"  => $file);
                }
        }  
            }
    }
$filesB = scandir($dir.'/Type B');
// print_r($filesB );
$filesC = scandir($dir.'/Type C');
$filesD = scandir($dir.'/Type D');

// $scannedFiles = scandir($dir);
$files = [];
$filets = [];

// foreach ($filesA as $file->$val) {
//     if (!in_array(trim($file->DIR), ['.', '..'])) {
//         $filets[] = $file;
//     }
// }
foreach ($filesB as $file) {
    if (!in_array(trim($file), ['.', '..'])) {
        $files[] = $file;
    }
}
foreach ($filesC as $file) {
    if (!in_array(trim($file), ['.', '..'])) {
        $files[] = $file;
    }
}
foreach ($filesD as $file) {
    if (!in_array(trim($file), ['.', '..'])) {
        $files[] = $file;
    }
}

// print_r($filets);
$allFile=[];
$donedata=[];

// foreach ($files2 as $file2) {
//     if ($file2 != '.' && $file2 != '..') {
//         array_push($allFile, scandir($dir.'/'.$file2));
//     }
// }

// foreach ($allFile as $file2) {
//     echo $file2;
//     if ($file2 !== '.' && $file2 !== '..') {
//         array_push($donedata, $file2);
//     }
// }

// print_r($allFile);
// echo '<br />';
// echo '<br />';
// print_r($donedata);
?>

<table border="1px">
    <tr>
        <th>File Name</th>
        <th>Link</th>
</tr>
<?php
foreach ($filesxx  as $idx  ) {
    // ($data as $idx => $stand) 
    echo "<tr>
    <td>".$idx['DIR']."</td>
    <td>  <b> <a style='color:black' href='downloader.php?doc=".$idx['PATH']."'>
    Download</a> </b></td>
    
    ";
}
?>
</table>