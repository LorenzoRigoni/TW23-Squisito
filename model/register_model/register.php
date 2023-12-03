<?php
/**
 * This file contains the model for register a user.
 */

include '../login_models/login_functions.php';
require('../connection_models/db_conn.php');

$pwd = $_POST['password'];
$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
$pwd = hash('sha512', $pwd . $random_salt);

$query = "INSERT INTO utenti(Email, Username, Nome, FotoProfilo, Bio, Pwd, Salt) VALUES (?, ?, ?, ?, ?, ?, ?)";

session_start();
if ($insert = $conn->prepare($query)) {
    $image = NULL;
    $insert->bind_param('sssbsss', $_POST['email'], $_POST['username'], $_POST['nome'], $image, $_POST['bio'], $pwd, $random_salt);
    if($_FILES['fotoProfilo']['error'] == 0){
        $insert->send_long_data(3,file_get_contents($_FILES['fotoProfilo']['tmp_name']));
    }
    if ($insert->execute()) {
        $response = array("success" => true);
        echo json_encode($response);
        $conn->close();
        require('../connection_models/db_conn.php');
        login($_POST['email'], $pwd, $conn, false);
        $conn->close();
    } else {
        $response = array("success" => false);
        echo json_encode($response);
    }
}
?>