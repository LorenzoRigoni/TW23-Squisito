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
        $insert->bind_param("sis", $_SESSION['userEmail'], $_POST['IDPost'], $_POST['Contenuto']);
        if ($insert->execute()) {
            echo json_encode(array("success" => true));
            $conn->close();
            $emailReceiver = getReceiverEmail();
            echo json_encode(addNotification($_POST['IDPost'], $_SESSION['userEmail'], $emailReceiver, "Commento"));
            pushNotification();
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
?>