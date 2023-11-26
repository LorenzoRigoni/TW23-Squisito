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
            $('#username').text(responseObj.Username)
            $('#bio').text(responseObj.Bio)
        }
    });
});
function postClick(event) {
    window.location.href = '../view/post.html?id='+event.currentTarget.id;
}