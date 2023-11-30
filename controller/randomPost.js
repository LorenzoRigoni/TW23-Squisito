window.addEventListener("load", function () {
  //load user info
  let user = sessionStorage.getItem("email");
  $.ajax({
    url: "/tw23-squisito/model/post_models/get_random_posts.php",
    type: "GET",
   
    success: function (result) {
		alert(result);
      const datiJSON = JSON.parse(result);
      let postSpace = document.getElementById("postSpace");
		for (var i = 0; i < datiJSON.length; i++) {
       
        var cardCol = document.createElement("div");
        cardCol.className = "col-sm-6 col-md-4 col-lg-3 item py-2";
		cardCol.setAttribute("id", datiJSON[i].IDPost);

        var cardImg = document.createElement("img");
        cardImg.className = "img-fluid rounded";
        cardImg.setAttribute("src","data:image/jpeg;base64,"+ datiJSON[i].Foto);
		cardCol.appendChild(cardImg);
		cardCol.addEventListener("click",postClick,false);
		postSpace.appendChild(cardCol);

    }
  }
});
});
function postClick(event) {
  window.location.href = "../view/post.html?id=" + event.currentTarget.id;
}