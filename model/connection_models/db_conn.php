<?php
$conn = new mysqli("localhost", "secureUser", "P4sswordLungaMaSicura!", "squisito_db", 3306);

if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}
?>