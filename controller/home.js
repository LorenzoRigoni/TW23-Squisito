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
function likeClick(event) {
  event.stopPropagation();
  $.ajax({
    url: "/tw23-squisito/model/post_models/like_models.php",
    type: "GET",
    data: {
      IDPost: event.currentTarget.id,
    },
    success: function (result) {
      if ($(".fa-heart").hasClass("clicked")) {
        $(".fa-heart").removeClass("clicked");
      } else {
        $(".fa-heart").addClass("clicked");
        //sendNotification(event.currentTarget.id,"Like");
      }
    },
  });
}
function sendNotification(postId,tipo) {
    //event.stopPropagation();
   $.ajax({
        url:"/tw23-squisito/model/post_models/add_notification.php",  
        type: "POST",   
        data: {
            "IDPost" : postId,
            "TipoNotifica" : tipo
        },
        success:function(result){
        }
    });
}
