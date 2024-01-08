<?php
/**
 * This file contains the model for insert/delete a like in a post.
 */

include '../login_models/login_functions.php';
include 'add_notification.php';
include 'pusher.php';
require_once('../connection_models/db_conn.php');

session_start();
if (checkLogin($conn)) {
    $query = "SELECT *
            FROM mi_piace M
            WHERE M.EmailUtente = ? AND M.IDPost = ?";
    if ($isLiked = $conn->prepare($query)) {
        $isLiked->bind_param("si", $_SESSION['userEmail'], $_POST['IDPost']);
        if ($isLiked->execute()) {
            $query = "";
			$res =$isLiked->get_result();
            if ($res->num_rows == 0) {
                $query = "INSERT INTO mi_piace (IDPost, EmailUtente, DataLike)
                        VALUES (?, ?, CURRENT_DATE())";
            } else {
                $query = "DELETE FROM mi_piace
                        WHERE IDPost = ? AND EmailUtente = ?";
            }
            $result = executeQuery($query, $conn);
            $query = "";
            $query = "SELECT COUNT(*) AS NumLike
                FROM mi_piace M 
                WHERE M.IDPost = ?";
            if ($numLikes = $conn->prepare($query)) {
                $numLikes->bind_param('i', $_POST['IDPost']);
                if ($numLikes->execute()) {
                    echo json_encode($numLikes->get_result()->fetch_assoc());
                    if ($res->num_rows == 0) {
                        $emailReceiver = getReceiverEmail($conn);
                        pushNotification(getReceiverUsername($conn));
                    }
                } else {
                    echo json_encode(array("error" => $numLikes->error));
                }
            } else {
                echo json_encode(array("error" => $conn->error));
            }
        } else {
            echo json_encode(array("error" => $isLiked->error));
        }
    } else {
        echo json_encode(array("error" => $conn->error));
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

$conn->close();

/**
 * Function for execute the SQL queries.
 * @param string $query The query to execute
 * @param mysqli $conn The connection to the database
 * @return array An associative array with the results
 */
function executeQuery($query, $conn)
{
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("is", $_POST['IDPost'], $_SESSION['userEmail']);
        if ($selectQuery->execute()) {
            if (explode(" ", $query)[0] == "INSERT") {
                return array("alreadyLiked" => false);
            } else {
                return array("alreadyLiked" => true);
            }
        } else {
            return array("error" => $selectQuery->error);
        }
    } else {
        return array("error" => $selectQuery->error);
    }
}

/**
 * Function for getting the email of the user who created the post.
 * @param mysqli $conn The connection to the database
 * @return string The email of the user
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