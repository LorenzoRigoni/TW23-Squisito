<?php
include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "DELETE FROM post
        WHERE IDPost = ?";

session_start();
if (checkLogin($conn)) {
    if ($insert = $conn->prepare($query)) {
        $insert->bind_param('i', $_POST['IDPost']);
        if ($insert->execute()) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("error" => $insert->error));
        }
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}
$conn->close();
?>