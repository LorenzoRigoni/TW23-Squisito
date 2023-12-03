<?php
/**
 * This file contains the model for getting the info of one post.
 */

include '../login_models/login_functions.php';
require('../connection_models/db_conn.php');

$query = "SELECT P.IDPost, P.Titolo,P.Foto, P.Ricetta, N.Nome AS Nazione, N.Shortname, P.DataPost, U.Email, U.Username,U.FotoProfilo,
            (SELECT COUNT(*) FROM mi_piace M1 WHERE M1.IDPost = P.IDPost) AS NumLike,
            (SELECT COUNT(*) FROM mi_piace M2 WHERE M2.EmailUtente = ? AND M2.IDPost = P.IDPost) AS IsLiked,
            (SELECT COUNT(*) FROM seguiti S WHERE S.EmailFollower = ? AND S.EmailSeguito = P.EmailUtente) AS IsFollowed
        FROM post P INNER JOIN utenti U ON U.Email = P.EmailUtente
            INNER JOIN nazioni N ON P.IDNazione = N.IDNazione
        WHERE P.IDPost = ?";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("ssi", getSessionOrCookie(), getSessionOrCookie(), $_GET['IDPost']);
        if ($selectQuery->execute()) {
            $post = $selectQuery->get_result();
            $conn->close();
            $mergedData = array();

            while ($row = $post->fetch_assoc()) {
                $mergedData[] = array(
                    "IDPost" => $row["IDPost"],
                    "Ricetta" => $row["Ricetta"],
                    "Nazione" => $row["Nazione"],
                    "Shortname" => $row["Shortname"],
                    "FotoProfilo" => base64_encode($row["FotoProfilo"]),
                    "FotoRicetta" => base64_encode($row["Foto"]),
                    "UsernamePost" => $row["Username"],
                    "DataPost" => $row["DataPost"],
                    "IsLiked" => $row["IsLiked"],
                    "IsFollowed" => $row["IsFollowed"]
                );
            }

            require("../connection_models/db_conn.php");
            $query = "SELECT C.IDCommento, U.FotoProfilo, U.Username, C.Contenuto, C.DataCommento
                FROM utenti U INNER JOIN commenti C ON U.Email = C.EmailUtente
                WHERE C.IDPost = ?";

            if ($commQuery = $conn->prepare($query)) {
                $commQuery->bind_param("i", $_GET['IDPost']);
                if ($commQuery->execute()) {
                    $comments  = $commQuery->get_result();

                    $immagini = array();
                    if (!empty($comments)) {
                        while ($row = $comments->fetch_assoc()) {
                            $immagini[] = array(
                                "Username" => $row["Username"],
                                "FotoProfiloCom" => base64_encode($row["FotoProfilo"]),
                                "Contenuto" => $row["Contenuto"],
                                "DataCommento" => $row["DataCommento"]
                            );
                        }
                        header("Content-Type: application/json");
                        echo json_encode(array_merge($mergedData, $immagini));
                    } else {
                        echo json_encode(['message' => 'No comments found']);
                    }
                } else {
                    echo json_encode(['message' => 'Query preparation failed']);
                }
            }
        } else {
            echo json_encode(array("error" => $commQuery->error));
        }
    } else {
        echo json_encode(array("error" => $selectQuery->error));
    }
} else {
    echo json_encode(array("error" => "The user is not logged"));
}

$conn->close();

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
