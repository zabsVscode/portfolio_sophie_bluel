let form = document.querySelector("form");
let baliseEmail = document.getElementById("email");
let balisePassword = document.getElementById("password");

//EMAIL

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
  
  // Empêcher la soumission du formulaire si les champs ne sont pas valides
  if (baliseEmail.classList.contains("error") || balisePassword.classList.contains("error")) {
    event.preventDefault();
  }
});



form.addEventListener("submit", (event) => {
  event.preventDefault();
  verifierEmail(baliseEmail);
});

