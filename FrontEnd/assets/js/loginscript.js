let form = document.querySelector("form")
let baliseEmail = document.getElementById("email")

function verifierChamp(balise) {
  if (balise.value === "") {
    balise.classList.add("error")
  } else {
    balise.classList.remove("error")
  }
}

function verifierEmail(balise) {
  let emailRegExp = new RegExp("[a-z._-]+@[a-z._-]+\\.[a-z._-]+")
  if (emailRegExp.test(balise.value)) {
    balise.classList.remove("error")
  } else {
    balise.classList.add("error")
  }
}

form.addEventListener("submit", (event) =>{
  event.preventDefault()
  verifierChamp(baliseEmail)
})

baliseEmail.addEventListener("change", () =>{
  verifierChamp(baliseEmail)
})
