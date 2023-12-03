<?php
include '../login_models/login_functions.php';
require_once("../connection_models/db_conn.php");

$query = "SELECT U.Username, U.FotoProfilo
        FROM utenti U 
        WHERE  U.Username LIKE ? AND U.Email != ?";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $param = $_GET['name'] . '%';
        $selectQuery->bind_param("ss", $param, getSessionOrCookie());
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