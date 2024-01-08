<?php
/**
 * This file contains the model for getting the notifications of an user.
 */

include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

switch ($_POST['functionname']) {
    case 'get':
        $query = "SELECT N.IDNotifica, N.IDPost, U.Username, N.TipoNotifica, N.Visualizzato
        FROM notifiche N INNER JOIN utenti U ON N.EmailMittente = U.Email
        WHERE N.EmailDestinatario = ? ORDER BY N.IDNotifica";

        session_start();
        if (checkLogin($conn)) {
            if ($selectQuery = $conn->prepare($query)) {
                $selectQuery->bind_param("s", $_SESSION['userEmail']);
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
        break;
    case 'update':
        updateNotifications($conn);
        break;
}
$conn->close();


/**
 * Function to update the notifications that the user has seen.
 * @param mysqli $conn The connection to the database
 */
function updateNotifications($conn)
{
    session_start();
    $query = "UPDATE notifiche N
        SET N.Visualizzato = TRUE
        WHERE N.EmailDestinatario = ?";
    if ($insert = $conn->prepare($query)) {
        $insert->bind_param("s", $_SESSION['userEmail']);
        $insert->execute();
    }
}
?>