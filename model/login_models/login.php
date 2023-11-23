<?php
require_once("../connection_models/db_conn.php");
include "../connection_models/db_conn.php";
include "login_functions.php";
include "../session_models/create_session.php";

session_start();
if(isset($_POST['email'], $_POST['password'])) {
    if(login($_POST['email'], $_POST['password'], $conn)) {
        $response = array("success" => true);
    } else {
        $response = array("success" => false);
    }
} else {
    $response = array("success" => false);
}

echo json_encode($response);

$conn->close();
?>