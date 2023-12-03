<?php
/**
 * This file contains the function for add a notification to the database.
 */

/**
 * Function to add a notification in the database.
 * @param int $idPost The id of the post (NULL if is the follow notification)
 * @param string $emailMitt The email of the user that sends the notification
 * @param string $emailDest The email of the user that receives the notification
 * @param string $tipoNot The tipe of notification
 * @return array An associative array with success or the SQL error
 */
function addNotification($idPost, $emailMitt, $emailDest, $tipoNot) {
    require('../connection_models/db_conn.php');
    
    $query = "INSERT INTO notifiche (IDPost, EmailMittente, EmailDestinatario, TipoNotifica, DataNotifica)
            VALUES (?, ?, ?, ?, CURRENT_DATE())";

    if (checkLogin($conn)) {
        if ($insert = $conn->prepare($query)) {
            $insert->bind_param("isss", $idPost, $emailMitt, $emailDest, $tipoNot);
            if ($insert->execute()) {
                return array("insertNotification" => "success");
            } else {
                return array("error" => $insert->error);
            }
        } else {
            return array("error" => $insert->error);
        }
    } else {
        return array("error" => "The user is not logged");
    }
}
?>
