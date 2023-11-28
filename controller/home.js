window.addEventListener('load', function() {
    let user = sessionStorage.getItem('email');
    $.ajax({
        url:"/tw23-squisito/model/user_models/get_user_info.php",
        type: "GET",
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
        url:"/tw23-squisito/model/user_models/get_numbers_of_user.php",
        type: "GET",
        data: {
            "email" : user
        },
        success:function(result){
            const responseObj = JSON.parse(result);
            $('#number_post').text(responseObj[0].NumPosts)
            $('#number_follower').text(responseObj[1].NumFollowers)
            $('#number_seguiti').text(responseObj[2].NumSeguiti)

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
