<?php
/**
 * This file contains the model for getting the number of likes of a post.
 */

include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "SELECT COUNT(*) AS NumLike, M.IDPost
        FROM mi_piace M 
        WHERE M.IDPost = ?";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("i", $_GET['IDPost']);
        if ($selectQuery->execute()) {
            $results = $selectQuery->get_result()->fetch_assoc();
            echo json_encode($results);
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