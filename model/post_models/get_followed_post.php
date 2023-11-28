<?php
include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "SELECT P.IDPost, P.Titolo, P.Foto, P.Ricetta, N.Nome AS Nazione, U.Email, U.Username, U.FotoProfilo, 
            COUNT(M.EmailUtente) AS NumLike, 
            (SELECT COUNT(*) FROM mi_piace M WHERE M.EmailUtente = ? AND M.IDPost = P.IDPost) AS IsLiked
        FROM post P INNER JOIN utenti U ON U.Email = P.EmailUtente
            INNER JOIN nazioni N ON P.IDNazione = N.IDNazione
            LEFT JOIN mi_piace M ON P.IDPost = M.IDPost
        WHERE P.EmailUtente IN (SELECT EmailSeguito
                                FROM seguiti
                                WHERE EmailFollower = ?)
        GROUP BY M.IDPost";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("ss", $_SESSION['userEmail'], $_SESSION['userEmail']);
        if ($selectQuery->execute()) {
            $response = $selectQuery->get_result();
            $temp = $response->fetch_all(MYSQLI_ASSOC);
            for ($i = 0; $i < count($temp); $i++) {
                $temp[$i]['Foto'] = base64_encode($temp[$i]['Foto']);
                $temp[$i]['FotoProfilo'] = base64_encode($temp[$i]['FotoProfilo']);
            }
            echo json_encode($temp);
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