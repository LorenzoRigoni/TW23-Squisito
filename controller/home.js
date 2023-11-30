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
function postClick(event) {
  window.location.href = "../view/post.html?id=" + event.currentTarget.id;
}
function addpost() {
  window.location.href = "../view/addpost.html";
}
function explore() {
  window.location.href = "../view/explore.html";
}
function profile() {
  window.location.href = "../view/profile.html?id="+sessionStorage.getItem("email");
}
function likeClick(event) {
  event.stopPropagation();
  var $heartSpan = $(event.currentTarget);
  $.ajax({
    url: "/tw23-squisito/model/post_models/like_models.php",
    type: "POST",
    data: {
      IDPost: event.currentTarget.id,
    },
    success: function (result) {
       if ($heartSpan.hasClass("clicked")) {
        $heartSpan.removeClass("clicked");
      } else {
        $heartSpan.addClass("clicked");
      }
    },
  });
}
