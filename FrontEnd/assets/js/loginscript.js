let form = document.querySelector("form");

// Sélection de l'élément <h1> pour la redirection
const h1Element = document.querySelector('h1');

h1Element.classList.add('cursor-pointer');

// Ajout d'un gestionnaire d'événements au clic sur l'élément <h1>
h1Element.addEventListener('click', function() {
    // Redirection vers index.html
    window.location.href = "index.html";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Supprimer les messages d'erreur précédents
    document.getElementById("loginErrorMessage").textContent = "Identifiants ou mot de passe invalides";


    // Récupérer les valeurs actuelles des champs email et mot de passe
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Envoi de la requête POST pour authentification & génération du token
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        redirect: 'follow'
    };

    fetch("http://localhost:5678/api/users/login", requestOptions)
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Identifiants incorrects. Veuillez vérifier votre e-mail et votre mot de passe.');
            } else if (response.status === 404) {
                throw new Error('Utilisateur non trouvé. Veuillez vous inscrire avant de vous connecter.');
            } else {
                throw new Error('Une erreur s\'est produite lors de la connexion au serveur.');
            }
        }
        return response.json();
    })
    .then(data => {
        // Vérifier si la réponse contient un token valide
        if (data && data.token) {
            // Stocker le token dans le stockage local
            localStorage.setItem('token', data.token);
            console.log("Connexion réussie !");
            // Redirection vers index.html
            window.location.href = 'index.html';
        }
    })
    .catch(error => {
        console.error("Erreur de connexion :", error);
        // Afficher un message d'erreur générique
        document.getElementById("loginErrorMessage").textContent = error.message;
    });

});
