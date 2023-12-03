<?php
/**
 * This file contains the model for getting the posts published by an user.
 */

include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "SELECT P.IDPost, P.Titolo, P.Foto, P.Ricetta, N.Nome AS Nazione, U.Email, U.Username, U.FotoProfilo, 
            (SELECT COUNT(*) FROM mi_piace M1 WHERE M1.IDPost = P.IDPost) AS NumLike, 
            (SELECT COUNT(*) FROM mi_piace M2 WHERE M2.EmailUtente = ? AND M2.IDPost = P.IDPost) AS IsLiked
        FROM post P INNER JOIN utenti U ON U.Email = P.EmailUtente
            INNER JOIN nazioni N ON P.IDNazione = N.IDNazione
        WHERE P.EmailUtente = ?
        ORDER BY P.DataPost DESC";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("ss", $_GET['email'], $_GET['email']);
        if ($selectQuery->execute()) {
            $response = $selectQuery->get_result();
            if ($response->num_rows >= 1) {
                $temp = $response->fetch_all(MYSQLI_ASSOC);
                for ($i = 0; $i < count($temp); $i++) {
                    $temp[$i]['Foto'] = base64_encode($temp[$i]['Foto']);
                    $temp[$i]['FotoProfilo'] = base64_encode($temp[$i]['FotoProfilo']);
                }
                echo json_encode($temp);
            } else {
                echo json_encode(array());
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