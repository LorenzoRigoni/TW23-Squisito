window.addEventListener('load', function() {
    $.ajax({
        url:"/tw23-squisito/model/user_models/get_user_info.php",    //the page containing php script
        type: "post",    //request type,
        dataType: 'json',
        data: {registration: "success", name: "xyz", email: "abc@gmail.com"},
        success:function(result){
            console.log(result);
        }
    });
});



