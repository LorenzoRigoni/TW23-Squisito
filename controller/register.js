 function checkPasswords() {
            var email = document.getElementById('email').value;
            var username = document.getElementById('username').value;
            var nome = document.getElementById('nome').value;
            var fotoProfilo = document.getElementById('fotoProfilo').files[0];
            var bio = document.getElementById('bio').value;
            var password1 = document.getElementById('password').value;
            var password2 = document.getElementById('password2').value;

            if (password1 === password2) {
                // Passwords match, send data to PHP
                sendDataToPHP(email, username, nome, fotoProfilo, bio, password1);
            } else {
                alert("Le password non corrispondono. Riprova.");
            }
        }

        function sendDataToPHP(email, username, nome, fotoProfilo, bio, password) {
            var formData = new FormData();
            formData.append('email', email);
            formData.append('username', username);
            formData.append('nome', nome);
            formData.append('fotoProfilo', fotoProfilo);
            formData.append('bio', bio);
            formData.append('password', password);

            $.ajax({
                type: 'POST',
                url: '/tw23-squisito/model/register_model/register.ph', 
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    // Gestisci la risposta del server
                    console.log(response);
                },
                error: function(error) {
                    // Gestisci l'errore
                    console.log(error);
                }
            });
        }