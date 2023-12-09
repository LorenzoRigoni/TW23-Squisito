<?php
/**
 * This file contains the model for checking if the logged user follows another user.
 */

include '../login_models/login_functions.php';
require_once("../connection_models/db_conn.php");

$query = "SELECT *
        FROM seguiti S
        WHERE S.EmailFollower = ? AND S.EmailSeguito = ?";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("ss", $_SESSION['userEmail'], $_GET['email']);
        if ($selectQuery->execute()) {
            $results = $selectQuery->get_result();
            echo $results->num_rows == 1;
        } else {
            echo json_encode(array("error" => $selectQuery->error));
        }
    } else {
        echo json_encode(array("error" => $selectQuery->error));
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

$conn->close();
?>