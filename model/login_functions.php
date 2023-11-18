<?

//Funzione di login
function login($email, $pwd, $conn)
{
    $userEmail = "";
    $username = "";
    $userNome = "";
    $userPwd = "";
    $userSalt = "";
    $userPhoto = 0;
    $query = "SELECT Email, Username, Nome, FotoProfilo, Pwd, Salt FROM utenti WHERE Email = ?";
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
                    $_SESSION['userNome'] = $userNome;
                    $_SESSION['username'] = $username;
                    $_SESSION['userPhoto'] = $userPhoto;
                    $_SESSION['login_string'] = hash('sha512', $pwd.$_SERVER['HTTPS_USER_AGENT']);
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

function checkBruteForce($email, $conn)
{
    $now = time();
    // Vengono analizzati tutti i tentativi di login a partire dalle ultime due ore.
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

function checkLogin($conn)
{
    $password = "";
    if (isset($_SESSION['userEmail'], $_SESSION['userNome'], $_SESSION['username'], $_SESSION['userPhoto'], $_SESSION['login_string'])) {
        if ($query = $conn->prepare("SELECT pwd FROM utenti WHERE email = ? LIMIT 1")) {
            $query->bind_param('i', $_SESSION['userEmail']);
            $query->execute();
            $query->store_result();

            if ($query->num_rows == 1) { 
                $query->bind_result($password);
                $query->fetch();
                $login_check = hash('sha512', $password.$_SERVER['HTTPS_USER_AGENT']);
                if ($login_check == $_SESSION['login_string']) {
                    // Login eseguito
                    return true;
                } else {
                    //  Login non eseguito
                    return false;
                }
            } else {
                // Login non eseguito
                return false;
            }
        } else {
            // Login non eseguito
            return false;
        }
    } else {
        // Login non eseguito
        return false;
    }
}
