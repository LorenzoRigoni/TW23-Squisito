window.addEventListener('load', function() {
    let user = sessionStorage.getItem('email');
    $.ajax({
        url:"/tw23-squisito/model/user_models/get_user_info.php",    //the page containing php script
        type: "GET",    //request type,
        data: {
            "email" : user
        },
        success:function(result){
            const responseObj = JSON.parse(result);
            $("#user-photo-small").attr("src", "data:image/png;base64,"+responseObj[0].FotoProfilo);    
            $("#user-photo-large").attr("src", "data:image/png;base64,"+responseObj[0].FotoProfilo);   
            $('#username').text(responseObj[0].Username)
            $('#bio').text(responseObj[0].Bio)
        }
    });
	
	$.ajax({
    url: "/tw23-squisito/model/user_models/get_follower_list.php",
    type: "GET",
    success: function (response) {
        var data = JSON.parse(response);

        // Verifica se l'oggetto ha dati
        if (data && data.length > 0) {
			let followerElement = document.getElementById("Follower");
			followerElement.innerText = data.length; 
			
            // Ora puoi iterare attraverso i dati se necessario
        } else {
            console.log("Nessun dato restituito.");
        }
    },
    error: function (error) {
        console.error(error);
    }
});

$.ajax({
    url: "/tw23-squisito/model/user_models/get_following_user_list.php",
    type: "GET",
    success: function (response) {
        var data = JSON.parse(response);

        // Verifica se l'oggetto ha dati
        if (data && data.length > 0) {
			let seguitiElement = document.getElementById("Seguiti");
			seguitiElement.innerText = data.length; 
			
            // Ora puoi iterare attraverso i dati se necessario
        } else {
            console.log("Nessun dato restituito.");
        }
    },
    error: function (error) {
        console.error(error);
    }
});
});
function postClick(event) {
    window.location.href = '../view/post.html?id='+event.currentTarget.id;
}
function addpost() {
    window.location.href = '../view/addpost.html';
}
function likeClick(event) {
    event.stopPropagation();
   $.ajax({
        url:"/tw23-squisito/model/post_models/like_models.php",  
        type: "GET",   
        data: {
            "IDPost" : event.currentTarget.id
        },
        success:function(result){
            alert("Hai messo Mi Piace al Post");
        }
    });
}
