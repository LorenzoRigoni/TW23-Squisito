document.addEventListener("load", function () {
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
        $("#user-photo-small").attr(
          "src",
          "data:image/png;base64," + responseObj[0].FotoProfilo
        );
      }
    },
  });
  //load search user info
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("id")) {
    let IDUser = searchParams.get("id");
    $.ajax({
      url: "/tw23-squisito/model/user_models/get_user_info.php",
      type: "GET",
      data: {
        email: IDUser,
      },
      success: function (result) {
        const responseObj = JSON.parse(result);
        if (responseObj[0].Email == sessionStorage.getItem("userEmail")) {
          $("#edit").removeAttr("hidden");
          $("#logout").removeAttr("hidden");
        } else {
          $("#follow").removeAttr("hidden");
        }
        if (responseObj[0].FotoProfilo != "") {
          $("#user-photo-user").attr(
            "src",
            "data:image/png;base64," + responseObj[0].FotoProfilo
          );
        }
        $("#nomeUtente").text(responseObj[0].Username);
        $("#nome").text(responseObj[0].Nome);
        $("#bio").text(responseObj[0].Bio);
      },
    });
    $.ajax({
      url: "/tw23-squisito/model/user_models/get_numbers_of_user.php",
      type: "GET",
      data: {
        email: IDUser,
      },
      success: function (result) {
        const responseObj = JSON.parse(result);
        $("#post-number").text(" " + responseObj[0].NumPosts);
        $("#followed-number").text(" " + responseObj[1].NumFollowers);
        $("#seguiti-number").text(" " + responseObj[2].NumSeguiti);
      },
    });

    $.ajax({
      url: "/tw23-squisito/model/post_models/get_posts_of_user.php",
      type: "GET",
      data: {
        email: IDUser,
      },
      success: function (result) {
        const datiJSON = JSON.parse(result);
        let postSpace = document.getElementById("postSpace");
        for (let i = 0; i < datiJSON.length; i++) {
          let cardCol = document.createElement("div");
          cardCol.className = "col-sm-6 col-md-4 col-lg-3 item py-2";
          cardCol.setAttribute("id", datiJSON[i].IDPost);

          let cardImg = document.createElement("img");
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
    $.ajax({
      url: "/tw23-squisito/model/user_models/is_followed.php",
      type: "GET",
      data: {
        email: IDUser,
      },
      success: function (result) {
        if (result == "") {
          $("#follow").removeClass("clicked");
        } else {
          $("#follow").addClass("clicked");
        }
      },
    });
  }
});
$("#logout").on("click", function () {
  sessionStorage.clear();
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
  window.location.href = "../view/index.html";
});
//follow
$("#follow").on("click", function () {
  let searchParams = new URLSearchParams(window.location.search);
  $.ajax({
    url: "/tw23-squisito/model/user_models/follow_models.php",
    type: "POST",
    data: {
      Email: searchParams.get("id"),
    },
    success: function (result) {
      if ($("#follow").hasClass("clicked")) {
        $("#follow").removeClass("clicked");
      } else {
        $("#follow").addClass("clicked");
      }
    },
  });
});
function profile() {
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.has("id");
}
function postClick(event) {
  window.location.href = "../view/post.html?id=" + event.currentTarget.id;
}
function edit() {
  let searchParams = new URLSearchParams(window.location.search);
  window.location.href = "../view/editProfile.html?id=" + searchParams.has("id");
}
function profile() {
  window.location.href =
    "../view/profile.html?id=" + sessionStorage.getItem("userEmail");
}
