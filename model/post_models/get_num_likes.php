<?php
include '../login_models/login_functions.php';
require_once('../connection_models/db_conn.php');

$query = "SELECT COUNT(*) AS NumLikes
        FROM mi_piace
        WHERE IDPost = ?";

if (checkLogin($conn)) {
    if ($selectQuery = $conn->prepare($query)) {
        $selectQuery->bind_param("i", $_GET['IDPost']);
        if ($selectQuery->execute()) {
            $results = $selectQuery->get_result();
            $num_likes = array();
            while ($row = $results->fetch_assoc()) {
                $num_likes[] = array(
                    'NumLikes' => $row['NumLikes']
                );
            }
            echo json_encode($num_likes);
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