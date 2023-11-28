<?php
include '../login_models/login_functions.php';
require('../connection_models/db_conn.php');

session_start();
if (checkLogin($conn)) {
    $query = "SELECT *
            FROM mi_piace M
            WHERE M.EmailUtente = ? AND M.IDPost = ?";
    if ($isLiked = $conn->prepare($query)) {
        $isLiked->bind_param("si", $_SESSION['userEmail'], $_GET['IDPost']);
        if ($isLiked->execute()) {
			$isLiked->store_result(); 
            $conn->close();
            $query = "";
            if ($isLiked->num_rows() == 0) {
                $query = "INSERT INTO mi_piace (IDPost, EmailUtente, DataLike)
                        VALUES (?, ?, CURRENT_DATE())";
						
            } else {
                $query = "DELETE FROM mi_piace
                        WHERE IDPost = ? AND EmailUtente = ?";
            }
            $result = executeQuery($query);
            echo json_encode($result);
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
function executeQuery($query) {
    require('../connection_models/db_conn.php');
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("is", $_GET['IDPost'], $_SESSION['userEmail']);
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
?>
