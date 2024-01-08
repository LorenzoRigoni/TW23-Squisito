<?php
/**
 * This file contains the model for searching a user.
 */

include '../login_models/login_functions.php';
require_once("../connection_models/db_conn.php");

$query = "SELECT U.Username, U.Email, U.FotoProfilo
        FROM utenti U 
        WHERE  U.Username LIKE ? AND U.Email != ?";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $param = $_GET['name'] . '%';
        $selectQuery->bind_param("ss", $param, $_SESSION['userEmail']);
        if ($selectQuery->execute()) {
            $results = $selectQuery->get_result();
            if ($results->num_rows > 0) {
                $temp = $results->fetch_all(MYSQLI_ASSOC);
                for ($i = 0; $i < count($temp); $i++) {
                    $temp[$i]['FotoProfilo'] = base64_encode($temp[$i]['FotoProfilo']);
                }
                echo json_encode($temp);
            }
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