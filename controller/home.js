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
            $("#user-photo-small").attr("src", "data:image/png;base64,"+responseObj.FotoProfilo);    
            $("#user-photo-large").attr("src", "data:image/png;base64,"+responseObj.FotoProfilo);   
            $('#username').text(responseObj.Username)
            $('#bio').text(responseObj.Bio)
        }
    });
});