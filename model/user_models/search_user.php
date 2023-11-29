<?php
include '../login_models/login_functions.php';
require_once("../connection_models/db_conn.php");

$query = "SELECT U.Username, U.FotoProfilo
        FROM utenti U 
        WHERE  U.Username LIKE '?%' AND U.Email != ?";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("ss", $_GET['name'], $_SESSION['userEmail']);
        if ($selectQuery->execute()) {
            $results = $selectQuery->get_result();
            $temp = $results->fetch_all(MYSQLI_ASSOC);
            $temp[0]['FotoProfilo'] = base64_encode($temp[0]['FotoProfilo']);
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