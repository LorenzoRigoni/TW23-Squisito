<?php
include "../connection_models/db_conn.php";
include '../login_models/login_functions.php';
require_once("../connection_models/db_conn.php");

$query = "SELECT U.Username, U.Nome, U.FotoProfilo, U.Bio
        FROM utenti U
        WHERE U.Email = ?";
session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("s", $_GET['email']);
        if ($selectQuery->execute()) {
            $results = $selectQuery->get_result();
            echo json_encode($results->fetch_all(MYSQLI_ASSOC));
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