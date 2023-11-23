<?php
include '../login_models/login_functions.php';
include '../session_models/create_sec_session.php';

start_session();
$_SESSION = array();
$params = session_get_cookie_params();
setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
session_destroy();
header('Location: ./');
?>