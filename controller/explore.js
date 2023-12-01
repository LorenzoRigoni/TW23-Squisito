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
  $.ajax({
    url: "/tw23-squisito/model/post_models/get_random_posts.php",
    type: "GET",

    success: function (result) {
      const datiJSON = JSON.parse(result);
      let postSpace = document.getElementById("postSpace");
      for (var i = 0; i < datiJSON.length; i++) {
        var cardCol = document.createElement("div");
        cardCol.className = "col-sm-6 col-md-4 col-lg-3 item py-2";
        cardCol.setAttribute("id", datiJSON[i].IDPost);

        var cardImg = document.createElement("img");
        cardImg.className = "img-fluid rounded";
        cardImg.setAttribute(
          "src",
          "data:image/jpeg;base64," + datiJSON[i].Foto
        );
        cardCol.appendChild(cardImg);
        cardCol.addEventListener("click", postClick, false);
        postSpace.appendChild(cardCol);
      }
    },
  });
});
function home() {
  window.location.href = "../view/home.html";
}
function profile() {
  window.location.href =
    "../view/profile.html?id=" + sessionStorage.getItem("email");
}
function addpost() {
  window.location.href = "../view/addpost.html";
}
function search() {
  window.location.href = "../view/search.html";
}
function postClick(event) {
  window.location.href = "../view/post.html?id=" + event.currentTarget.id;
}
