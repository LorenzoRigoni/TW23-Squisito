<?
require_once("db_conn.php");
include "db_conn.php";
include "login_functions.php";
include "create_sec_session.php";

start_session("login_session");
if(isset($_POST['email'], $_POST['password'])) {
    if(login($_POST['email'], $_POST['password'], $conn)) {
        echo "Login effettuato"; /*Al posto di echo scegliere se ritornare JSON*/
    } else {
        echo "Login fallito";
    }
} else {
    echo "Richiesta invalida";
}
?>