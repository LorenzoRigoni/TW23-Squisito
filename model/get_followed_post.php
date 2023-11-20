<?
include 'db_conn.php';
require_once('db_conn.php');

$query = "SELECT P.IDPost, P.Titolo, P.Foto, P.Ricetta, P.Nazione, U.Email, U.Username, U.FotoProfilo
        FROM post P INNER JOIN utente U ON U.Email = P.EmailUtente
        WHERE P.EmailUtente IN (SELECT EmailSeguito
                                FROM seguiti
                                WHERE EmailFollower = ?)";

if ($selectQuery = $conn->prepare($query)) {
    $selectQuery->bind_param("s", $_SESSION['userEmail']);
    if ($selectQuery->execute()) {
        $results = $selectQuery->get_result();
        $posts = array();
        while ($row = $results->fetch_assoc()) {
            $posts[] = array(
                'IDPost' => $row['IDPost'],
                'Titolo' => $row['Titolo'],
                'Foto' => $row['Foto'],
                'Ricetta' => $row['Ricetta'],
                'Nazione' => $row['Nazione'],
                'Email' => $row['Email'],
                'Username' => $row['Username'],
                'FotoProfilo' => $row['FotoProfilo']
            );
        }
        echo json_encode($posts);
    } else {
        echo json_encode(array("error" => $selectQuery->error));
    }
} else {
    echo json_encode(array("error" => $selectQuery->error));
}
