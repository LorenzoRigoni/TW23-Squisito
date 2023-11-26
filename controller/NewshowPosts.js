// Funzione per caricare e visualizzare le immagini
function caricaImmagini() {
  // Creare un oggetto XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Configurare la richiesta
  xhr.open(
    "GET",
    "/tw23-squisito/model/post_models/get_followed_post.php",
    true
  );

  // Inviare la richiesta
  xhr.send();

  // Definire la funzione di gestione degli eventi per la risposta
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Ottenere i dati JSON dalla risposta
      var datiJSON = JSON.parse(xhr.responseText);

      // Creare il contenitore per le immagini
      var contenitoreImmagini = document.getElementById("row posts-box");

      // Iterare attraverso i dati JSON e visualizzare le immagini
      for (var i = 0; i < datiJSON.length; i++) {
        // Creare la card di Bootstrap
        var cardCol = document.createElement("div");
        cardCol.className = "col-sm-4 py-2";

        var card = document.createElement("div");
        card.className = "card shadow-sm border-0 rounded p-2";
        card.setAttribute("id", datiJSON[i].IDPost);
        card.addEventListener("click",postClick,false);
        var cardBody = document.createElement("div");
        cardBody.className = "card-body p-0";

        // Creare la prima riga con l'immagine del profilo e il nome utente
        var row1 = document.createElement("div");
        row1.className = "row p-0";

        var profileImageCol = document.createElement("div");
        profileImageCol.className = "col-2";

        var profileImage = document.createElement("img");
        profileImage.src = "data:image/jpeg;base64," + datiJSON[i].FotoProfilo;
        profileImage.alt = "profile-image";
        profileImage.className = "avatar avatar-32 rounded-circle p-1";

        var userInfoCol = document.createElement("div");
        userInfoCol.className = "col-10";

        var userName = document.createElement("h6");
        userName.className = "mb-0";
        userName.textContent = datiJSON[i].Username;

        var userLocation = document.createElement("p");
        userLocation.className = "country-posts text-muted";
        userLocation.textContent = datiJSON[i].Nazione;

        // Aggiungere elementi alla prima riga
        profileImageCol.appendChild(profileImage);
        userInfoCol.appendChild(userName);
        userInfoCol.appendChild(userLocation);
        row1.appendChild(profileImageCol);
        row1.appendChild(userInfoCol);

        // Creare la seconda riga con l'immagine principale
        var row2 = document.createElement("div");
        row2.className = "row p-0";
        row2.style = "width: 90% ; margin-left: 2%;"; // Imposta la larghezza al 90%

        var mainImage = document.createElement("img");
        mainImage.src = "data:image/jpeg;base64," + datiJSON[i].Foto;
        mainImage.alt = datiJSON[i].Titolo;
        mainImage.className = "w-100 rounded card-img-top";

        // Aggiungere l'immagine principale alla seconda riga
        row2.appendChild(mainImage);

        //creo la riga con i Mi piace ed i commenti
        var row4 = document.createElement("div");
        row4.className = "row ps-1";

        var socialCol = document.createElement("div");
        socialCol.className = "col-12";

        var socialList = document.createElement("ul");
        socialList.className = "social mb-0 list-inline mt-2";

        // Creare il primo elemento della lista (cuore)
        var heartIcon = document.createElement("li");
        heartIcon.className = "list-inline-item m-0 pe-2";
        var heartSpan = document.createElement("span");
        heartSpan.className = "fas fa-heart social-link-clicked";
        heartIcon.appendChild(heartSpan);

        // Creare il secondo elemento della lista (commento)
        var commentIcon = document.createElement("li");
        commentIcon.className = "list-inline-item m-0 px-2";
        var commentLink = document.createElement("a");
        commentLink.href = "/commenti.html";
        commentLink.title = "comments link";
        var commentSpan = document.createElement("span");
        commentSpan.className = "far fa-comment social-link";
        commentLink.appendChild(commentSpan);
        commentIcon.appendChild(commentLink);

        // Aggiungere gli elementi alla lista social
        socialList.appendChild(heartIcon);
        socialList.appendChild(commentIcon);

        // Creare il paragrafo con le informazioni sui "Mi piace"
        var likedInfo = document.createElement("p");
        likedInfo.className = "liked m-1 ps-2";
        likedInfo.textContent = "Piace a ";
        var strongTag = document.createElement("strong");
        strongTag.textContent = datiJSON[i].NumLike+" persone";
        likedInfo.appendChild(strongTag);

        // Aggiungere la lista social e le informazioni sui "Mi piace" alla quarta riga
        socialCol.appendChild(socialList);
        socialCol.appendChild(likedInfo);
        row4.appendChild(socialCol);

        //creo riga con il titolo e la data
        var row3 = document.createElement("div");
        row3.className = "row p-1";

        var titleCol = document.createElement("div");
        titleCol.className = "col-12";

        var title = document.createElement("h5");
        title.className = "mb-0";
        title.textContent = datiJSON[i].Titolo;

        var date = document.createElement("p");
        date.className = "mb-0 country-posts text-muted";
        date.textContent = "Wed, 26 January 2021"; // Puoi sostituire questa data con datiJSON[i].data o un campo data effettivo

        // Aggiungere il titolo e la data alla terza riga
        titleCol.appendChild(title);
        titleCol.appendChild(date);
        row3.appendChild(titleCol);

        // Aggiungere le due righe al corpo della card
        cardBody.appendChild(row1);
        cardBody.appendChild(row2);
        cardBody.appendChild(row4);
        cardBody.appendChild(row3);

        // ... (Continua a creare gli altri elementi della card come descritto nell'esempio)

        // Aggiungere il corpo della card alla card stessa
        card.appendChild(cardBody);

        // Aggiungere la card alla colonna
        cardCol.appendChild(card);

        // Aggiungere la colonna al contenitore
        contenitoreImmagini.appendChild(cardCol);
      }
    }
  };
}

// Chiamare la funzione quando la pagina è pronta
window.onload = caricaImmagini;
