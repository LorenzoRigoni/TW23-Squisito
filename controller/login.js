(function () {
	'use strict'

	var forms = document.querySelectorAll('.login-validation')

	Array.prototype.slice.call(forms)
		.forEach(function (form) {
			form.addEventListener('submit', function (event) {
				if (!form.checkValidity()) {
					event.preventDefault()
					event.stopPropagation()
				}

				form.classList.add('was-validated')
			}, false)
		})
})()
$('#login').on("click",function() {
	$.ajax({
        url:"/tw23-squisito/model/login_models/login.php",
        type: "POST",
        data: {
            "email" : $("#email").val(),
			"password": $("#password").val()
        },
        success:function(result){
			const responseObj = JSON.parse(result);
			if (responseObj.success) {
				window.location.href = '../view/home.html';
			}
        }
    });
  });