<?php
/**
 * This file contains the method for setting the session variables.
 */

/**
 * Function that sets the session variables with params value.
 * @param string $email The email of the user
 * @param string $login_string The string of login
 */
function setSession($email, $login_string) {
    session_start();
    $_SESSION['userEmail'] = $email;
    $_SESSION['login_string'] = $login_string;
}
?>