
        // Funzione per caricare e visualizzare le immagini
        function caricaPost() {
            // Creare un oggetto XMLHttpRequest
            var xhr = new XMLHttpRequest();

            // Configurare la richiesta
            xhr.open("GET", "/tw23-squisito/model/post_models/get_followed_post.php", true);

            // Inviare la richiesta
            xhr.send();
            
            // Definire la funzione di gestione degli eventi per la risposta
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Ottenere i dati JSON dalla risposta
                    var datiJSON = JSON.parse(xhr.responseText);

					document.getElementById("profileImage").src = "data:image/jpeg;base64," + datiJSON[i].FotoUtente;
                    // Creare il contenitore per le immagini
                    var contenitorePost = document.getElementById("row ps-5 p-3 posts");
					
					var postRow = document.createElement("div");
					postRow.className = "row post-container mb-4";

					var placeCol = document.createElement("div");
					placeCol.className = "col-5";

					var placeDiv = document.createElement("div");
					placeDiv.className = "place float-end";
					
					var countryImage = document.createElement("img");
					countryImage.src = "data:image/jpeg;base64," + datiJSON[i].Foto;
					countryImage.alt = "recipe image";
					countryImage.className = "flag";
					
					var countrySpan = document.createElement("span");
					countrySpan.textContent = datiJSON[i].Nazione;
					
					var likeRow = document.createElement("div");
					likeRow.className = "row p-3";
					
					var heartSpan = document.createElement("span");
					heartSpan.className = "fas fa-heart like";
					
					var profileCol = document.createElement("div");
					profileCol.className = "col-12 col-md-6 d-inline-block";

    // Creare la card di Bootstrap
	for (var i = 0; i < datiJSON.length; i++) {
    // Creare la struttura HTML del commento
    var commentRow = document.createElement("div");
    commentRow.className = "row comment py-3";

    var avatarCol = document.createElement("div");
    avatarCol.className = "col-auto";

    var avatarImage = document.createElement("img");
    avatarImage.src = "data:image/jpeg;base64," + datiJSON[i].FotoProfilo;
    avatarImage.alt = "profile-image";
    avatarImage.className = "avatar avatar-32 rounded-circle my-auto";

    var usernameCol = document.createElement("div");
    usernameCol.className = "col-auto my-auto p-0";

    var strongTag = document.createElement("strong");

    var username = document.createElement("p");
    username.className = "m-0";
    username.textContent = datiJSON[i].Username;

    var commentTextCol = document.createElement("div");
    commentTextCol.className = "col-auto my-auto";

    var commentText = document.createElement("div");
    commentText.textContent = datiJSON[i].Commento;

    // Aggiungere gli elementi alla struttura HTML del commento
    avatarCol.appendChild(avatarImage);
    strongTag.appendChild(username);
    usernameCol.appendChild(strongTag);
    commentRow.appendChild(avatarCol);
    commentRow.appendChild(usernameCol);
    commentRow.appendChild(commentTextCol);
    commentTextCol.appendChild(commentText);
	contenitorePost.appendChild(commentRow);
    // Aggiungere la struttura HTML del commento al contenitore dei commenti
}
				}
			};
		}
        // Chiamare la funzione quando la pagina è pronta
        window.onload = caricaPost;
