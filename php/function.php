<?php

if ($_POST) {
    $name = $_POST['user_name'];
    $mail = $_POST['user_email'];
    $phone = $_POST['user_tel'];
    $choice = $_POST['user_choice'];

    if ( !$_SESSION['posted'] ) {
    $to = "kholina.victoria@gmail.com"; 
    $headers = "Content-type: text/plain; charset = utf-8";
    $subject = "message from site";
    $message = "\n\nName: $name \n\nPhone number: $phone \n\nEmail: $mail \n\nChoice: $choice";
    $send = mail($to, $subject, $message, $headers);
    if ($send == 'true')
    {
    echo "Thank you for sending your message";
    }
    else 
    {
    echo "Sorry, an error occurred. The message has not been sent!";
    }
    $_SESSION['posted'] = true;
    }
}
?>
