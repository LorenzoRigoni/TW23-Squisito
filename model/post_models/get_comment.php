<?php
/**
 * This file contains the model for getting the info of one post.
 */

include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "SELECT C.IDCommento, U.FotoProfilo, U.Email, U.Username, C.Contenuto, C.DataCommento
FROM utenti U INNER JOIN commenti C ON U.Email = C.EmailUtente
WHERE C.IDPost = ?";

session_start();
if (checkLogin($conn)) {
    if ($commQuery = $conn->prepare($query)) {
        $commQuery->bind_param("i", $_GET['IDPost']);
        if ($commQuery->execute()) {
            $comments = $commQuery->get_result();
            if ($comments->num_rows >= 1) {
                $temp = $comments->fetch_all(MYSQLI_ASSOC);
                for ($i = 0; $i < count($temp); $i++) {
                    $temp[$i]['FotoProfilo'] = base64_encode($temp[$i]['FotoProfilo']);
                }
                header("Content-Type: application/json");
                echo json_encode($temp);
            }
        } else {
            echo json_encode(['message' => 'Query preparation failed']);
        }
    } else {
        echo json_encode(array("error" => $commQuery->error));
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

$conn->close();
?>