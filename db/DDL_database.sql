CREATE DATABASE squisito_DB;

CREATE USER 'secureUser'@'localhost' IDENTIFIED BY 'P4sswordLungaMaSicura!';
GRANT SELECT, INSERT, UPDATE, DELETE ON `squisito_db`.* TO 'secureUser'@'localhost';

CREATE TABLE nazioni(
    IDNazione INT NOT NULL PRIMARY KEY,
    Shortname VARCHAR(3) NOT NULL,
    Nome VARCHAR(150) NOT NULL
);

CREATE TABLE utenti(
    Email VARCHAR(50) NOT NULL PRIMARY KEY,
    Username VARCHAR(30) NOT NULL,
    Nome VARCHAR(50) NOT NULL,
    FotoProfilo LONGBLOB,
    Bio VARCHAR(500),
    Pwd CHAR(128) NOT NULL,
    Salt CHAR(128) NOT NULL
);

CREATE TABLE post(
    IDPost INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    EmailUtente VARCHAR(50) NOT NULL,
    Titolo VARCHAR(30) NOT NULL,
    Foto LONGBLOB,
    Ricetta VARCHAR(500) NOT NULL,
    IDNazione INT NOT NULL,
    DataPost DATE NOT NULL,
    FOREIGN KEY (EmailUtente) REFERENCES utenti(Email),
    FOREIGN KEY (IDNazione) REFERENCES nazioni(IDNazione)
);

CREATE TABLE commenti(
    IDCommento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    IDPost INT NOT NULL,
    EmailUtente VARCHAR(50) NOT NULL,
    Contenuto VARCHAR(100) NOT NULL,
    DataCommento DATE NOT NULL,
    FOREIGN KEY (IDPost) REFERENCES post(IDPost),
    FOREIGN KEY (EmailUtente) REFERENCES utenti(Email)
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
    Visualizzato TINYINT(1) DEFAULT FALSE,
    FOREIGN KEY (EmailMittente) REFERENCES utenti(Email),
    FOREIGN KEY (EmailDestinatario) REFERENCES utenti(Email),
    FOREIGN KEY (IDPost) REFERENCES post(IDPost)
);

CREATE TABLE mi_piace(
    EmailUtente VARCHAR(50) NOT NULL,
    IDPost INT NOT NULL,
    DataLike DATE NOT NULL,
    PRIMARY KEY (EmailUtente, IDPost)
);