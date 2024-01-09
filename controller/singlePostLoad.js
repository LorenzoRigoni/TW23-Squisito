document.addEventListener("load", function () {
  //get id post from param
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("id")) {
    // true
    let IDPost = searchParams.get("id");
    const url =
      "/tw23-squisito/model/post_models/get_single_post.php?IDPost=" + IDPost;

    const formData = new FormData();
    formData.append("IDPost", IDPost);

    // Effettuare una richiesta fetch per inviare i dati al server
    fetch(url, {})
      .then((response) => response.text())
      .then((text) => {
        const datiJSON = JSON.parse(text); //datiJSON[0]['Nazione'];
        let followBtn = document.getElementById("followBtn");
        followBtn.setAttribute("name", datiJSON[0].IDPost);
        followBtn.className ="btn btn-dark follow"
        followBtn.addEventListener(
          "click",
          function (event) {
            sendFollow(event);
          },
          false
        );
        //check follow 
        $.ajax({
          url: "/tw23-squisito/model/user_models/is_followed.php",
          type: "GET",
          data: {
            email: datiJSON[0]["Email"],
          },
          success: function (result) {
            if (result == "") {
              $("#followBtn").removeClass("clicked");
            } else {
              $("#followBtn").addClass("clicked");
            }
          },
        });
        let heart = document.getElementById("heart");
        heart.addEventListener("click", likeClick, false);
        heart.setAttribute("id", datiJSON[0].IDPost);
        if (datiJSON[0]["IsLiked"]) {
          heart.classList.add("clicked");
        }
        // Creare la card di Bootstrap
        document.getElementById("nomeUtente").textContent =
          datiJSON[0]["Username"];
        document.getElementById("Paese").textContent = datiJSON[0]["Nazione"];
        document.getElementById("testoRicetta").textContent =
          datiJSON[0]["Ricetta"];
        document.getElementById("Titolo").textContent =
          datiJSON[0]["Titolo"];
        let flagElement = document.getElementById("flag");
        flagElement.src =
          "/tw23-squisito/view/resource/flags/" +
          datiJSON[0]["Shortname"] +
          ".png";
        let fotoProfiloPost = document.getElementById("fotoUtentePost");
        fotoProfiloPost.setAttribute("name",datiJSON[0]["Email"])
        if (datiJSON[0]["FotoProfilo"] != "") {
          fotoProfiloPost.src =
            "data:image/jpeg;base64," + datiJSON[0]["FotoProfilo"];
        }
        fotoProfiloPost.addEventListener(
          "click",
          function (event) {
            openProfile(event);
          },
          false
        );
        let heroImage = document.getElementById("immagineMain");
        // Imposta il nuovo URL come sfondo dell'immagine
        let immagine = "data:image/jpg;base64," + datiJSON[0]["FotoRicetta"];
        heroImage.style.backgroundImage = 'url("' + immagine + '")';
        //load comment
        loadComment();
        //check if post is of focus user
        if (datiJSON[0]["Email"] == sessionStorage.getItem("userEmail")) {
          $("#delete_post").removeAttr("hidden");
        } else {
          $("#followBtn").removeAttr("hidden");
        }
        //calc different date
        let start = new Date();
        let end = new Date(datiJSON[0]["DataPost"]);
        let diff = start - end;
        let diffSeconds = diff / 1000;
        let posted_time_hour = Math.floor(diffSeconds / 3600);
        let posted_time_min = Math.floor(diffSeconds % 3600) / 60;

        if (posted_time_hour >= 24) {
          $("#data_post").text(
            "Postato " + Math.trunc(posted_time_hour / 24) + " giorni fa"
          );
        } else if (posted_time_hour < 24) {
          $("#data_post").text("Postato " + posted_time_hour + " ore fa");
        } else if (posted_time_min < 60) {
          $("#data_post").text(
            "Postato " + Math.trunc(posted_time_min) + " minuti fa"
          );
        }
      });
  }
});
function loadComment() {
  let searchParams = new URLSearchParams(window.location.search);
  $.ajax({
    url: "/tw23-squisito/model/post_models/get_comment.php",
    type: "GET",
    data: {
      IDPost: searchParams.get("id"),
    },
    success: function (datiJSON) {
      $("#comment").empty();
      let contenitoreCommenti = document.getElementById("comment");
      for (let i = 0; i < datiJSON.length; i++) {
        // Creare la struttura HTML del commento
        let commentContainer = document.createElement("div");
        commentContainer.className = "row comment py-3";

        let avatarCol = document.createElement("div");
        avatarCol.className = "col-auto";
        let avatar = document.createElement("img");
        avatar.src = "data:image/jpeg;base64," + datiJSON[i]["FotoProfilo"];
        avatar.alt = "profile-image";
        avatar.className = "avatar avatar-32 rounded-circle my-auto";
        avatar.setAttribute("name",datiJSON[i]["Email"]);
        avatar.addEventListener(
          "click",
          function (event) {
            openProfile(event);
          },
          false
        );
        avatarCol.appendChild(avatar);

        let usernameCol = document.createElement("div");
        usernameCol.className = "col-auto my-auto p-0";
        let usernameParagraph = document.createElement("p");
        usernameParagraph.className = "m-0 fw-bold";
        usernameParagraph.textContent = datiJSON[i]["Username"];
        usernameCol.appendChild(usernameParagraph);

        let contentCol = document.createElement("div");
        contentCol.className = "col-auto my-auto";
        let contentParagraph = document.createElement("p");
        contentParagraph.className = "m-0";
        contentParagraph.textContent = datiJSON[i]["Contenuto"];
        contentCol.appendChild(contentParagraph);

        // Aggiunta degli elementi al container del commento
        commentContainer.appendChild(avatarCol);
        commentContainer.appendChild(usernameCol);
        commentContainer.appendChild(contentCol);
        // Aggiunta del commento al documento
        contenitoreCommenti.appendChild(commentContainer);
      }
    },
  });
}
