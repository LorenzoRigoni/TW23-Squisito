<?php
include '../login_models/login_functions.php';
include 'add_notification.php';
include 'pusher.php';
require('../connection_models/db_conn.php');

$query = "INSERT INTO commenti(EmailUtente, IDPost, Contenuto, DataCommento)
        VALUES (?, ?, ?, CURRENT_DATE())";

session_start();
if (checkLogin($conn)) {
    if ($insert = $conn->prepare($query)) {
        $insert->bind_param("sis", getSessionOrCookie(), $_POST['IDPost'], $_POST['Contenuto']);
        if ($insert->execute()) {
            echo json_encode(array("success" => true));
            $conn->close();
            $emailReceiver = getReceiverEmail();
            echo json_encode(addNotification($_POST['IDPost'], getSessionOrCookie(), $emailReceiver, "Commento"));
            pushNotification($emailReceiver);
        } else {
            echo json_encode(array("error" => $insert->error));
        }
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

/**
 * Function for getting the email of the user who created the post.
 * @return string The email of the user.
 */
function getReceiverEmail() {
    require('../connection_models/db_conn.php');
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
    $conn->close();
}

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