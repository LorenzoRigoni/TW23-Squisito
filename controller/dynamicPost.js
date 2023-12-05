// Funzione per caricare e visualizzare le immagini
function caricaImmagini() {
  // Configurare la richiesta
  $.ajax({
    url: "/tw23-squisito/model/post_models/get_followed_post.php",
    method: "GET",
    dataType: "json",
    success: function (datiJSON) {
      // Creare il contenitore per le immagini
      let contenitoreImmagini = document.getElementById("posts-box");

      // Iterare attraverso i dati JSON e visualizzare le immagini
      $.each(datiJSON, function (i, post) {
        // Creare la card di Bootstrap
        let cardCol = document.createElement("div");
        cardCol.className = "col-sm-3 py-2";

        let card = document.createElement("div");
        card.className = "card shadow-sm border-0 rounded p-2 m-2";
        card.setAttribute("id", datiJSON[i].IDPost);
        card.addEventListener("click", postClick, false);
        let cardBody = document.createElement("div");
        cardBody.className = "card-body p-0";

        // Creare la prima riga con l'immagine del profilo e il nome utente
        let row1 = document.createElement("div");
        row1.className = "row p-0";

        let profileImageCol = document.createElement("div");
        profileImageCol.className = "col-auto";

        let profileImage = document.createElement("img");
        profileImage.src = "data:image/jpeg;base64," + datiJSON[i].FotoProfilo;
        profileImage.alt = "profile-image";
        profileImage.className = "avatar avatar-32 rounded-circle p-1";

        let userInfoCol = document.createElement("div");
        userInfoCol.className = "col-auto";

        let userName = document.createElement("h6");
        userName.className = "mb-0";
        userName.textContent = datiJSON[i].Username;

        let userLocation = document.createElement("p");
        userLocation.className = "country-posts text-muted m-0";
        userLocation.textContent = datiJSON[i].Nazione;

        // Aggiungere elementi alla prima riga
        profileImageCol.appendChild(profileImage);
        userInfoCol.appendChild(userName);
        userInfoCol.appendChild(userLocation);
        row1.appendChild(profileImageCol);
        row1.appendChild(userInfoCol);

        // Creare la seconda riga con l'immagine principale
        let row2 = document.createElement("div");
        row2.className = "row p-0 mx-1";

        let mainImage = document.createElement("img");
        mainImage.src = "data:image/jpeg;base64," + datiJSON[i].Foto;
        mainImage.alt = datiJSON[i].Titolo;
        mainImage.className = "w-100 rounded card-img-top";

        // Aggiungere l'immagine principale alla seconda riga
        row2.appendChild(mainImage);

        //creo la riga con i Mi piace ed i commenti
        let row4 = document.createElement("div");
        row4.className = "row ps-1";

        let socialCol = document.createElement("div");
        socialCol.className = "col-12";

        let socialList = document.createElement("ul");
        socialList.className = "social mb-0 list-inline mt-2";

        // Creare il primo elemento della lista (cuore)
        let heartIcon = document.createElement("li");
        heartIcon.className = "list-inline-item m-0 pe-2";
        let heartSpan = document.createElement("span");
        heartSpan.className = "fas fa-heart social-link";
        heartSpan.addEventListener("click", likeClick, false);
        heartSpan.setAttribute("id", datiJSON[i].IDPost);
        heartIcon.appendChild(heartSpan);
        if (datiJSON[i]["IsLiked"]) {
          heartSpan.classList.add("clicked");
        }
        // Creare il secondo elemento della lista (commento)
        let commentIcon = document.createElement("li");
        commentIcon.className = "list-inline-item m-0 px-2";
        let commentLink = document.createElement("a");
        //commentLink.href = "/commenti.html";
        commentLink.title = "comments link";
        let commentSpan = document.createElement("span");
        commentSpan.className = "far fa-comment social-link";
        commentSpan.id = datiJSON[i].IDPost;
        commentSpan.addEventListener("click", postClick, false);
        commentLink.appendChild(commentSpan);
        commentIcon.appendChild(commentLink);

        // Aggiungere gli elementi alla lista social
        socialList.appendChild(heartIcon);
        socialList.appendChild(commentIcon);

        // Creare il paragrafo con le informazioni sui "Mi piace"
        let likedInfo = document.createElement("p");
        likedInfo.className = "liked m-1 ps-2";
        likedInfo.textContent = "Piace a ";
        let strongTag = document.createElement("strong");
        strongTag.textContent = datiJSON[i].NumLike + " persone";
        likedInfo.appendChild(strongTag);

        // Aggiungere la lista social e le informazioni sui "Mi piace" alla quarta riga
        socialCol.appendChild(socialList);
        socialCol.appendChild(likedInfo);
        row4.appendChild(socialCol);

        //creo riga con il titolo e la data
        let row3 = document.createElement("div");
        row3.className = "row p-1";

        let titleCol = document.createElement("div");
        titleCol.className = "col-12";

        let title = document.createElement("h5");
        title.className = "mb-0";
        title.textContent = datiJSON[i].Titolo;

        let date = document.createElement("p");
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

        // Aggiungere il corpo della card alla card stessa
        card.appendChild(cardBody);

        // Aggiungere la card alla colonna
        cardCol.appendChild(card);

        // Aggiungere la colonna al contenitore
        contenitoreImmagini.appendChild(cardCol);
      });
    },
    error: function (xhr, status, error) {
      console.error("Errore durante la richiesta AJAX:", status, error);
    },
  });
}
// Chiamare la funzione quando la pagina è pronta
window.onload = caricaImmagini;
