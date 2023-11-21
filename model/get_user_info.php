<?
include "db_conn.php";
require_once("db_conn.php");

$query = "SELECT U.Username, U.Nome, U.FotoProfilo, U.Bio
        FROM utente U
        WHERE U.Email = ?";

if ($selectQuery = $conn->prepare($query)) {
    $selectQuery->bind_param("s", $_POST['email']);
    if ($selectQuery->execute()) {
        $results = $selectQuery->get_result();
        $posts = array();
        while ($row = $results->fetch_assoc()) {
            $posts[] = array(
                'Username' => $row['Username'],
                'Nome' => $row['Nome'],
                'FotoProfilo' => $row['FotoProfilo'],
                'Bio' => $row['Bio'],
            );
        }
        echo json_encode($posts);
    } else {
        echo json_encode(array("error" => $selectQuery->error));
    }
} else {
    echo json_encode(array("error" => $selectQuery->error));
}
?>