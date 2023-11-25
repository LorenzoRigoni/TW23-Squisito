<?php
include '../login_models/login_functions.php';
require('../connection_models/db_conn.php');

$query = "SELECT P.IDPost, P.Titolo, P.Foto, P.Ricetta, N.Nome AS Nazione, U.Email, U.Username, U.FotoProfilo, COUNT(M.EmailUtente) AS NumLike
        FROM post P INNER JOIN utenti U ON U.Email = P.EmailUtente
            INNER JOIN nazioni N ON P.IDNazione = N.IDNazione
            INNER JOIN mi_piace M ON P.IDPost = M.IDPost
        WHERE P.IDPost = ?
        GROUP BY M.IDPost";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("i", $_GET['IDPost']);
        if ($selectQuery->execute()) {
            $post = $selectQuery->get_result()->fetch_all(MYSQLI_ASSOC);
            $conn->close();
            require("../connection_models/db_conn.php");
            $query = "SELECT C.IDCommento, U.FotoProfilo, U.Username, C.Contenuto
                    FROM utenti U INNER JOIN commenti C ON U.Email = C.EmailUtente
                    WHERE C.IDPost = ?";
            if ($commQuery = $conn->prepare($query)) {
                $commQuery->bind_param("i", $_GET['IDPost']);
                if ($commQuery->execute()) {
                    $comments = $commQuery->get_result()->fetch_all(MYSQLI_ASSOC);
                    echo json_encode(array_merge($post, $comments));
                }
            } else {
                echo json_encode(array("error" => $commQuery->error));
            }
        } else {
            echo json_encode(array("error" => $selectQuery->error));
        }
    } else {
        echo json_encode(array("error" => $selectQuery->error));
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

$conn->close();
?>