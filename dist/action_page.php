
<?php
// if the url field is empty
if(isset($_POST['url']) && $_POST['url'] == ''){
	// put your email address here
	$youremail = 'dwayneandrecodling@gmail.com';
	// prepare a "pretty" version of the message
	// Important: if you added any form fields to the HTML, you will need to add them here also

	$body = "This is the form that was just submitted:
	Name:  $_POST[name]
	E-Mail: $_POST[email]
	Telephone: $_POST[tel]
	Services: $_POST[services]
	Message: $_POST[details]";
	// Use the submitters email if they supplied one
	// (and it isn't trying to hack your form).
	// Otherwise send from your email address.
	if( $_POST['email'] && !preg_match( "/[\r\n]/", $_POST['email']) ) {
	  $headers = "From: $_POST[email]";
	} else {
	  $headers = "From: $youremail";
	}
	// finally, send the message
	mail($youremail, 'Contact Form', $body, $headers );
}
// otherwise, let the spammer think that they got their message through

?>


<!DOCTYPE HTML>
<html>
<head>

<title>Thanks!</title>

</head>
<body>

<header>
	<h1>Simple Confirmation Popup</h1>
</header>

<a href="#0" class="cd-popup-trigger">View Pop-up</a>

<div class="cd-popup" role="alert">
	<div class="cd-popup-container">


	
<img class="contact-form" src="images/svg/contact-form-graphic.svg"/>
<h1>Thanks for your Enquiry</h1>
<p>We'll get back to you as soon as possible.</p>


		<p>Are you sure you want to delete this element?</p>
		<ul class="cd-buttons">
			<li><a href="#0">Yes</a></li>
			<li><a href="#0">No</a></li>
		</ul>
		<a href="#0" class="cd-popup-close img-replace">Close</a>
	</div> <!-- cd-popup-container -->
</div> <!-- cd-popup -->

</body>
</html>
