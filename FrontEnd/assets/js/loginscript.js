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

  console.log("Email :", baliseEmail.value);
  console.log("Mot de passe :", balisePassword.value);

  if (baliseEmail.classList.contains("error") || balisePassword.classList.contains("error")) {
    return;
  }

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
      alert('Adresse e-mail ou mot de passe incorrect.');
    }
  })
  .catch(error => {
    console.error("Erreur de connexion :", error);
    alert('Une erreur s\'est produite lors de la connexion au serveur. Veuillez réessayer plus tard.');
  });


});

});