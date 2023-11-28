// Funzione per caricare e visualizzare le immagini
function caricaPost() {
  // Creare un oggetto XMLHttpRequest
  var xhr = new XMLHttpRequest();
  const urlParams = new URLSearchParams(window.location.search);
  const IDPost = urlParams.get("id");
  const url =
    "/tw23-squisito/model/post_models/get_single_post.php?IDPost=" + IDPost;

  const formData = new FormData();
  formData.append("IDPost", IDPost);

  // Effettuare una richiesta fetch per inviare i dati al server
  fetch(url, {})
    .then((response) => response.text())
    .then((text) => {
      //alert(text);
      //const startIndex = text.indexOf('[{');

      // Estrai solo la parte della stringa che inizia dal secondo oggetto JSON
      //const jsonString = text.substring(startIndex);

      const datiJSON = JSON.parse(text); //datiJSON[0]['Nazione'];
      var contenitorePost = document.getElementById("row h-100 d-flex");

      var contenitoreCommenti = document.getElementById("row ps-5 p-3 posts");
      // Creare la card di Bootstrap
      document.getElementById("nomeUtente").textContent =
        datiJSON[0]["UsernamePost"];
      document.getElementById("Paese").textContent = datiJSON[0]["Nazione"];
      document.getElementById("testoRicetta").textContent =
        datiJSON[0]["Ricetta"];
      var flagElement = document.getElementById("flag");
      flagElement.src =
        "/tw23-squisito/view/style/flags/" + datiJSON[0]["Shortname"] + ".png";
      var fotoProfiloPost = document.getElementById("fotoUtentePost");
      fotoProfiloPost.src =
        "data:image/jpeg;base64," + datiJSON[0]["FotoProfilo"];

      var heroImage = document.getElementById("immagineMain");

      // Imposta il nuovo URL come sfondo dell'immagine
      //heroImage.src  = "data:image/jpg;base64,"+ datiJSON[0]["FotoRicetta"];
      var prova = "data:image/jpg;base64," + datiJSON[0]["FotoRicetta"];
      heroImage.style.backgroundImage = 'url("' + prova + '")';
      for (var i = 1; i < datiJSON.length; i++) {
        // Creare la struttura HTML del commento
        var commentContainer = document.createElement("div");
        commentContainer.className = "row comment py-3";

        var avatarCol = document.createElement("div");
        avatarCol.className = "col-auto";
        var avatar = document.createElement("img");
        avatar.src = "data:image/jpeg;base64," + datiJSON[i]["FotoProfiloCom"];
        avatar.alt = "profile-image";
        avatar.className = "avatar avatar-32 rounded-circle my-auto";
        avatarCol.appendChild(avatar);

        var usernameCol = document.createElement("div");
        usernameCol.className = "col-auto my-auto p-0";
        var strong = document.createElement("strong");
        var usernameParagraph = document.createElement("p");
        usernameParagraph.className = "m-0";
        usernameParagraph.textContent = datiJSON[i]["Username"];
        strong.appendChild(usernameParagraph);
        usernameCol.appendChild(strong);

        var contentCol = document.createElement("div");
        contentCol.className = "col-auto my-auto";
        var contentParagraph = document.createElement("p");
        contentParagraph.textContent = datiJSON[i]["Contenuto"];
        contentCol.appendChild(contentParagraph);

        // Aggiunta degli elementi al container del commento
        commentContainer.appendChild(avatarCol);
        commentContainer.appendChild(usernameCol);
        commentContainer.appendChild(contentCol);

        contenitoreCommenti.appendChild(commentContainer);
        // Aggiunta del commento al documento
      }
    });
  // Configurare la richiesta
  //xhr.open("GET", url, true);

  // Inviare la richiesta
  //xhr.send();

  // Definire la funzione di gestione degli eventi per la risposta
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Ottenere i dati JSON dalla risposta
      //alert(xhr.responseText);
      // const datiJSON = JSON.parse(xhr.responseText);

      alert(post);

      //document.getElementById("profileImage").src = "data:image/jpeg;base64," + datiJSON.FotoUtente;
      // Creare il contenitore per le immagini
    }
  };
  let user = sessionStorage.getItem('email');
    $.ajax({
        url:"/tw23-squisito/model/user_models/get_user_info.php",    //the page containing php script
        type: "GET",    //request type,
        data: {
            "email" : user
        },
        success:function(result){
            const responseObj = JSON.parse(result);
            $("#photo_comment").attr("src", "data:image/png;base64,"+responseObj[0].FotoProfilo);
        }
    });
}
//mainRowDiv.appendChild(contenitoreCommenti);
// Chiamare la funzione quando la pagina è pronta
window.onload = caricaPost;
