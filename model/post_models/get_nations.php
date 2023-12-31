<?php
/**
 * This file contains the model for getting the nations to associate to a post.
 */

include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "SELECT *
        FROM nazioni";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        if ($selectQuery->execute()) {
            $results = $selectQuery->get_result();
            $temp =$results->fetch_all(MYSQLI_ASSOC);
            echo json_encode($temp);
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