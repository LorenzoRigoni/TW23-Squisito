
        // Funzione per caricare e visualizzare le immagini
        function caricaPost() {
            // Creare un oggetto XMLHttpRequest
            var xhr = new XMLHttpRequest();

            // Configurare la richiesta
            xhr.open("GET", "/tw23-squisito/model/post_models/get_single_post.php", true);

            // Inviare la richiesta
            xhr.send();
            
            // Definire la funzione di gestione degli eventi per la risposta
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Ottenere i dati JSON dalla risposta
                    var datiJSON = JSON.parse(xhr.responseText);

					document.getElementById("profileImage").src = "data:image/jpeg;base64," + datiJSON[i].FotoUtente;
                    // Creare il contenitore per le immagini
                    var contenitorePost = document.getElementById("row h-100 d-flex");
					
					var main = document.createElement("div");
					main.className = "col-12 col-md-6 d-inline-block hero-image";
					
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
					
					placeDiv.appendChild(countryImage);
					placeDiv.appendChild(countrySpan);
					
					var likeRow = document.createElement("div");
					likeRow.className = "row p-3";
					
					var heartSpan = document.createElement("span");
					heartSpan.className = "fas fa-heart like";
					likeRow.appendChild(heartSpan);
					var profileCol = document.createElement("div");
					profileCol.className = "col-12 col-md-6 d-inline-block";
					placeCol.appendChild(placeDiv);
					
					//parte nuova aggiunta
					
// Creazione dell'elemento div con la classe "row justify-content-between"
var rowDiv = document.createElement("div");
rowDiv.classList.add("row", "justify-content-between");

// Creazione dell'elemento div con la classe "col-1"
var colDiv = document.createElement("div");
colDiv.classList.add("col-1");

// Creazione dell'elemento div con la classe "back-button"
var backButtonDiv = document.createElement("div");
backButtonDiv.classList.add("back-button");

// Creazione dell'elemento span con le classi "fas fa-arrow-left fa-lg"
var arrowSpan = document.createElement("span");
arrowSpan.classList.add("fas", "fa-arrow-left", "fa-lg");

// Aggiunta dell'elemento span all'elemento div con la classe "back-button"
backButtonDiv.appendChild(arrowSpan);

// Aggiunta dell'elemento div con la classe "back-button" all'elemento div con la classe "col-1"
colDiv.appendChild(backButtonDiv);

// Aggiunta dell'elemento div con la classe "col-1" all'elemento div con la classe "row justify-content-between"
rowDiv.appendChild(colDiv);
rowDiv.appendChild(placeCol);
main.appendChild(rowDiv);
main.appendChild(likeRow);
contenitorePost(main);

var contenitoreCommenti = document.getElementById("row ps-5 p-3 posts");

// Creazione dell'elemento div con la classe "row p-2 pt-5"
var mainRowDiv = document.createElement("div");
mainRowDiv.classList.add("row", "p-2", "pt-5");

// Creazione dell'elemento div con la classe "col-auto"
var colAutoDiv = document.createElement("div");
colAutoDiv.classList.add("col-auto");

// Creazione dell'elemento img con gli attributi src, alt e le classi specificate
var profileImg = document.createElement("img");
profileImg.src = "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp";
profileImg.alt = "profile-image";
profileImg.classList.add("avatar", "avatar-64", "rounded-circle", "my-auto");

// Aggiunta dell'elemento img all'elemento div con la classe "col-auto"
colAutoDiv.appendChild(profileImg);

// Aggiunta dell'elemento div con la classe "col-auto" al mainRowDiv
mainRowDiv.appendChild(colAutoDiv);

// Creazione dell'elemento div con la classe "col-auto d-flex my-auto"
var colAutoFlexDiv = document.createElement("div");
colAutoFlexDiv.classList.add("col-auto", "d-flex", "my-auto");

// Creazione dell'elemento strong
var strongElement = document.createElement("strong");

// Creazione dell'elemento h5 con il testo "Ana Caroline"
var h5Element = document.createElement("h5");
h5Element.textContent = "Ana Caroline";

// Aggiunta dell'elemento h5 all'elemento strong
strongElement.appendChild(h5Element);

// Aggiunta dell'elemento strong all'elemento div con la classe "col-auto d-flex my-auto"
colAutoFlexDiv.appendChild(strongElement);

// Creazione dell'elemento input con gli attributi type, class e value
var followButton = document.createElement("input");
followButton.type = "button";
followButton.classList.add("btn", "btn-sm", "mx-4", "follow");
followButton.value = "Follow";

// Aggiunta dell'elemento input all'elemento div con la classe "col-auto d-flex my-auto"
colAutoFlexDiv.appendChild(followButton);

// Aggiunta dell'elemento div con la classe "col-auto d-flex my-auto" al mainRowDiv
mainRowDiv.appendChild(colAutoFlexDiv);

// Creazione dell'elemento div con la classe "line-1 my-4"
var lineDiv = document.createElement("div");
lineDiv.classList.add("line-1", "my-4");

// Aggiunta dell'elemento div con la classe "line-1 my-4" al mainRowDiv
mainRowDiv.appendChild(lineDiv);

// Creazione dell'elemento div con la classe "row py-3"
var contentDiv = document.createElement("div");
contentDiv.classList.add("row", "py-3");
contentDiv.textContent = "Oggi una ricetta dolce al punto giusto per festeggiare una giornata piena d'amore come San Valentino: i MACARONS! #paris #france #iloveit";

// Aggiunta dell'elemento div con la classe "row py-3" al mainRowDiv
mainRowDiv.appendChild(contentDiv);

// Creazione dell'elemento div con la classe "row post-time"
var postTimeDiv = document.createElement("div");
postTimeDiv.classList.add("row", "post-time");
postTimeDiv.textContent = "Posted 2hr ago";

// Aggiunta dell'elemento div con la classe "row post-time" al mainRowDiv
mainRowDiv.appendChild(postTimeDiv);
profileCol.appendChild(mainRowDiv);
contenitorePost.appendChild(profileCol);


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
	contenitoreCommenti.appendChild(commentRow);
    // Aggiungere la struttura HTML del commento al contenitore dei commenti
}
				}
			};
		}
		mainRowDiv.appendChild(contenitoreCommenti);
        // Chiamare la funzione quando la pagina è pronta
        window.onload = caricaPost;
