<?php
/**
 * This file contains the model for delete a post.
 */

include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');
		
$queryNot = "DELETE FROM notifiche
        WHERE IDPost = ?";
		
$queryLike = "DELETE FROM mi_piace
        WHERE IDPost = ?";
		
$queryComm = "DELETE FROM commenti
        WHERE IDPost = ?";
	
$queryPost = "DELETE FROM post
        WHERE IDPost = ?";

session_start();
if (checkLogin($conn)) {
    $resNot = executeQuery($queryNot, $_POST['IDPost'], $conn);
    $resLike = executeQuery($queryLike, $_POST['IDPost'], $conn);
    $resComm = executeQuery($queryComm, $_POST['IDPost'], $conn);
    $resPost = executeQuery($queryPost, $_POST['IDPost'], $conn);
    if (empty($resNot) && empty($resLike) && empty($resComm) && empty($resPost)) {
        echo json_encode(array("success" => true));
    } else {
        if (!empty($resNot)) {
            echo json_encode($resNot['error']);
        }
        if (!empty($resLike)) {
            echo json_encode($resLike['error']);
        }
        if (!empty($resComm)) {
            echo json_encode($resComm['error']);
        }
        if (!empty($resPost)) {
            echo json_encode($resPost['error']);
        }
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

$conn->close();

/**
 * Function for execute the delete queries.
 * @param string $query The query to execute
 * @param int $idPost The id of the post to delete
 * @param mysqli $conn The connection to the database
 * @return array An empty array if success, with error inside otherwise
 */
function executeQuery($query, $idPost, $conn) {
    if ($delete = $conn->prepare($query)) {
        $delete->bind_param("i", $idPost);
        if ($delete->execute()) {
            return array();
        } else {
            return array("error" => $delete->error);
        }
    } else {
        return array("error" => $conn->error);
    }
}
?>