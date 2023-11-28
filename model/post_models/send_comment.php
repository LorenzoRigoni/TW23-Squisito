<?php
include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "INSERT INTO commenti(EmailUtente, IDPost, Contenuto, DataCommento)
        VALUES (?, ?, ?, CURRENT_DATE())";

session_start();
if (checkLogin($conn)) {
    if ($insert = $conn->prepare($query)) {
        $insert->bind_param("sis", $_SESSION['userEmail'], $_POST['IDPost'], $_POST['Contenuto']);
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