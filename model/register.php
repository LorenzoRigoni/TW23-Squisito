<?
include 'db_conn.php';
include 'login_functions.php';
require_once('db_conn.php');

$pwd = $_POST['password'];
$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
$pwd = hash('sha512', $pwd . $random_salt);

$query = "INSERT INTO utenti(Email, Username, Nome, FotoProfilo, Pwd, Salt) VALUES (?, ?, ?, ?, ?, ?)";

if ($insert = $conn->prepare($query)) {
    $insert->bind_param('sssbss', $_POST['email'], $_POST['username'], $_POST['nome'], $_POST['fotoProfilo'], $pwd, $random_salt);
    if ($insert->execute()) {
        $response = array("success" => true);
        echo json_encode($response);
        login($_POST['email'], $pwd, $conn);
    } else {
        $response = array("success" => false);
        echo json_encode($response);
    }
}

$conn->close();
?>