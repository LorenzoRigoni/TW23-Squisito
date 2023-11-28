$("#choose-image").change(function () {
  var file = this.files[0];
  var reader = new FileReader();
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
					Titolo: title
					
                    },
                    success: function (response) {
                        
                        alert("Post Creato");
                    },
                    error: function (error) {
                       
                        console.error(error);
                    }
                });

});

function loadOptions() {
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
        var newOption = $("<option>", {
          value: option.IDNazione,
          text: option.Nome,
          id: option.Shortname
		  
        });

        // Aggiungi l'opzione al menu a discesa
        $("#sel1").append(newOption);
      });

      $("#sel1").on("change", function () {
        var selectedOptionId = $(this).find(":selected").attr("id");
		var nomeNazione = $(this).find(":selected").text();
        onSelectionChange(selectedOptionId,nomeNazione);
      });

      // Opzionale: Aggiorna il menu a discesa (richiede il plugin Bootstrap)
      //$("#sel1").selectpicker("refresh");
    },
    error: function (error) {
      console.log("Errore nella richiesta AJAX:", error);
    },
  });
}

function onSelectionChange(idcountry,nomeNazione) {
  let flagElement = document.getElementById("flag");
  let label = document.getElementById("CountryName");
  label.textContent=nomeNazione;
  flagElement.src = "/tw23-squisito/view/style/flags/" + idcountry + ".png";
}

// Chiama la funzione loadOptions quando la pagina è pronta
$(document).ready(function () {
  loadOptions();
});

