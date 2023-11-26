<?php
include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "INSERT INTO mi_piace (IDPost, EmailUtente)
        VALUES (?, ?)";

session_start();
if (checkLogin($conn)) {
    if ($insertQuery = $conn->prepare($query)) {
        $insertQuery->bind_param("is", $_GET['IDPost'], $_SESSION['userEmail']);
        if ($insertQuery->execute()) {
            echo json_encode(array("response" => true));
            /*Fare discorso notifiche*/
        } else {
            echo json_encode(array("error" => $insertQuery->error));
        }
    } else {
        echo json_encode(array("error" => $insertQuery->error));
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

$conn->close();
?>