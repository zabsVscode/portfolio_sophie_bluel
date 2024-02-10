/*Variables*/
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
let worksData = [];
let set1 = new Set([0, 1, 2, 3]);

/*Récupération des données du back-end*/
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://localhost:5678/api/works", requestOptions)
    .then(response => response.json())
    .then(result => {
        worksData = result;
        displayProjects(result, gallery); // Affichage des projets dans l'accueil/index
        displayProjects(result, document.getElementById('galleryPictures')); // Affichage des projets dans la modale
        displayCategorysButtons(result);
    })
    .catch(error => console.log('error', error));

/*Fonction pour afficher les projets*/
function displayProjects(arrayWorks, container) {
    container.innerHTML = ""; // Videz le contenu précédent
    arrayWorks.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.classList.add("img-picture")
        figure.classList.add("gallery-picture");
        figure.appendChild(img);
        container.appendChild(figure);
    });
    // Ajoutez l'affichage des projets dans la galerie en utilisant la fonction displayWorks
    if (container === gallery) {
        displayWorks(arrayWorks);
    }
}

/*Affichage des works dans le DOM*/

function displayWorks(arrayWorks) {
    gallery.innerHTML= "";
    arrayWorks.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = work.imageUrl;
        figcaption.textContent = work.title;
        figure.classList.add("galleryimg");
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

/*Création des boutons, de leurs tableaux et de leurs appels individuel sans doublons*/
    
function displayCategorysButtons(arrayWokrs) {
  let categories = new Set( [
       "Tous"
  ]);

  

  arrayWokrs.forEach((work) => {
      categories.add(
       work.category.name);
  });

  categories.forEach((categoryName) => {  
      const btn = document.createElement("button");
      btn.textContent = categoryName;
      btn.dataset.name = categoryName;
     
      btn.addEventListener("click", (e) => {
        document.querySelectorAll("button.filtersbutton").forEach(button => {
        button.classList.remove("checkedfilter");
        });
        e.target.classList.add("checkedfilter");

          let works = [];
          e.preventDefault();
          if (e.target.dataset.name !== "Tous") {
              works = worksData.filter(
                  (work) => work.category.name === e.target.dataset.name
              );
          } else {
              works = worksData;
          }
          displayWorks(works);
      });
      btn.classList.add("filtersbutton");
      filters.appendChild(btn);
  });
}

////MODAL 1 INCLU DANS LA LIGNE 1 à 54 /////

/////// MODAL2 ////////

let modal = null;

/* Function d'ouverture de la modal */
const openModal = function(e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.style.display = 'block';
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true');
  modal = target;
  modal.addEventListener('click', closeModal);
  modal.querySelector('.js-close-modal').addEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}


/* Function de fermeture de la modal */
const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;


}

const stopPropagation = function (e) {
    e.stopPropagation();
}

/* Focus des éléments */
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});
    

/*Uplaod Photo*/

document.querySelector('.addpicture').addEventListener('click', function() {
  document.getElementById('upload').click();
});