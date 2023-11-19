CREATE DATABASE squisito_DB;

CREATE USER 'secureUser'@'localhost' IDENTIFIED BY 'P4sswordLungaMaSicura!';
GRANT SELECT, INSERT, UPDATE, DELETE ON `squisito_db`.* TO 'secureUser'@'localhost';

CREATE TABLE utenti(
    Email VARCHAR(50) NOT NULL PRIMARY KEY,
    Username VARCHAR(30) NOT NULL,
    Nome VARCHAR(50) NOT NULL,
    FotoProfilo BLOB,
    Pwd CHAR(128) NOT NULL,
    Salt CHAR(128) NOT NULL
);

CREATE TABLE post(
    IDPost INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    EmailUtente VARCHAR(50) NOT NULL,
    Titolo VARCHAR(30) NOT NULL,
    Foto BLOB,
    Ricetta VARCHAR(500) NOT NULL,
    Nazione VARCHAR(50) NOT NULL,
    FOREIGN KEY (EmailUtente) REFERENCES utenti(Email)
);

CREATE TABLE commenti(
    IDCommento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    IDPost INT NOT NULL,
    Contenuto VARCHAR(100) NOT NULL,
    FOREIGN KEY (IDPost) REFERENCES post(IDPost)
);

CREATE TABLE tentativi_login(
    EmailUtente VARCHAR(50) NOT NULL,
    DataOra VARCHAR(30) NOT NULL
);

CREATE TABLE seguiti(
    EmailSeguito VARCHAR(50) NOT NULL,
    EmailFollower VARCHAR(50) NOT NULL,
    DataInizio DATE,
    PRIMARY KEY (EmailSeguito, EmailFollower)
);

CREATE TABLE notifiche(
    IDNotifica INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    EmailMittente VARCHAR(50) NOT NULL,
    EmailDestinatario VARCHAR(50) NOT NULL,
    IDPost INT,
    DataNotifica DATE,
    TipoNotifica VARCHAR(30),
    FOREIGN KEY (EmailMittente) REFERENCES utenti(Email),
    FOREIGN KEY (EmailDestinatario) REFERENCES utenti(Email),
    FOREIGN KEY (IDPost) REFERENCES post(IDPost)
);

CREATE TABLE mi_piace(
    EmailUtente VARCHAR(50) NOT NULL,
    IDPost INT NOT NULL,
    PRIMARY KEY (EmailUtente, IDPost)
);