<?php
require('../connection_models/db_conn.php');

/**
 * This function is for the login of the user.
 * @param string $email The email of the user
 * @param string $pwd The password of the user
 * @param mysqli $conn The connection to the database
 * @return bool True if the user is succesfully logged, false otherwise
 */
function login($email, $pwd, $conn)
{
    $userEmail = "";
    $query = "SELECT Email, Username, Nome, FotoProfilo, Pwd, Salt FROM utenti WHERE Email = ? LIMIT 1";
    if ($excQuery = $conn->prepare($query)) {
        $excQuery->bind_param('s', $email);
        $excQuery->execute();
        $excQuery->store_result();
        $excQuery->bind_result($userEmail, $username, $userNome, $userPhoto, $userPwd, $userSalt);
        $excQuery->fetch();
        $pwd = hash('sha512', $pwd . $userSalt);

        if ($excQuery->num_rows == 1) {
            if (checkBruteForce($userEmail, $conn)) {
                return false;
            } else {
                if ($pwd == $userPwd) {
                    $_SESSION['userEmail'] = $userEmail;
                    $_SESSION['login_string'] = hash('sha512', $pwd.$_SERVER['HTTP_USER_AGENT']);
                    return true;
                } else {
                    $now = time();
                    $conn->query("INSERT INTO tentativi_login (EmailUtente, DataOra) VALUES ('$email', '$now')");
                    return false;
                }
            }
        } else {
            return false;
        }
    }
}

/**
 * Function for the check against the brute-force attacks
 * @param string $email The email of the user
 * @param mysqli $conn The connection to the database
 * @return bool False if there isn't an attack, true otherwise
 */
function checkBruteForce($email, $conn)
{
    $now = time();
    //Analyzing the login attemps from 2 hours
    $valid_attempts = $now - (2 * 60 * 60);
    if ($query = $conn->prepare("SELECT DataOra FROM tentativi_login WHERE EmailUtente = ? AND DataOra > '$valid_attempts'")) {
        $query->bind_param('i', $email);
        $query->execute();
        $query->store_result();
        if ($query->num_rows > 5) {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * This function checks if the user is connected at the moment.
 * @param mysqli $conn The connection to the database
 * @return bool True if the user is logged, false otherwise.
 */
function checkLogin($conn)
{
    session_start();
    $password = "";
    if (isset($_SESSION['userEmail'])) {
        if ($query = $conn->prepare("SELECT pwd FROM utenti WHERE email = ? LIMIT 1")) {
            $query->bind_param('i', $_SESSION['userEmail']);
            $query->execute();
            $query->store_result();

            if ($query->num_rows == 1) { 
                $query->bind_result($password);
                $query->fetch();
                $login_check = hash('sha512', $password.$_SERVER['HTTP_USER_AGENT']);
                return true;
                /*if ($login_check == $_SESSION['login_string']) {
                    return true;
                } else {
                    return false;
                }*/
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
