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
      <a class="nav-item nav-link active" href="downloadResults.php">Téléchargement des résultats</a>
      <a class="nav-item nav-link" href="modifyJsonTable.php">Modifications des destinataires et signataires</a>
     
    </div>
  </div>
</nav> -->
<?php

session_start(); 
$_SESSION['SomeVar'] = 'download';
include('menu.php');
?>
<!-- </HEAD> -->
<?php

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

$dir = 'C:\xampp\htdocs\hors\PlansJSON';
// $dir    = 'C:\Users\W.NADIFI\node-js-jwt\PlansJSON';

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
    // $filesxx[]=arsort($filesxx);
?>
<!-- <BODY > -->
    <br />
<table id="example" class="table">
        <thead class="thead-light">
            <tr>
                <th>FileName</th>
                <th>Link</th>
            </tr>

        </thead>
        <tbody>
<?php
foreach ($filesxx  as $idx  ) {
    $thePath=$idx['PATH'];
    $theDir=$idx['DIR'];
    ?>

<tr>
<td><?php echo $theDir ?> </td>
<td><b> <a style='color:black' href='downloader.php?doc=<?php echo $thePath ?>'> Download</a> </b></td>
</tr>

<?php
}
?>
</tbody>
</table>

 
</BODY>
</HTML>

