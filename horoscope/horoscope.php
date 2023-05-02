<?php header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');

$all_data = json_decode(file_get_contents('php://input'), true);


$lang = htmlspecialchars($all_data[lang]);
$sign = htmlspecialchars($all_data[sign]);
$pos = htmlspecialchars($all_data[pos]);



if($lang){

	$data = file_get_contents('horoscope.json');
	
    $parsed_data = json_decode($data, true);

    $value = $parsed_data[$sign];

	if ($value != null) {
		echo $value;
	} else {

		echo '';
	}
	
}
		
	 
	

?>