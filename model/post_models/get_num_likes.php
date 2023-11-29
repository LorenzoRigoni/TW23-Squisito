<?php
include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "SELECT COUNT(*) AS NumLike
        FROM mi_piace M 
        WHERE M.IDPost = ?";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("i", $_GET['IDPost']);
        if ($selectQuery->execute()) {
            echo $selectQuery->get_result()->fetch_assoc()['NumLike'];
        } else {
            echo json_encode(array("error" => $selectQuery->error));
        }
    } else {
        echo json_encode(array("error" => $conn->error));
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

$conn->close();

?>
