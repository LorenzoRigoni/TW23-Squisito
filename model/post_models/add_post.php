<?php
/**
 * This file contains the model for add a post.
 */

include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "INSERT INTO post(EmailUtente, Titolo, Ricetta, Foto, IDNazione, DataPost)
        VALUES (?, ?, ?, ?, ?, CURRENT_DATE())";

session_start();
if (checkLogin($conn)) {
    if ($insert = $conn->prepare($query)) {
        $image = NULL;
        $insert->bind_param('sssbi', getSessionOrCookie(), $_POST['Titolo'], $_POST['Ricetta'], $image, $_POST['IDNazione']);
        if($_FILES['Foto']['error'] == 0){
            $insert->send_long_data(3,file_get_contents($_FILES['Foto']['tmp_name']));
        }
        if ($insert->execute()) {
            $response = array("success" => true);
            echo json_encode($response);
        } else {
            $response = array("error" => $insert->error);
            echo json_encode($response);
        }
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