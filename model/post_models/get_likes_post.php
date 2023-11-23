<?php
include '../connection_models/db_conn.php';
include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "SELECT U.Username
        FROM utenti U INNER JOIN mi_piace M ON U.Email = M.EmailUtente
        WHERE M.IDPost = ?";

if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("i", $_GET['IDPost']);
        if ($selectQuery->execute()) {
            $results = $selectQuery->get_result();
            $users = array();
            while ($row = $results->fetch_assoc()) {
                $users[] = array(
                    'Username' => $row['Username']
                );
            }
            echo json_encode($users);
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