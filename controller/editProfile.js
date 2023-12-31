window.addEventListener("load", function () {
  if (Cookies.get("userEmail")) {
    sessionStorage.setItem("userEmail", Cookies.get("userEmail"));
    sessionStorage.setItem("login_string", Cookies.get("login_string"));
  } else if (
    !Cookies.get("userEmail") &&
    !this.sessionStorage.getItem("userEmail")
  ) {
    window.location.href = "../view/index.html";
  }
  let user = sessionStorage.getItem("userEmail");
  $.ajax({
    url: "/tw23-squisito/model/user_models/get_user_info.php",
    type: "GET",
    data: {
      email: user,
    },
    success: function (result) {
      const responseObj = JSON.parse(result);
      if (responseObj[0].FotoProfilo != "") {
        $("#user-photo-small").attr(
          "src",
          "data:image/png;base64," + responseObj[0].FotoProfilo
        );
        $("#user-photo-user").attr(
          "src",
          "data:image/png;base64," + responseObj[0].FotoProfilo
        );
        $("#username").val(responseObj[0].Username);
        $("#nome").val(responseObj[0].Nome);
        $("#bio").text(responseObj[0].Bio);
      }
    },
  });
});
$("#fotoProfilo").on("change", function (event) {
    $("#user-photo-user").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
});

function home() {
  window.location.href = "../view/home.html";
}
function openProfile(event) {  
  window.location.href =
  "../view/profile.html?id=" + event.currentTarget.id;
};
function profile() {
  window.location.href =
    "../view/profile.html?id=" + sessionStorage.getItem("userEmail");
}
function addpost() {
  window.location.href = "../view/addpost.html";
}
function explore() {
  window.location.href = "../view/explore.html";
}
