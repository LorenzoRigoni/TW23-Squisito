<?php
require_once("../connection_models/db_conn.php");
include "../connection_models/db_conn.php";
include "login_functions.php";

session_start();
if(isset($_POST['email'], $_POST['password'])) {
    if(login($_POST['email'], $_POST['password'], $conn)) {
        $response = array(
            "success" => true,
            "emailUtente" => $_POST['email']
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