?>

<?php // Initialize variables to null.
$services =""; // Sender Name
$name =""; // Sender's email ID
$tel =""; // Subject of mail
$email =""; // Sender's Message
$servicesError ="";
$nameError ="";
$telError ="";
$emailError ="";
$successMessage =""; // On submittingform below function will execute.
if(isset($_POST['submit'])) { // Checking null values in message.
if (empty($_POST["services"])){
$servicesError = "What services you are interested in";
}
else
 {
$name = test_input($_POST["services"]); // check name only contains letters and whitespace
if (!preg_match("/^[a-zA-Z ]*$/",$services))
{
$servicesError = "Sorry, only letters and spaces are allowed";
}
} // Checking null values inthe message.
if (empty($_POST["name"]))
{
$nameError = "Please provide us with a contact name";
}
else
 {
$name = test_input($_POST["name"]);
} // Checking null values inmessage.
if (empty($_POST["tel"]))
{
$telError = "Contact number required";
}
else
{
$tel = test_input($_POST["tel"]);
} // Checking null values inmessage.
if (empty($_POST["email"]))
{
$emailError = "Valid email required";
}
else
 {
$email = test_input($_POST["email"]);
} // Checking null values inthe message.
if( !($services=='') && !($name=='') && !($tel=='') &&!($email=='') )
{ // Checking valid email.
if (preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email))
{
$header= $name."<". $email .">";
  $headers = "From: $youremail";
$msg = "Hello! $name Thank you...! For Contacting Us.
Name: $name
E-mail: $email
Purpose: $purpose
Message: $message
This is a Contact Confirmation mail. We Will contact You as soon as possible.";
$msg1 = " $name Contacted Us. Hereis some information about $name.
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
} // Function for filtering input values.function test_input($data)
{
$data = trim($data);
$data =stripslashes($data);
$data =htmlspecialchars($data);
return $data;
}
?>


<!DOCTYPE HTML>
<html>
<head>

<title>Thanks!</title>

</head>
<body>
	<div id="" class="">
<img class="contact-form" src="images/svg/contact-form-graphic.svg"/>
<h1>Thanks for your Enquiry</h1>
<p>We'll get back to you as soon as possible.</p>
</div>
</body>
</html>
