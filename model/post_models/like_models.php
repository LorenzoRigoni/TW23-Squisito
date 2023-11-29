<?php
include '../login_models/login_functions.php';
include 'add_notification.php';
require('../connection_models/db_conn.php');

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
            $conn->close();
            $result = executeQuery($query);
            echo json_encode($result);
            if ($res->num_rows == 0) {
                $emailReceiver = getReceiverEmail();
                echo json_encode(addNotification($_POST['IDPost'], $_SESSION['userEmail'], $emailReceiver, "Like"));
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

/**
 * Function for execute the SQL queries.
 * @param string $query The query to execute
 * @return array An associative array with the results
 */
function executeQuery($query)
{
    require('../connection_models/db_conn.php');
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
    $conn->close();
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
