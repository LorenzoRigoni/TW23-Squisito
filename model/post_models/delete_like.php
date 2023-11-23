<?php
include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "DELETE FROM mi_piace
        WHERE IDPost = ? AND EmailUtente = ?";

if (checkLogin($conn)) {
    if ($deleteQuery = $conn->prepare($query)) {
        $deleteQuery->bind_param("is", $_GET['IDPost'], $_GET['email']);
        if ($deleteQuery->execute()) {
            echo json_encode(array("response" => true));
        } else {
            echo json_encode(array("error" => $deleteQuery->error));
        }
    } else {
        echo json_encode(array("error" => $deleteQuery->error));
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

$conn->close();
?>