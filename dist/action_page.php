<?php // Initialize variables to null.
$services =""; 
$name =""; 
$tel =""; 
$email =""; 
$servicesError ="";
$nameError ="";
$telError ="";
$emailError ="";

$successMessage =""; 
if(isset($_POST['submit'])) { 
if (empty($_POST["name"])){
$servicesError = "A short description is required";
}
else
 {
$services = test_input($_POST["services"]); 
if (!preg_match("/^[a-zA-Z ]*$/",$services))
{
$servicesError = "Only letters and white space allowed";
}
} 
if (empty($_POST["email"]))
{
$nameError = "Contact Name required";
}
else
 {
$name = test_input($_POST["name"]);
} if (empty($_POST["tel"]))
{
$telError = "Contact number required";
}
else
{
$tel = test_input($_POST["tel"]);
}
if (empty($_POST["email"]))
{
$emailError = "Valid email is required";
}
else
 {
$email = test_input($_POST["email"]);
} 
if( !($services=='') && !($name=='') && !($tel=='') &&!($email=='') )
{ 
if (preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email))
{
$header= $name."<". $email .">";
$headers = "FormGet.com"; /* Let's prepare the message for the e-mail */
$msg = "Hello! $name Thank you...! For Contacting Us.
Name: $name
E-mail: $email
Purpose: $purpose
Message: $message
This is a Contact Confirmation mail. We Will contact You as soon as possible.";
$msg1 = " $name Contacted Us. Here is some information about $name.
Name: $name
E-mail: $email
Purpose: $purpose
Message: $message "; /* Send the message using mail() function */
if(mail($email, $headers, $msg ) && mail("dwayneandrecodling@gmail.com", $header, $msg1 ))
{
$successMessage = "Message sent successfully.......";
}
}
else
{ $emailError = "Invalid Email";
 }
 }
} {
$data = trim($data);
$data =stripslashes($data);
$data =htmlspecialchars($data);
return $data;
}
?>

