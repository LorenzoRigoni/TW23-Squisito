window.addEventListener("load", function () {
    let user = sessionStorage.getItem("email");
    $.ajax({
      url: "/tw23-squisito/model/user_models/get_user_info.php",
      type: "GET",
      data: {
        email: user,
      },
      success: function (result) {
        const responseObj = JSON.parse(result);
        $("#user-photo-small").attr(
          "src",
          "data:image/png;base64," + responseObj[0].FotoProfilo
        );
      },
    });
  });
  function home() {
    window.location.href = "../view/home.html";
  }
  function profile() {
    window.location.href = "../view/profile.html?id="+sessionStorage.getItem("email");
  } 
  function addpost() {
    window.location.href = "../view/addpost.html";
  }