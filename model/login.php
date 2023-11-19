<?
require_once("db_conn.php");
include "db_conn.php";
include "login_functions.php";
include "create_sec_session.php";

start_session();
if(isset($_POST['email'], $_POST['password'])) {
    if(login($_POST['email'], $_POST['password'], $conn)) {
        $response = array("success" => true);
    } else {
        $response = array("success" => false);
    }
} else {
    $response = array("success" => false);
}

echo json_encode($response);
?>