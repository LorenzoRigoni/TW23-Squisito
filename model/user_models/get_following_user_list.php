<?php
/**
 * This file contains the model for getting the following users list.
 */

include '../login_models/login_functions.php';
require_once("../connection_models/db_conn.php");

$query = "SELECT U.Email, U.Username, U.FotoProfilo
        FROM utenti U INNER JOIN seguiti S ON U.Email = S.EmailSeguito
        WHERE S.EmailFollower = ?";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("s", getSessionOrCookie());
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

/**
 * Function for getting the value of session variable or cookie variable.
 * @return string The variable value.
 */
function getSessionOrCookie() {
    if (isset($_COOKIE['userEmail'])) {
        return $_COOKIE['userEmail'];
    } else {
        return $_SESSION['userEmail'];
    }
}
?>