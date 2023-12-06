window.addEventListener("load", function () {
  //check cookie
  if (Cookies.get("userEmail")) {
    sessionStorage.setItem("userEmail", Cookies.get("userEmail"));
    sessionStorage.setItem("login_string", Cookies.get("login_string"));
  } else if (
    !Cookies.get("userEmail") &&
    !this.sessionStorage.getItem("userEmail")
  ) {
    window.location.href = "../view/index.html";
  }
  //load user info
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
        $("#photo_comment").attr(
          "src",
          "data:image/png;base64," + responseObj[0].FotoProfilo
        );
      }
    },
  });
});
//shares post
$(".pubblica").on("click", function () {
  let searchParams = new URLSearchParams(window.location.search);
  $.ajax({
    url: "/tw23-squisito/model/post_models/send_comment.php",
    type: "POST",
    data: {
      Contenuto: document.getElementById("textArea").value,
      IDPost: searchParams.get("id"),
    },
    success: function (result) {},
  });
});
//delete post
$("#delete_post").on("click", function () {
  let searchParams = new URLSearchParams(window.location.search);
  $.ajax({
    url: "/tw23-squisito/model/post_models/delete_post.php",
    type: "POST",
    data: {
      IDPost: searchParams.get("id"),
    },
    success: function () {
      window.location.href =
        "../view/profile.html?id=" + sessionStorage.getItem("userEmail");
    },
  });
});
//open profile
function openProfile(event) {  
  window.location.href =
  "../view/profile.html?id=" + event.currentTarget.name;
};
function likeClick(event) {
  event.stopPropagation();
  let $heartSpan = $(event.currentTarget);
  $.ajax({
    url: "/tw23-squisito/model/post_models/like_models.php",
    type: "POST",
    data: {
      IDPost: event.currentTarget.name,
    },
    success: function () {
      if ($heartSpan.hasClass("clicked")) {
        $heartSpan.removeClass("clicked");
      } else {
        $heartSpan.addClass("clicked");
      }
    },
  });
}
function sendFollow(event) {
  $.ajax({
    url: "/tw23-squisito/model/user_models/follow_models.php",
    type: "POST",
    data: {
      IDPost: event.currentTarget.getAttribute("data_id"),
    },
    success: function (result) {
      const alreadyFollowedIndex = result.indexOf('"alreadyFollowed":');
      const alreadyFollowedSubstring = result.slice(
        alreadyFollowedIndex,
        result.indexOf("}", alreadyFollowedIndex)
      );
      let alreadyFollowedObject = JSON.parse(
        "{" + alreadyFollowedSubstring + "}"
      );
      if (!alreadyFollowedObject.alreadyFollowed) {
        alert("Hai Inizato a seguirlo");
        $("#followBtn").removeClass("follow");
        $("#followBtn").addClass("follow:focus");
      } else {
        alert("Hai smesso di seguirlo");
        $("#followBtn").removeClass("follow:focus");
        $("#followBtn").addClass("follow");
      }
    },
  });
}
