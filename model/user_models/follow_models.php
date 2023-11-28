<?php
include '../login_models/login_functions.php';
require('../connection_models/db_conn.php');

session_start();
if (checkLogin($conn)) {
    $query = "SELECT *
        FROM seguiti S
        WHERE S.EmailSeguito = ? AND S.EmailFollower = ?";
    if ($isLiked = $conn->prepare($query)) {
        $isLiked->bind_param("ss", $_GET['emailSeguito'], $_SESSION['userEmail'], );
        if ($isLiked->execute()) {
            $conn->close();
            $query = "";
            if ($isLiked->num_rows() == 0) {
                $query = "INSERT INTO seguiti (EmailFollower, EmailSeguito, DataInizio)
                        VALUES (?, ?, CURRENT_DATE())";
            } else {
                $query = "DELETE FROM seguiti
                        WHERE EmailFollower = ? AND EmailSeguito = ?";
            }
            $result = executeQuery($query);
            echo json_encode($result);
        } else {
            echo json_encode(array("error" => $isLiked->error));
        }
    } else {
        echo json_encode(array("error" => $conn->error));
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

/**
 * Function for execute the SQL queries.
 * @param string $query The query to execute
 * @return array An associative array with the results
 */
function executeQuery($query) {
    require('../connection_models/db_conn.php');
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("ss", $_SESSION['userEmail'], $_GET['emailSeguito']);
        if ($selectQuery->execute()) {
            if (explode(" ", $query)[0] == "INSERT") {
                return array("alreadyFollowed" => false);
            } else {
                return array("alreadyFollowed" => true);
            }
        } else {
            return array("error" => $selectQuery->error);
        }
    } else {
        return array("error" => $selectQuery->error);
    }
    $conn->close();
}
?>