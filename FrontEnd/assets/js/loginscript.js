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
  verifierEmail(baliseEmail);
  verifierPassword(balisePassword);
  
  
  if (baliseEmail.classList.contains("error") || balisePassword.classList.contains("error")) {
    event.preventDefault();
  }
});


// FORMULAIRE

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  verifierEmail(baliseEmail);
  verifierPassword(balisePassword);
  
  if (baliseEmail.classList.contains("error") || balisePassword.classList.contains("error")) {
    return; 
  }
  
  // Si les champs sont valides, vous pouvez ajouter ici le code pour vérifier la connexion et rediriger l'utilisateur vers la page d'accueil si nécessaire.
  // Ici vous pouvez remplacer la vérification de connexion par votre propre logique de vérification, comme vérifier les informations dans une base de données
  
  // Exemple de vérification de connexion (remplacez-le par votre propre logique)
  if (baliseEmail.value === 'utilisateur@example.com' && balisePassword.value === 'motdepasse') {
    // Redirection vers la page d'accueil
    window.location.href = 'index.html';
  } else {
    alert('Adresse e-mail ou mot de passe incorrect.');
  }
});

