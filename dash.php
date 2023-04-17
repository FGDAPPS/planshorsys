<?php 


// print_r(exec('ping 192.168.2.200'));


// $ping = exec('ping  192.168.2.200');
// echo $ping;


// pingAddress('192.168.2.200');

// $array=['192.168.2.200','192.168.2.212','192.168.2.213','192.168.5.213'];

$array = explode("\n", file_get_contents('ips.txt'));

foreach ($array as $value) {
pingAddress($value);
}
// $pingResult=shell_exec("start /b ping 192.168.2.200 -n 1");
// $posi=strpos($pingResult,$search);
// echo $posi;

// echo $pingResult;

function pingAddress($ip){
	
    $pingresult = shell_exec("ping $ip -n 1");
   // $pingresult= iconv($pingresult);
    // $enc=  mb_detect_encoding($pingresult, "UTF-8,ISO-8859-1");

    // $pingresult=iconv($enc, "UTF-8", $pingresult);
//     $pingresult= Encoding::toUTF8($pingresult);

$search='Paquets';
$perd='perdus';
    // $dead = "Request timed out.";
    // $deadoralive = strpos($dead, $pingresult);
    $posi=strpos($pingresult,$search);
    $posiPerdu=strpos($pingresult,$perd);
// echo $posiPerdu;


	// $mystr=substr($pingresult, 190);
    preg_match_all('!\d+!', $pingresult, $matches);
		// $mystr=substr($pingresult, 213);
  // print_r($matches); 

    if(isset($matches[0][17]) && isset($matches[0][18]) && isset($matches[0][16])){
    	echo ' <b><font color="green"> Adresse IP: </font> </b>'.$ip.'<br />';
    	echo 'Envoyé : '.$matches[0][16].'<br />';
    	echo 'Recu: '.$matches[0][17].'<br />';
    	echo 'Perdu: '.$matches[0][18].'<br /><br />';



    }
    if(!isset($matches[0][17]) || !isset($matches[0][18])   || !isset($matches[0][16])  && !is_null($ip) ){

    	echo '<b><font color="red">Adresse IP: </font> </b>'.$ip.'<br />';
    	// echo 'Envoyé : '.$matches[0][16].'<br />';
    	echo 'ERREUR'.'<br /><br />';
    }
  // echo $matches[17];


// echo $pingresult;

    // echo   $mystr;

   // echo iconv('UTF-8', 'ISO-8859-1//TRANSLIT//IGNORE', $pingresult);

   
}



?>
