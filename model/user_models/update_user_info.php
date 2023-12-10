<?php
/**
 * This file contains the model for update the info of user.
 */

include '../login_models/login_functions.php';
require('../connection_models/db_conn.php');

$query = "UPDATE utenti
        SET Username = ?, Nome = ?, FotoProfilo = ?, Bio = ?
        WHERE Email = ?";

session_start();
if ($insert = $conn->prepare($query)) {
	 if($_FILES && $_FILES['fotoProfilo']['error'] == 0){
		 $image=file_get_contents($_FILES['fotoProfilo']['tmp_name']);
    }else {
		 $image = NULL;
	}
    $insert->bind_param('sssss', $_POST['username'], $_POST['nome'], $image, $_POST['bio'], $_SESSION['userEmail']);
   
    if ($insert->execute()) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false));
    }
}
$conn->close();
?>
