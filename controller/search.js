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
  loadAllUser();
});
function loadAllUser(){
  $.ajax({
    url: "/tw23-squisito/model/user_models/get_random_users.php",
    type: "GET",
    success: function (result) {
      if (result) {
        loadUser(result);
      }
    },
  });
}
$("#search_bar").on(
  "input",
  debounce(function () {
    const user = $("#search_bar").val();
    $("#userSpace").empty();
    if (user) {
      $.ajax({
        url: "/tw23-squisito/model/user_models/search_user.php",
        type: "GET",
        data: {
          name: user,
        },
        success: function (result) {
          if (result) {
            loadUser(result);
          }
        },
      });
    } else {
      loadAllUser();
    }
  }, 300)
);
function debounce(callback, delay) {
  let timeout;
  return function () {
    let args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(
      function () {
        callback.apply(this, args);
      }.bind(this),
      delay
    );
  };
}
function loadUser(result) {
  const datiJSON = JSON.parse(result);
  $("#userSpace").empty();
  let postSpace = document.getElementById("userSpace");
  for (let i = 0; i < datiJSON.length; i++) {
    let cardlist = document.createElement("li");
    cardlist.className =
      "list-group-item d-flex justify-content-between align-content-center";
    cardlist.setAttribute("id", datiJSON[i].Email);
    let cardCol = document.createElement("div");
    cardCol.className = "d-flex flex-row";
    let cardImg = document.createElement("img");
    cardImg.className = "avatar avatar-64 rounded-circle";
    cardImg.setAttribute(
      "src",
      "data:image/jpeg;base64," + datiJSON[i].FotoProfilo
    );
    let user = document.createElement("div");
    user.className = "ms-2 d-flex align-items-center";
    user.textContent = datiJSON[i].Username;
    cardlist.addEventListener(
      "click",
      function (event) {
        openProfile(event);
      },
      false
    );
    cardCol.appendChild(cardImg);
    cardCol.appendChild(user);
    cardlist.appendChild(cardCol);
    postSpace.appendChild(cardlist);
  }
}
function openProfile(event) {
  window.location.href = "../view/profile.html?id=" + event.currentTarget.id;
}
function profile() {
  window.location.href =
    "../view/profile.html?id=" + sessionStorage.getItem("userEmail");
}
