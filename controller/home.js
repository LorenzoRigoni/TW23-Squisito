window.addEventListener('load', function() {
    const user = sessionStorage.getItem('userEmail');
    console.log(user);
    $.ajax({
        url:"/tw23-squisito/model/user_models/get_user_info.php?email="+user,    //the page containing php script
        type: "GET",    //request type,
        data: {
            "email" : user
        },
        success:function(result){
            console.log("RESULT",result);
        }
    });
});