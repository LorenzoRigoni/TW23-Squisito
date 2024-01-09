(function () {
  "use strict";
  let forms = document.querySelectorAll(".login-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
document.addEventListener("load", function () {
  if (Cookies.get("userEmail")) {
    sessionStorage.setItem("userEmail", Cookies.get("userEmail"));
    sessionStorage.setItem("login_string", Cookies.get("login_string"));
    window.location.href = "../view/home.html";
  }
});
$("#login").on("click", function () {
  const checkboxValue = $("#remember").is(":checked");
  $.ajax({
    url: "/tw23-squisito/model/login_models/login.php",
    type: "POST",
    data: {
      email: $("#email").val(),
      password: $("#password").val(),
      ricordami: checkboxValue,
    },
    success: function (result) {
      const responseObj = JSON.parse(result);
      if (responseObj.success) {
        sessionStorage.setItem("userEmail", $("#email").val());
        sessionStorage.setItem("login_string", responseObj.loginString);
        sessionStorage.setItem("close_notify", JSON.stringify([]));
        window.location.href = "../view/home.html";
      }else {
		  alert("Email o Password Errata, riprova");
	  }
    },
  });
});

$("#show_hide_password a").on('click', function(event) {
  event.preventDefault();
  if($('#show_hide_password input').attr("type") == "text"){
      $('#show_hide_password input').attr('type', 'password');
      $('#show_hide_password i').addClass( "fa-eye-slash" );
      $('#show_hide_password i').removeClass( "fa-eye" );
  }else if($('#show_hide_password input').attr("type") == "password"){
      $('#show_hide_password input').attr('type', 'text');
      $('#show_hide_password i').removeClass( "fa-eye-slash" );
      $('#show_hide_password i').addClass( "fa-eye" );
  }
});
