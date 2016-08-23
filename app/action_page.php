<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["email"];
}

// TELEPHONE
if (empty($_POST["telephone"])) {
    $errorMSG .= "Telephone number is required ";
} else {
    $telephone = $_POST["telephone"];
}

// SERVICES MESSAGE
if (empty($_POST["services"])) {
    $errorMSG .= "Services is required ";
} else {
    $services = $_POST["services"];
}

// MESSAGE
if (empty($_POST["details"])) {
    $errorMSG .= "Details is required ";
} else {
    $details = $_POST["details"];
}


$EmailTo = "dwayneandrecodling@gmail.com";
$Subject = "Wearevolcano Contact Form";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Telephone: ";
$Body .= $telephone;
$Body .= "\n";
$Body .= "Services: ";
$Body .= $services;
$Body .= "\n";
$Body .= "Details: ";
$Body .= $details;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>