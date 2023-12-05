$("#choose-image").change(function () {
  const file = this.files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    $("#hero-image").css("background-image", 'url("' + reader.result + '")');
  };
  if (file) {
    reader.readAsDataURL(file);
  } else {
  }
});

$("#sendPostButton").on("click", function () {
  const fileInputValue = $("#choose-image").val();
  const selectCountry = $("#sel1").val();
  const recipe = $("#recepi").val();
  const title = $("#titlePost").val();
  $.ajax({
    type: "POST",
    url: "/tw23-squisito/model/post_models/add_post.php",
    data: {
      Foto: fileInputValue,
      IDNazione: selectCountry,
      Ricetta: recipe,
      Titolo: title,
    },
    success: function (response) {
      alert("Post Creato");
    },
    error: function (error) {
      console.error(error);
    },
  });
});

window.addEventListener('load', function() {
  if (Cookies.get("userEmail")) {
    sessionStorage.setItem("userEmail", Cookies.get("userEmail"));
    sessionStorage.setItem("login_string", Cookies.get("login_string"));
  } else if(!Cookies.get("userEmail") && !this.sessionStorage.getItem("userEmail")){
    window.location.href = "../view/index.html";
  }
  //load image profile
  let user = sessionStorage.getItem("userEmail");
  $.ajax({
    url: "/tw23-squisito/model/user_models/get_user_info.php",
    type: "GET",
    data: {
      email: user,
    },
    success: function (result) {
      const responseObj = JSON.parse(result);
      if(responseObj[0].FotoProfilo != ""){

      $("#user-photo-small").attr(
        "src",
        "data:image/png;base64," + responseObj[0].FotoProfilo
      );
      }
    },
  });

  $.ajax({
    url: "/tw23-squisito/model/post_models/get_nations.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      // Rimuovi le opzioni esistenti
      $("#sel1").empty();
      // Aggiungi le nuove opzioni
      data.forEach(function (option) {
        // Crea l'elemento option
        let newOption = $("<option>", {
          value: option.IDNazione,
          text: option.Nome,
          id: option.Shortname,
        });
        // Aggiungi l'opzione al menu a discesa
        $("#sel1").append(newOption);
        //Set italia di default
        onSelectionChange('IT','Italy');
        $('#sel1 option[value="107"]').attr("selected",true);
      });
      $("#sel1").on("change", function () {
        const selectedOptionId = $(this).find(":selected").attr("id");
        const nomeNazione = $(this).find(":selected").text();
        onSelectionChange(selectedOptionId, nomeNazione);
      });
    },
    error: function (error) {
      console.log("Errore nella richiesta al server:", error);
    },
  });
});

function onSelectionChange(idcountry, nomeNazione) {
  let flagElement = document.getElementById("flag");
  let label = document.getElementById("CountryName");
  label.textContent = nomeNazione;
  flagElement.src = "/tw23-squisito/view/resource/flags/" + idcountry + ".png";
}
function home() {
  window.location.href = "../view/home.html";
}
function profile() {
  window.location.href = "../view/profile.html?id="+sessionStorage.getItem("userEmail");
}
function explore() {
  window.location.href = "../view/explore.html";
}
function search() {
  window.location.href = "../view/search.html";
}
