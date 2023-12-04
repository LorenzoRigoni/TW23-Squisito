
window.addEventListener("load", function () {
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("id")) {
    // true
    let IDPost = searchParams.get("id");
    const url =
      "/tw23-squisito/model/post_models/get_single_post.php?IDPost=" + IDPost;

    const formData = new FormData();
    formData.append("IDPost", IDPost);
    let textareaElement = document.getElementById("textArea");
    textareaElement.setAttribute("name", IDPost);
	

    // Effettuare una richiesta fetch per inviare i dati al server
    fetch(url, {})
      .then((response) => response.text())
      .then((text) => {
        const datiJSON = JSON.parse(text); //datiJSON[0]['Nazione'];
        let contenitorePost = document.getElementById("post-box");

    let followBtn = document.getElementById("followBtn");
    followBtn.setAttribute("data_id", datiJSON[0].IDPost);
        
    followBtn.addEventListener("click", function(event) {
    	sendFollow(event);
	}, false);
	 
        let heart = document.getElementById("heart");
        heart.addEventListener("click",likeClick,false);
        heart.setAttribute("id", datiJSON[0].IDPost);
        if(datiJSON[0]['IsLiked']){
          heart.classList.add('clicked');
        }
        let contenitoreCommenti = document.getElementById("comment");
        // Creare la card di Bootstrap
        document.getElementById("nomeUtente").textContent =
          datiJSON[0]["UsernamePost"];
        document.getElementById("Paese").textContent = datiJSON[0]["Nazione"];
        document.getElementById("testoRicetta").textContent =
          datiJSON[0]["Ricetta"];
        let flagElement = document.getElementById("flag");
        flagElement.src =
          "/tw23-squisito/view/resource/flags/" +
          datiJSON[0]["Shortname"] +
          ".png";
        let fotoProfiloPost = document.getElementById("fotoUtentePost");
        fotoProfiloPost.src =
          "data:image/jpeg;base64," + datiJSON[0]["FotoProfilo"];

        let heroImage = document.getElementById("immagineMain");

        // Imposta il nuovo URL come sfondo dell'immagine
        let  immagine = "data:image/jpg;base64," + datiJSON[0]["FotoRicetta"];
        heroImage.style.backgroundImage = 'url("' + immagine + '")';
        for (let i = 1; i < datiJSON.length; i++) {
          // Creare la struttura HTML del commento
          let commentContainer = document.createElement("div");
          commentContainer.className = "row comment py-3";

          let avatarCol = document.createElement("div");
          avatarCol.className = "col-auto";
          let avatar = document.createElement("img");
          avatar.src =
            "data:image/jpeg;base64," + datiJSON[i]["FotoProfiloCom"];
          avatar.alt = "profile-image";
          avatar.className = "avatar avatar-32 rounded-circle my-auto";
          avatarCol.appendChild(avatar);

          let usernameCol = document.createElement("div");
          usernameCol.className = "col-auto my-auto p-0";
          let strong = document.createElement("strong");
          let usernameParagraph = document.createElement("p");
          usernameParagraph.className = "m-0";
          usernameParagraph.textContent = datiJSON[i]["Username"];
          strong.appendChild(usernameParagraph);
          usernameCol.appendChild(strong);

          let contentCol = document.createElement("div");
          contentCol.className = "col-auto my-auto";
          let contentParagraph = document.createElement("p");
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
          IDPost: $("#textArea").attr("name"),
        },
        success: function (result) {
        },
      });
    });

    let user = sessionStorage.getItem("email");
    $.ajax({
      url: "/tw23-squisito/model/user_models/get_user_info.php", 
      type: "GET", 
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
function likeClick(event) {                                               
   $.ajax({
        url:"/tw23-squisito/model/post_models/like_models.php",  
        type: "POST",   
        data: {
            IDPost : event.currentTarget.id,
        },
        success:function(result){
			alert(result);
          if ($(".fa-heart").hasClass("clicked")) {
            $(".fa-heart").removeClass("clicked");
          } else {
            $(".fa-heart").addClass("clicked"); 
          } 
        }
    });
}
function sendFollow(event) {
   $.ajax({
        url:"/tw23-squisito/model/user_models/follow_models.php",  
        type: "POST",   
        data: {
            "IDPost" : event.currentTarget.getAttribute("data_id"),
        },
        success:function(result){
		const alreadyFollowedIndex = result.indexOf('"alreadyFollowed":');
		const alreadyFollowedSubstring = result.slice(alreadyFollowedIndex, result.indexOf('}', alreadyFollowedIndex) );
		let alreadyFollowedObject = JSON.parse('{' + alreadyFollowedSubstring + '}');		
	if(!alreadyFollowedObject.alreadyFollowed){	 
                alert("Hai Inizato a seguirlo");
				 $("#followBtn").removeClass("follow");
				 $("#followBtn").addClass("follow:focus");
    }else {
 		alert("Hai smesso di seguirlo");
		 $("#followBtn").removeClass("follow:focus");
		 $("#followBtn").addClass("follow");
		
	 }  
        }
    });
}

