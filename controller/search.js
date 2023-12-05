window.addEventListener("load", function () {
  if (Cookies.get("userEmail")) {
    sessionStorage.setItem("userEmail", Cookies.get("userEmail"));
    sessionStorage.setItem("login_string", Cookies.get("login_string"));
  } else if(!Cookies.get("userEmail") && !this.sessionStorage.getItem("userEmail")){
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
        if(responseObj[0].FotoProfilo != ""){
        $("#user-photo-small").attr(
          "src",
          "data:image/png;base64," + responseObj[0].FotoProfilo
        );
        }
      },
    });
  });
  function home() {
    window.location.href = "../view/home.html";
  }
  function profile() {
    window.location.href = "../view/profile.html?id="+sessionStorage.getItem("userEmail");
  } 
  function addpost() {
    window.location.href = "../view/addpost.html";
  }
  function explore() {
    window.location.href = "../view/explore.html";
  }
  $("#search_bar").change(function () {
    const user = $("#search_bar").val();
    $("#postSpace").empty();
    if (user) {
      $.ajax({
        url: "/tw23-squisito/model/user_models/search_user.php",
        type: "GET",
        data: {
          name: user,
        },
        success: function (result) {
          if (result) {
            const datiJSON = JSON.parse(result);
            let postSpace = document.getElementById("postSpace");
            for (let i = 0; i < datiJSON.length; i++) {
              let cardCol = document.createElement("div");
              cardCol.className = "col-sm-6 col-md-4 col-lg-3 item py-2";
              cardCol.setAttribute("id", datiJSON[i].Username);
              let cardImg = document.createElement("img");
              cardImg.className = "img-fluid rounded";
              cardImg.setAttribute(
                "src",
                "data:image/jpeg;base64," + datiJSON[i].FotoProfilo
              );
              cardCol.appendChild(cardImg);
              postSpace.appendChild(cardCol);
            }
          }
        },
      });
    }
  });
