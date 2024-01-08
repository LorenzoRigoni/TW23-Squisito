<?php
/**
 * This file contains the model for getting random users.
 */

include '../login_models/login_functions.php';
require_once("../connection_models/db_conn.php");

$query = "SELECT U.Username, U.Email, U.FotoProfilo,
            (SELECT COUNT(S.EmailFollower) FROM seguiti S WHERE S.EmailSeguito = U.Email) AS NumFollowers
    FROM utenti U
    WHERE U.Email != ?
    ORDER BY NumFollowers DESC";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("s", $_SESSION['userEmail']);
        if ($selectQuery->execute()) {
            $results = $selectQuery->get_result();
            if ($results->num_rows > 0) {
                $temp = $results->fetch_all(MYSQLI_ASSOC);
                $temp[0]['FotoProfilo'] = base64_encode($temp[0]['FotoProfilo']);
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