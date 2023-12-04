<?php
/**
 * This file contains the model for getting the notifications of an user.
 */

include '../login_models/login_functions.php';
require('../connection_models/db_conn.php');

$query = "SELECT N.IDNotifica, N.IDPost, N.EmailMittente, N.TipoNotifica, U.Username, U.FotoProfilo, N.DataNotifica, N.Visualizzato
        FROM notifiche N INNER JOIN utenti U ON N.EmailMittente = U.Email
        WHERE N.EmailDestinatario = ?";

session_start();
if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("s", $_SESSION['userEmail']);
        if ($selectQuery->execute()) {
            $results = $selectQuery->get_result();
            $temp =$results->fetch_all(MYSQLI_ASSOC);
            for ($i = 0; $i < count($temp); $i++) {
                $temp[$i]['FotoProfilo'] = base64_encode($temp[$i]['FotoProfilo']);
            }
            $conn->close();
            updateNotifications();
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

/**
 * Function to update the notifications that the user has seen.
 */
function updateNotifications() {
    require("../connection_models/db_conn.php");
    $query = "UPDATE notifiche N
        SET N.Visualizzato = TRUE
        WHERE N.EmailDestinatario = ?";
    if ($insert = $conn->prepare($query)) {
        $insert->bind_param("s", $_SESSION['userEmail']);
        $insert->execute();
    }
    $conn->close();
}
?>