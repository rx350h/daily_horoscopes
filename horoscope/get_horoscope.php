<?php

function generate_horoscope($sign){
	
	$prompt = "Your role is an expert in astrology and creating horoscopes, write horoscope for tomorow: ${sign}";
	
	$curl = curl_init();

	$headers = array(
		'Content-Type: application/json',
		'Authorization: Bearer API KEY'
	);
	
	$messages = array(
		"role" => "user", 
		"content" => "$prompt"
	);

	$data = array(
		"model" => "gpt-3.5-turbo",
		"messages" => [$messages],
		"temperature" => 1,
		"max_tokens" => 600,
		"top_p" => 1,
		"frequency_penalty" => 0,
		"presence_penalty"=> 0  
	);

	curl_setopt($curl, CURLOPT_URL, 'https://api.openai.com/v1/chat/completions');
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_ENCODING, '');
	curl_setopt($curl, CURLOPT_MAXREDIRS, 10);
	curl_setopt($curl, CURLOPT_TIMEOUT, 0);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($curl, CURLOPT_HTTP_VERSION, 'CURL_HTTP_VERSION_1_1');
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data, true));
	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);


	$response = curl_exec($curl);

	curl_close($curl);

	$parsed_response = json_decode($response, true);
	
	print_r($parsed_response);
	
	return $parsed_response['choices'][0]['message']['content'];

}

$sign_arr = [
	'Aries',
	'Taurus',
	'Gemini',
	'Cancer',
	'Leo',
	'Virgo',
	'Libra',
	'Scorpio',
	'Sagittarius',
	'Capricorn',
	'Aquarius',
	'Pisces'
];

$response = [];
foreach($sign_arr as $key => $value){
	$horoscope = generate_horoscope($value);
	$response[$value][] = $horoscope;
	sleep(30);
}

$content = json_encode($response, true);

appendOrCreateFile('/var/www/html/for-example.shop/for-example.shop/horoscope/horoscope.json', $content);

function appendOrCreateFile($filePath, $content) {
	// Если файл не существует, создаем его
	if (!file_exists($filePath)) {
	  $handle = fopen($filePath, 'w+');
	  fclose($handle);
	}
	
	// Открываем файл на запись и перемещаем указатель в конец файла
	$handle = fopen($filePath, 'w+');
	// Записываем содержимое в файл
	fwrite($handle, $content);
	// Закрываем файл
	fclose($handle);
}


?>