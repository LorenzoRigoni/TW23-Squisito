<?php
include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "SELECT C.IDCommento, U.FotoProfilo, U.Username, C.Contenuto
        FROM utenti U INNER JOIN commenti C ON U.Email = C.EmailUtente
        WHERE C.IDPost = ?";

if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("i", $_GET['IDPost']);
        if ($selectQuery->execute()) {
            $results = $selectQuery->get_result();
            echo json_encode($results->fetch_all(MYSQLI_ASSOC));
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