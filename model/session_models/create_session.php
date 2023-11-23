<?php
function start_session() {
    $session_name = 'sec_session';
    $secure = true; 
    $httponly = true;
    //ini_set('session.use_only_cookies', 1); 
    $cookieParams = session_get_cookie_params(); 
    session_set_cookie_params($cookieParams["lifetime"], $cookieParams["path"], $cookieParams["domain"], $secure, $httponly); 
    session_name($session_name);
    session_start();
    session_regenerate_id();
}
?>