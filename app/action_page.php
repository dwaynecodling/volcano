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


// DETAILS
if (empty($_POST["details"])) {
    $errorMSG .= "Details is required ";
} else {
    $details = $_POST["details"];
}


$EmailTo = "hello@wearevolcano.com";
$Subject = "New Contact Form Submission";

// prepare email body text
$Body = "A visitor from WEAREVOLCANO.COM has submitted the following requirements:";

$Body .= "\n";
$Body .= "\n";

$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "\n";

$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "\n";

$Body .= "Telephone: ";
$Body .= $telephone;
$Body .= "\n";
$Body .= "\n";

$Body .= "Details: ";
$Body .= $details;
$Body .= "\n";
$Body .= "\n";

$Body .= "Please respond to this enquiry within 24 hours.";
$Body .= "\n";
$Body .= "\n";

$Body .= "Kind regards";
$Body .= "\n";
$Body .= "\n";

$Body .= "WEAREVOLCANO.COM TEAM";

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