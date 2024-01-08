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
  loadNotification();
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
      }
    },
  });
});
let close_notify = [];
function loadNotification() {
  let numberNot = 0;
  $.ajax({
    url: "/tw23-squisito/model/post_models/get_notifications.php",
    type: "POST",
    data: { functionname: "get" },
    success: function (result) {
      let notity = JSON.parse(result);
      let div = "";
      let action;
      let close = JSON.parse(sessionStorage.getItem("close_notify")) || [];
      notity.forEach((element) => {
        if (!element.Visualizzato) numberNot++;
        if (!close.map(Number).includes(element.IDNotifica)) {
          switch (element.TipoNotifica) {
            case "Like":
              action =
                element.EmailMittente + " ha messo mi piace alla tua foto.";
              break;
            case "Follow":
              action = element.EmailMittente + " ha iniziato a seguirti.";
              break;
            case "Commento":
              action = element.EmailMittente + " ha commentato un post.";
              break;
          }
          div +=
            '<div class="notibox">' +
            action +
            "<div id=" +
            element.IDNotifica +
            ' class="cancel">✕</div></div>';
        }
      });
      $("#number-notification").text(numberNot);
      $("#notifiche").html(div);
    },
  });
}
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
    "../view/profile.html?id=" + sessionStorage.getItem("userEmail");
}
function search() {
  window.location.href = "../view/search.html";
}

$("#notification").click(function () {
  $.ajax({
    url: "/tw23-squisito/model/post_models/get_notifications.php",
    type: "POST",
    data: { functionname: "update" },
  });
  $(".sidebar").toggleClass("active");
});
$("#close-notification").click(function () {
  $(".sidebar").removeClass("active");
});
$(document).on("click", ".cancel", function () {
  console.log("toggling visibility");
  let close = [];
  close = JSON.parse(sessionStorage.getItem("close_notify")) || [];
  close.push($(this).attr("id"));
  sessionStorage.setItem("close_notify", JSON.stringify(close));
  $(this).parent().toggleClass("gone");
  $("#number-notification").text($("#number-notification").text() - 1);
});

function likeClick(event) {
  event.stopPropagation();
  let $heartSpan = $(event.currentTarget);
  const idPost = event.currentTarget.id;
  $.ajax({
    url: "/tw23-squisito/model/post_models/like_models.php",
    type: "POST",
    data: {
      IDPost: idPost,
    },
    success: function (result) {
      let likes = JSON.parse(result);
      let id = "#" + idPost + "-Nlikes";
      if ($heartSpan.hasClass("clicked")) {
        $heartSpan.removeClass("clicked");
      } else {
        $heartSpan.addClass("clicked");
      }
      $(id).text(likes.NumLike + " persone");
    },
  });
}
let user = sessionStorage.getItem("userEmail");
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

let pusher = new Pusher("a7d0c7ac2e467a01cd1b", {
  cluster: "eu",
});

let channel = pusher.subscribe("my-channel");
channel.bind("my-event", function (data) {
  if (user == data) {
    loadNotification();
  }
});
