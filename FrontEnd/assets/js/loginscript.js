let form = document.querySelector("form");
let baliseEmail = document.getElementById("email");
let balisePassword = document.getElementById("password");

/////// EMAIL

function verifierEmail(balise) {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z]{2,}");
  if (balise.value !== "" && !emailRegExp.test(balise.value)) {
    balise.classList.add("error");
  } else {
    balise.classList.remove("error");
  }
}

baliseEmail.addEventListener("change", () => {
  if (baliseEmail.value !== "") {
    verifierEmail(baliseEmail);
  }
});

/////// PASSWORD

function verifierPassword(balise) {
  let passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (balise.value !== "" && !passwordRegExp.test(balise.value)) {
    balise.classList.add("error");
  } else {
    balise.classList.remove("error");
  }
}

balisePassword.addEventListener("change", () => {
  if (balisePassword.value !== "") {
    verifierPassword(balisePassword);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  verifierEmail(baliseEmail);
  verifierPassword(balisePassword);

  console.log("Email :", baliseEmail.value);
  console.log("Mot de passe :", balisePassword.value);
  
  if (baliseEmail.classList.contains("error") || balisePassword.classList.contains("error")) {
    return; 
  }

  // Redirection vers index.html
  

  if (baliseEmail.value === 'utilisateur@example.com' && balisePassword.value === 'Motdepasse123') {
    console.log("Connexion réussie !");
    window.location.href = 'index.html';
  } else {
    console.log("Adresse e-mail ou mot de passe incorrect.");
    alert('Adresse e-mail ou mot de passe incorrect.');
  }
});

  // Envoi de la requête POST pour authentification

  ////////token au mauvaise endroit? manque l'url de l'api des login?

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  let credentials = {
    email: baliseEmail.value,
    password: balisePassword.value
  };

  fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(response => response.json())
  .then(data => {
// Stockage du token dans le stockage local
    localStorage.setItem('token', data.token);
    console.log("Connexion réussie !");
    // Redirection vers index.html
    window.location.href = 'index.html';
  })
  .catch(error => {
    console.error("Erreur de connexion :", error);
    alert('Adresse e-mail ou mot de passe incorrect.');
  });

