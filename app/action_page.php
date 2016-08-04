<?php
$services = $_POST['services'];
$details = $_POST['details'];
$name = $_POST['name'];
$tel = $_POST['tel'];
$email = $_POST['email'];
$security = $_POST['security'];

$to = "dwayneandrecodling@gmail.com";
$subject = "New Contact Form Submission";
$message = "A Visitor from WEAREVOLCANO.COM has submitted the following requirements. 
\n\n Services: $services\n\n Details: $details \n\n Name: $name \n\n Telephone: $tel \n\n Email: $email
\n\n Please respond to this enquiry within 24 hours. \n\n Kind regards\n WEAREVOLCANO.COM TEAM";


if ($security=="10") {
	mail($to,$subject,$message);
	header("Location:index.html?s=1");


}

else {
	header("Location:index.html?s=2");
}


?>