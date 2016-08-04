<?php

$s=$_GET['s'];

if ($s=="1") {
  echo ('<span class = "success"> Success! Your enquiry have been sent to the Volcano Team. Please allow 24hours for a response.</span>');
}

else if ($s=="2") {
  echo ('<span class = "fail"> Sorry! Your enquiry have not been sent to the Volcano Team. Please ensure you have filled in the form correctly.</span>');
}

?>