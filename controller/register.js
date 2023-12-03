 function checkPasswords() {
            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const nome = document.getElementById('nome').value;
            const fotoProfilo = document.getElementById('fotoProfilo').files[0];
            const bio = document.getElementById('bio').value;
            const password1 = document.getElementById('password').value;
            const password2 = document.getElementById('password2').value;

            if (password1 === password2) {
                // Passwords match, send data to PHP
                sendDataToPHP(email, username, nome, fotoProfilo, bio, password1);
            } else {
                alert("Le password non corrispondono. Riprova.");
            }
        }

        function sendDataToPHP(email, username, nome, fotoProfilo, bio, password) {
            let formData = new FormData();
            formData.append('email', email);
            formData.append('username', username);
            formData.append('nome', nome);
            formData.append('fotoProfilo', fotoProfilo);
            formData.append('bio', bio);
            formData.append('password', password);

            $.ajax({
                type: 'POST',
                url: '/tw23-squisito/model/register_model/register.php', 
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    // Gestisci la risposta del server
                    console.log(response);
                 alert("Ti sei registrato con Successo");
                },
                error: function(error) {
                    // Gestisci l'errore
                    console.log(error);
                }
            });
        }
