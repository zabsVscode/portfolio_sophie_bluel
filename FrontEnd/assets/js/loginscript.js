let form = document.querySelector("form");
let baliseEmail = document.getElementById("email");
let balisePassword = document.getElementById("password");

/////// EMAIL

// Sélection de l'élément <h1>
const h1Element = document.querySelector('h1');

h1Element.classList.add('cursor-pointer');

// Ajout d'un gestionnaire d'événements au clic sur l'élément <h1>
h1Element.addEventListener('click', function() {
    // Redirection vers index.html
    window.location.href = "index.html";
});

//Bouton submit pour connexion, check la balise email/password

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Supprimer les messages d'erreur précédents
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    // Réinitialiser les classes d'erreur
    baliseEmail.classList.remove("error");
    balisePassword.classList.remove("error");

    console.log("Email :", baliseEmail.value);
    console.log("Mot de passe :", balisePassword.value);

    let emailValid = true;
    let passwordValid = true;

    // Vérifier l'e-mail
    if (baliseEmail.value !== "sophie.bluel@test.tld") {
        document.getElementById("emailError").textContent = "Votre adresse e-mail est incorrecte";
        document.getElementById("emailError").style.color = "red"; // Couleur du message d'erreur
        baliseEmail.classList.add("error");
        emailValid = false;
    }

    // Vérifier le mot de passe
    if (balisePassword.value !== "S0phie") {
        document.getElementById("passwordError").textContent = "Votre mot de passe est incorrect";
        document.getElementById("passwordError").style.color = "red"; // Couleur du message d'erreur
        balisePassword.classList.add("error");
        passwordValid = false;
    }

    // Si les deux champs sont incorrects, afficher les messages d'erreur en dessous des champs
    if (!emailValid && !passwordValid) {
        document.getElementById("emailError").textContent = "Votre adresse e-mail est incorrecte";
        document.getElementById("passwordError").textContent = "Votre mot de passe est incorrect";
    }

    // Si tout est correct, envoyer la requête POST pour authentification
    // ...

    // Envoi de la requête POST pour authentification & générer le token
    let submitButton = document.getElementById("submit-button");

    submitButton.addEventListener("click", () => {
        // Récupérer les valeurs actuelles des champs email et mot de passe
        let email = baliseEmail.value;
        let password = balisePassword.value;

        // Créer un objet credentials avec ces valeurs
        let credentials = {
            email: email,
            password: password
        };

        // Définir les en-têtes de la requête
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Définir les options de la requête
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(credentials),
            redirect: 'follow'
        };

        // Envoyer la requête POST au serveur

        fetch("http://localhost:5678/api/users/login", requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Une erreur s\'est produite lors de la connexion au serveur.');
                }
                return response.json();
            })
            .then(data => {
                // Vérifier si la réponse contient un token valide
                if (data && data.token) {
                    // Stocker le token dans le stockage local
                    localStorage.setItem('token', data.token);
                    console.log("Token reçu :", data.token);
                    console.log("Connexion réussie !");
                    // Redirection vers index.html
                    window.location.href = 'index.html';
                } else {
                    console.error("Token non valide dans la réponse du serveur");
                    document.getElementById("emailError").textContent = "Votre adresse e-mail ou mot de passe est incorrecte";
                    document.getElementById("emailError").style.color = "red"; // Couleur du message d'erreur
                }
            })
            .catch(error => {
                console.error("Erreur de connexion :", error);
                document.getElementById("emailError").textContent = "Votre adresse e-mail est incorrect";
                document.getElementById("emailError").style.color = "red"; // Couleur du message d'erreur
            });
    });
});
