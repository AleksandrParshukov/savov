<?
	$name = $_POST['name'];
	$phone = $_POST['mail'];

	$subject = 'Запрос обратной связи';
	$emailTo = 'porshe97@yandex.ru';
	$body = "Имя: ".$name." \n\nТелефон: ".$phone;
	mail($emailTo, $subject, $body);
?>