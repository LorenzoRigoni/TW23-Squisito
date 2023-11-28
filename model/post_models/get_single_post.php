<?php
include '../login_models/login_functions.php';
require('../connection_models/db_conn.php');

$query = "SELECT P.IDPost, P.Titolo,P.Foto, P.Ricetta, N.Nome AS Nazione, N.Shortname, P.DataPost, U.Email, U.Username,U.FotoProfilo, COUNT(M.EmailUtente) AS NumLike
        FROM post P INNER JOIN utenti U ON U.Email = P.EmailUtente
            INNER JOIN nazioni N ON P.IDNazione = N.IDNazione
            LEFT JOIN mi_piace M ON P.IDPost = M.IDPost
        WHERE P.IDPost = ?
        GROUP BY M.IDPost";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("i", $_GET['IDPost']);
        if ($selectQuery->execute()) {
            $post = $selectQuery->get_result(); //->fetch_all(MYSQLI_ASSOC);
            $conn->close();
            $mergedData = array();

            while ($row = $post->fetch_assoc()) {
                $mergedData[] = array(
                    "Ricetta" => $row["Ricetta"],
                    "Nazione" => $row["Nazione"],
                    "Shortname" => $row["Shortname"],
                    "FotoProfilo" => base64_encode($row["FotoProfilo"]),
                    "FotoRicetta" => base64_encode($row["Foto"]),
                    "UsernamePost" => $row["Username"],
                    "DataPost" => $row["DataPost"]
                );
            }
            $conn->close();

            require("../connection_models/db_conn.php");
            $query = "SELECT C.IDCommento, U.FotoProfilo, U.Username, C.Contenuto, C.DataCommento
                FROM utenti U INNER JOIN commenti C ON U.Email = C.EmailUtente
                WHERE C.IDPost = ?";

            if ($commQuery = $conn->prepare($query)) {
                $commQuery->bind_param("i", $_GET['IDPost']);
                if ($commQuery->execute()) {
                    $comments  = $commQuery->get_result();
                    //$comments = $result->fetch_all(MYSQLI_ASSOC);

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
                        //echo json_encode($immagini);

                        //echo $comments[0]['Username'];
                        // echo json_encode($comments[0]);
                    } else {
                        echo json_encode(['message' => 'No comments found']);
                    }
                } else {
                    echo json_encode(['message' => 'Query preparation failed']);
                }
                //echo ($comments[0]['Username']);
                // echo json_encode(array_merge( $post[0], $comments[0]));

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

?>