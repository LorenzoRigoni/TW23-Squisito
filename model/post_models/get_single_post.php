<?php
/**
 * This file contains the model for getting the info of one post.
 */

include '../login_models/login_functions.php';
require('../connection_models/db_conn.php');

$query = "SELECT P.IDPost, P.Titolo, P.Foto as FotoRicetta, P.Ricetta, N.Nome AS Nazione, N.Shortname, P.DataPost, U.Email, U.Username, U.FotoProfilo,
            (SELECT COUNT(*) FROM mi_piace M1 WHERE M1.IDPost = P.IDPost) AS NumLike,
            (SELECT COUNT(*) FROM mi_piace M2 WHERE M2.EmailUtente = ? AND M2.IDPost = P.IDPost) AS IsLiked,
            (SELECT COUNT(*) FROM seguiti S WHERE S.EmailFollower = ? AND S.EmailSeguito = P.EmailUtente) AS IsFollowed
        FROM post P INNER JOIN utenti U ON U.Email = P.EmailUtente
            INNER JOIN nazioni N ON P.IDNazione = N.IDNazione
        WHERE P.IDPost = ?";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("ssi", $_SESSION['userEmail'], $_SESSION['userEmail'], $_GET['IDPost']);
        if ($selectQuery->execute()) {
            $post = $selectQuery->get_result();
            if ($post->num_rows >= 1) {
                $temp = $post->fetch_all(MYSQLI_ASSOC);
                for ($i = 0; $i < count($temp); $i++) {
                    $temp[$i]['FotoRicetta'] = base64_encode($temp[$i]['FotoRicetta']);
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