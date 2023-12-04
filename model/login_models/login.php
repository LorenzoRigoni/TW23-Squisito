<?php
/**
 * This file contains the model for the login of user.
 */

require_once("../connection_models/db_conn.php");
include "../connection_models/db_conn.php";
include "login_functions.php";

session_start();
if(isset($_POST['email'], $_POST['password'], $_POST['ricordami'])) {
    if(login($_POST['email'], $_POST['password'], $conn, $_POST['ricordami'])) {
        $response = array(
            "success" => true,
            "emailUtente" => $_SESSION['userEmail'],
            "loginString" => $_SESSION['login_string']
        );
    } else {
        $response = array("success" => false);
    }
} else {
    $response = array("success" => false);
}
$conn->close();

echo json_encode($response);
?>