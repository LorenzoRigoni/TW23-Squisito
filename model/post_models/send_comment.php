<?php
/**
 * This file contains the model for insert a new comment in a post.
 */

include '../login_models/login_functions.php';
include 'add_notification.php';
include 'pusher.php';
require_once('../connection_models/db_conn.php');

$query = "INSERT INTO commenti(EmailUtente, IDPost, Contenuto, DataCommento)
        VALUES (?, ?, ?, CURRENT_DATE())";

session_start();
if (checkLogin($conn)) {
    if ($insert = $conn->prepare($query)) {
        $insert->bind_param("sis", $_SESSION['userEmail'], $_POST['IDPost'], $_POST['Contenuto']);
        if ($insert->execute()) {
            echo json_encode(array("success" => true));
            $emailReceiver = getReceiverEmail($conn);
            echo json_encode(addNotification($_POST['IDPost'], $_SESSION['userEmail'], $emailReceiver, "Commento", $conn));
            pushNotification(getReceiverUsername($conn));
        } else {
            echo json_encode(array("error" => $insert->error));
        }
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

$conn->close();

/**
 * Function for getting the email of the user who created the post.
 * @param mysqli $conn The connection to the database
 * @return string The email of the user.
 */
function getReceiverEmail($conn) {
    $query = "SELECT P.EmailUtente
            FROM post P
            WHERE P.IDPost = ?";
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("i", $_POST['IDPost']);
        if ($selectQuery->execute()) {
            return $selectQuery->get_result()->fetch_assoc()['EmailUtente'];
        } else {
            return $selectQuery->error;
        }
    } else {
        return $selectQuery->error;
    }
}

/**
 * Function for getting the username of the user who created the post.
 * @param mysqli $conn The connection to the database
 * @return string The username of the user
 */
function getReceiverUsername($conn) {
    $query = "SELECT U.Username
        FROM post P INNER JOIN utenti U ON P.EmailUtente = U.Email
        WHERE P.IDPost = ?";
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("i", $_POST['IDPost']);
        if ($selectQuery->execute()) {
            return $selectQuery->get_result()->fetch_assoc()['Username'];
        } else {
            return $selectQuery->error;
        }
    } else {
        return $selectQuery->error;
    }
}
?>