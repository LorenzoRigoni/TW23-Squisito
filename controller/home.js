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
  window.location.href =
    "../view/profile.html?id=" + sessionStorage.getItem("email");
}
function search() {
  window.location.href = "../view/search.html";
}

$("#notification").click(function () {
  $(".sidebar").toggleClass("active");
});
$("#close-notification").click(function () {
  $(".sidebar").removeClass("active");
});
$(".cancel").click(function () {
  console.log("toggling visibility");
  $(this).parent().toggleClass("gone");
});
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
let user = sessionStorage.getItem("email");
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher("a7d0c7ac2e467a01cd1b", {
  cluster: "eu",
});

var channel = pusher.subscribe("my-channel");
channel.bind("my-event", function (data) {
  if (user == data) {
    var div='<div class="notibox">'+JSON.stringify(data)+'<div class="cancel">✕</div></div>';
    $('#notifiche').html(div);
  }
});
