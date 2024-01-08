<?php
/**
 * This file contains the model for follow/defollow a user.
 */

include '../login_models/login_functions.php';
include '../post_models/add_notification.php';
include '../post_models/pusher.php';
require_once('../connection_models/db_conn.php');

session_start();
if (checkLogin($conn)) {
    $followingEmail = $_POST["Email"];
    $query = "SELECT *
        FROM seguiti S
        WHERE S.EmailSeguito = ? AND S.EmailFollower = ?";
    if ($isFollowed = $conn->prepare($query)) {
        $isFollowed->bind_param("ss", $followingEmail, $_SESSION['userEmail']);
        if ($isFollowed->execute()) {
            $query = "";
			$res=$isFollowed->get_result();
            if ($res->num_rows == 0) {
                $query = "INSERT INTO seguiti (EmailFollower, EmailSeguito, DataInizio)
                        VALUES (?, ?, CURRENT_DATE())";
            } else {
                $query = "DELETE FROM seguiti
                        WHERE EmailFollower = ? AND EmailSeguito = ?";
            }
            $result = executeQuery($query, $followingEmail, $conn);
            echo json_encode($result);
            if ($res->num_rows == 0) {
                echo json_encode(addNotification(null, $_SESSION['userEmail'], $followingEmail, "Follow", $conn));
                pushNotification(getReceiverUsername($conn));
            }
        } else {
            echo json_encode(array("error" => $isFollowed->error));
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
 * @param string $followingEmail The email ot the following user
 * @param mysqli $conn The connection to the database
 * @return array An associative array with the results
 */
function executeQuery($query, $followingEmail, $conn) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("ss", $_SESSION['userEmail'], $followingEmail);
        if ($selectQuery->execute()) {
            if (explode(" ", $query)[0] == "INSERT") {
                return array("alreadyFollowed" => false);
            } else {
                return array("alreadyFollowed" => true);
            }
        } else {
            return array("error" => $selectQuery->error);
        }
    } else {
        return array("error" => $selectQuery->error);
    }
}

/**
 * Function for getting the username of the user who created the post.
 * @param mysqli $conn The connection to the database
 * @return string The username of the user
 */
function getReceiverUsername($conn) {
    $query = "SELECT U.Username
        FROM utenti U
        WHERE U.Email = ?";
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("s", $_POST["Email"]);
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