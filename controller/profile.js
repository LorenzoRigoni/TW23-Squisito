window.addEventListener("load", function () {
  //load user info
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
        $("#user-photo-user").attr(
          "src",
          "data:image/png;base64," + responseObj[0].FotoProfilo
        );
        $("#nomeUtente").text(responseObj[0].Username)
        $("#nome").text(responseObj[0].Nome)
        $("#bio").text(responseObj[0].Bio)

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
      $("#post-number").text(responseObj[0].NumPosts);
      $("#followed-number").text(responseObj[1].NumFollowers);
      $("#seguiti-number").text(responseObj[2].NumSeguiti);
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
        cardImg.setAttribute("src","data:image/jpeg;base64,"+ datiJSON[i].Foto);
		cardCol.appendChild(cardImg);
		cardCol.addEventListener("click",postClick,false);
		postSpace.appendChild(cardCol);

    }
    },
  });
  }
});
function home() {
    window.location.href = "../view/home.html";
}
function addpost() {
    window.location.href = "../view/addpost.html";
}
function explore() {
  window.location.href = "../view/explore.html";
}
function search() {
  window.location.href = "../view/search.html";
}
function postClick(event) {
  window.location.href = "../view/post.html?id=" + event.currentTarget.id;
}
