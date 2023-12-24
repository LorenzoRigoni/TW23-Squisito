<?php
/**
 * This file contains the model for getting number of posts, number of followers and number of following users.
 */

include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

session_start();
if (checkLogin($conn)) {
    $queryPosts = "SELECT COUNT(*) AS NumPosts
                FROM post
                WHERE EmailUtente = ?";
    $queryFoll = "SELECT COUNT(*) AS NumFollowers
                FROM seguiti
                WHERE EmailSeguito = ?";
    $querySeg = "SELECT COUNT(*) AS NumSeguiti
                FROM seguiti
                WHERE EmailFollower = ?";
    $resPosts = executeQuery($queryPosts, $conn);
    $resFoll = executeQuery($queryFoll, $conn);
    $resSeg = executeQuery($querySeg, $conn);
    if (array_keys($resPosts)[0] == "error" || array_keys($resFoll)[0] == "error" || array_keys($resSeg)[0] == "error") {
        if (array_keys($resPosts)[0] == "error") {
            echo json_encode(array("error" => $resPosts['error']));
        }
        if (array_keys($resFoll)[0] == "error") {
            echo json_encode(array("error" => $resFoll['error']));
        }
        if (array_keys($resSeg)[0] == "error") {
            echo json_encode(array("error" => $resSeg['error']));
        }
    } else {
        echo json_encode(array_merge($resPosts, $resFoll, $resSeg));
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

/**
 * Function for execute the SQL queries.
 * @param string $query The query to execute
 * @param mysqli $conn The connection to the database
 * @return array An associative array with the results
 */
function executeQuery($query, $conn) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("s", $_GET['email']);
        if ($selectQuery->execute()) {
            return $selectQuery->get_result()->fetch_all(MYSQLI_ASSOC);
        } else {
            return array("error" => $selectQuery->error);
        }
    } else {
        return array("error" => $selectQuery->error);
    }
}
?>