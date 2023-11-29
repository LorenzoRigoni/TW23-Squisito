// Funzione per caricare e visualizzare le immagini
window.addEventListener("load", function () {
  // Creare un oggetto XMLHttpRequest
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("id")) {
    // true
    let IDPost = searchParams.get("id");
    const url =
      "/tw23-squisito/model/post_models/get_single_post.php?IDPost=" + IDPost;

    const formData = new FormData();
    formData.append("IDPost", IDPost);
    var textareaElement = document.getElementById("textArea");
    textareaElement.setAttribute("data_IDPost", IDPost);
     $("#followBtn").attr("id",IDPost);    

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

         var heart = document.getElementById("heart");
        heart.addEventListener("click",likeClick,false);
        heart.setAttribute("id", datiJSON[0].IDPost);
        if(datiJSON[0]['IsLiked']){
          heart.style.color = 'red';
        }
        var contenitoreCommenti = document.getElementById("row ps-5 p-3 posts");
        // Creare la card di Bootstrap
        document.getElementById("nomeUtente").textContent =
          datiJSON[0]["UsernamePost"];
        document.getElementById("Paese").textContent = datiJSON[0]["Nazione"];
        document.getElementById("testoRicetta").textContent =
          datiJSON[0]["Ricetta"];
        var flagElement = document.getElementById("flag");
        flagElement.src =
          "/tw23-squisito/view/resource/flags/" +
          datiJSON[0]["Shortname"] +
          ".png";
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
          avatar.src =
            "data:image/jpeg;base64," + datiJSON[i]["FotoProfiloCom"];
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
    $(".pubblica").on("click", function () {
      $.ajax({
        url: "/tw23-squisito/model/post_models/send_comment.php",
        type: "POST",
        data: {
          Contenuto: document.getElementById("textArea").value,
          IDPost: $("#textArea").attr("data_IDPost"),
        },
        success: function (result) {},
      });
    });

    let user = sessionStorage.getItem("email");
    $.ajax({
      url: "/tw23-squisito/model/user_models/get_user_info.php", //the page containing php script
      type: "GET", //request type,
      data: {
        email: user,
      },
      success: function (result) {
        const responseObj = JSON.parse(result);
        $("#photo_comment").attr(
          "src",
          "data:image/png;base64," + responseObj[0].FotoProfilo
        );
      },
    });
  }
});
