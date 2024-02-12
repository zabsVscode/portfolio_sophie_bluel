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
        const containerImg = document.createElement("div"); 
        const img = document.createElement("img");
        const icon = document.createElement("i"); 

        

        icon.classList.add("fa-solid", "fa-trash-can"); 
        img.src = work.imageUrl;
        img.classList.add("img-picture")
        figure.classList.add("gallery-picture");
        figure.appendChild(img);

        icon.classList.add("trash-icon");


        containerImg.appendChild(img);
        containerImg.appendChild(icon);
        figure.appendChild(containerImg);
        container.appendChild(figure);
    });

    
    // Ajoutez l'affichage des projets dans la l'accueil en utilisant la fonction displayWorks
    if (container === gallery) {
        displayWorks(arrayWorks);
    }


    // Sélection de tout les bouton corbeille, puis remove project
    const trashIcons = document.querySelectorAll('.trash-icon');

    // Ajoutez un gestionnaire d'événements à chaque bouton de suppression
        trashIcons.forEach(trashIcon => {
        trashIcon.addEventListener('click', () => {
        // Obtenir l'ID du projet à partir de l'attribut data-id du parent du bouton
        const id_projet = trashIcon.parentElement.dataset.id;
        
        // Supprimer le projet
        const galleryPicture = trashIcon.closest('.gallery-picture');
        galleryPicture.remove();
    });
});

    

        // Redirection sur la modal2 lors d'un event click sur button"
        document.querySelector('.addpicture').addEventListener('click', function() {
            event.preventDefault();
            // Masquer la modal1
            document.getElementById('modal1').style.display = 'none';
            // Afficher la modal2
            document.getElementById('modal2').style.display = 'block';
        });

       // Redirection sur la modal1 lors d'un event click sur la flèche back

        document.querySelector('.back-to-modal1').addEventListener('click', function() {
            event.preventDefault();
            // Masquer la modal1
            document.getElementById('modal2').style.display = 'none';
            // Afficher la modal2 & Reset la modal2 lors du back
            document.getElementById('modal1').style.display = 'block';
            document.getElementById('image-preview').innerHTML = '';
        });
        
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

const stopPropagation = function (e) {
    e.stopPropagation();
}

let modal = null;

/* Gestion de la fermeture de la modal "1" lors d'un clique à l'ext*/
window.addEventListener('click', function(event) {
    if (modal !== null && event.target === modal) {
        closeModal('#' + modal.id);
        window.location.href = 'index.html'; // Redirection vers la page d'accueil après la fermeture de la modal
    }
});

/* Gestionnaire d'événements pour la fermeture de la modal "2" lors d'un clique à l'ext*/
window.addEventListener('click', function(event) {
    const modal2 = document.getElementById('modal2');
    if (modal2 !== null && event.target === modal2) {
        closeModal('#modal2');
        window.location.href = 'index.html'; // Redirection vers la page d'accueil après la fermeture de la modal
    }
});


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


/* Gestionnaire d'événements pour le bouton de fermeture de la première modal */
document.querySelector('#modal1 .js-close-modal').addEventListener('click', function(event) {
    event.preventDefault();
    closeModal('#modal1');
    window.location.href = 'index.html';
});

/* Gestionnaire d'événements pour le bouton de fermeture de la deuxième modal */
document.querySelector('#modal2 .js-close-modal').addEventListener('click', function(event) {
    event.preventDefault();
    closeModal('#modal2');
    window.location.href = 'index.html';
});

/* Fonction pour fermer une modal spécifique */
function closeModal(modalId) {
    const modal = document.querySelector(modalId);
    if (modal === null) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
}


/* Event function pour retourner à la modal1 depuis la modal2 */
document.querySelector('#backModal1').addEventListener('click', function() {
    document.getElementById('modal2').style.display = 'none';
    document.getElementById('modal1').style.display = 'block';
});
;




/* Focus des éléments */
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});




/*Upload Photo*/

document.querySelector('#modal2 .addpicture').addEventListener('click', function() {
    document.getElementById('upload').click();
  });

  // Fonction pour précharger et afficher l'image sélectionnée
document.getElementById('upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('image-preview');
            preview.innerHTML = ""; // Supprimer le contenu précédent
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('preview-image');
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});
