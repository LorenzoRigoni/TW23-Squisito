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
          value: option.Shortname,
          text: option.Nome,
          id: option.IDNazione,
        });

        // Aggiungi l'evento click all'elemento option
        newOption.on("click", function () {
          var customAttributeValue = $(this).attr("id");
          onSelectionChange(customAttributeValue);
        });

        // Aggiungi l'opzione al menu a discesa
        $("#sel1").append(newOption);
      });

      // Opzionale: Aggiorna il menu a discesa (richiede il plugin Bootstrap)
      //$("#sel1").selectpicker("refresh");
    },
    error: function (error) {
      console.log("Errore nella richiesta AJAX:", error);
    },
  });
}

function onSelectionChange(idcountry) {
  alert("DENTRO");
  let flagElement = document.getElementById("flag");
  flagElement.src ="tw23-squisito/view/style/flags/ + " + idcountry + ".png)";
}

// Chiama la funzione loadOptions quando la pagina è pronta
$(document).ready(function () {
  loadOptions();
});
