<?php
/**
 * This file contains the method for setting the session variables.
 */

/**
 * Function that sets the session variables with params value.
 * @param string $email The email of the user
 */
function setSession($email) {
    session_start();
    $_SESSION['userEmail'] = $email;
}
?>