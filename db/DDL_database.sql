CREATE DATABASE squisito_DB;

CREATE TABLE utenti(
    Email VARCHAR(50) NOT NULL PRIMARY KEY,
    Username VARCHAR(30) NOT NULL,
    Nome VARCHAR(50) NOT NULL,
    FotoProfilo VARBINARY(MAX),
    Pwd CHAR(128) NOT NULL
);

CREATE TABLE post(
    IDPost INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    EmailUtente VARCHAR(50) NOT NULL,
    Titolo VARCHAR(30) NOT NULL,
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

CREATE TABLE foto(
    IDFoto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    IDPost INT NOT NULL,
    Immagine VARBINARY(MAX) NOT NULL,
    FOREIGN KEY (IDPost) REFERENCES post(IDPost)
);

CREATE TABLE tentativi_login(
    EmailUtente VARCHAR(50) NOT NULL,
    DataOra DATETIME NOT NULL
);

CREATE TABLE seguiti(
    EmailSeguito VARCHAR(50) NOT NULL,
    EmailFollower VARCHAR(50) NOT NULL,
    DataInizio DATE,
    PRIMARY KEY (EmailSeguito, EmailFollower)
);

/*Da chiarire*/
/*CREATE TABLE notifiche(
    Email VARCHAR(50) NOT NULL,
    EmailFollower VARCHAR(50) NOT NULL,
    DataInizio DATE,
    PRIMARY KEY (EmailSeguito, EmailFollower)
);*/

CREATE TABLE mi_piace(
    EmailUtente VARCHAR(50) NOT NULL,
    IDPost INT NOT NULL,
    PRIMARY KEY (EmailUtente, IDPost)
);