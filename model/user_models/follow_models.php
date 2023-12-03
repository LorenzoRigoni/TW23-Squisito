<?php
include '../login_models/login_functions.php';
include '../post_models/add_notification.php';
include '../post_models/pusher.php';

session_start();
if (checkLogin($conn)) {
    $followingEmail = getFollowingEmail();
    require('../connection_models/db_conn.php');
    $query = "SELECT *
        FROM seguiti S
        WHERE S.EmailSeguito = ? AND S.EmailFollower = ?";
    if ($isFollowed = $conn->prepare($query)) {
        $isFollowed->bind_param("ss", $followingEmail, getSessionOrCookie());
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
            $conn->close();
            $result = executeQuery($query, $followingEmail);
            echo json_encode($result);
            if ($res->num_rows == 0) {
                echo json_encode(addNotification(null, getSessionOrCookie(), $followingEmail, "Follow"));
                pushNotification($followingEmail);
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

/**
 * Function for execute the SQL queries.
 * @param string $query The query to execute
 * @param string $followingEmail The email ot the following user
 * @return array An associative array with the results
 */
function executeQuery($query, $followingEmail) {
    require('../connection_models/db_conn.php');
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("ss", getSessionOrCookie(), $followingEmail);
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
    $conn->close();
}

/**
 * Function for getting the email of the user who created a post.
 * @return string The email of the user.
 */
function getFollowingEmail() {
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
