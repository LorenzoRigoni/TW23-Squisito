(function () {
	'use strict'

	let forms = document.querySelectorAll('.login-validation')

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
	const checkbox = document.getElementById("remember");
	const checkboxValue = checkbox.checked;
	$.ajax({
        url:"/tw23-squisito/model/login_models/login.php",
        type: "POST",
        data: {
            "email" : $("#email").val(),
			"password": $("#password").val(),
		"ricordami": checkboxValue
        },
        success:function(result){
			const responseObj = JSON.parse(result);
			if (responseObj.success) {
				sessionStorage.setItem("email",$("#email").val());
				sessionStorage.setItem("close_notify", JSON.stringify([]));
				window.location.href = '../view/home.html';
			}
        }
    });
  });
