<?php
/**
 * This file contains the model for delete a post.
 */

include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query4 = "DELETE FROM post
        WHERE IDPost = ?";
		
$query = "DELETE FROM notifiche
        WHERE IDPost = ?";
		
$query2 = "DELETE FROM mi_piace
        WHERE IDPost = ?";
		
$query3 = "DELETE FROM commenti
        WHERE IDPost = ?";		

session_start();
if (checkLogin($conn)) {
    if ($insert = $conn->prepare($query)) {
        $insert->bind_param('i', $_POST['IDPost']);
        if ($insert->execute()) {
			if ($insert2 = $conn->prepare($query2)) {
				$insert2->bind_param('i', $_POST['IDPost']);
				if ($insert2->execute()) {
					echo json_encode(array("success" => true));
				} else {
					echo json_encode(array("error" => $insert->error));
				}
			}
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("error" => $insert->error));
        }
    }
	
	if ($insert3 = $conn->prepare($query3)) {
        $insert3->bind_param('i', $_POST['IDPost']);
        if ($insert3->execute()) {
			if ($insert4 = $conn->prepare($query4)) {
				$insert4->bind_param('i', $_POST['IDPost']);
				if ($insert4->execute()) {
					echo json_encode(array("success" => true));
				} else {
					echo json_encode(array("error" => $insert->error));
				}
			}
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("error" => $insert->error));
        }
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}
$conn->close();
?>
