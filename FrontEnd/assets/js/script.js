/*Variables*/
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
let worksData = [];
let set1 = new Set([0, 1, 2, 3]);

// Sélection de l'élément li "log-out"
var logOutElement = document.querySelector('ul li:nth-child(3)');

logOutElement.classList.add('li-pointer');
// Ajout d'un gestionnaire d'événements au clic sur l'élément log-out
logOutElement.addEventListener('click', function() {

    // Redirection vers la page index.html
    window.location.href = "login.html";
});


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
    
        // Ajoutez l'attribut data-id avec la valeur de l'ID du projet à l'élément figure
        figure.dataset.id = work.id;
    
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


// Sélectionner la galerie de la modal1
const galleryModal1 = document.getElementById('galleryPictures');

// Ajouter un écouteur d'événements à la galerie de la modal1
galleryModal1.addEventListener('click', (event) => {
    // Vérifier si l'élément cliqué est un bouton corbeille
    if (event.target.classList.contains('trash-icon')) {
        // Obtenir l'ID du projet à partir de l'attribut data-id du parent du bouton
        const id_projet = parseInt(event.target.closest('.gallery-picture').dataset.id);

        console.log("ID du projet à supprimer :", id_projet);

        // Supprimer le projet de l'API en envoyant une requête DELETE
        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        fetch(`http://localhost:5678/api/works/${id_projet}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    // Si la suppression côté serveur est réussie, supprimer également l'élément de la page
                    const galleryPicture = event.target.closest('.gallery-picture');
                    galleryPicture.remove();
                } else {
                    // Gérer l'erreur si la suppression échoue
                    console.error('La suppression du projet a échoué');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du projet:', error);
            });
    }
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


    // Selection du boutton valider, puis récupère les informations du projet pour le BackEnd
    //

    document.querySelector('.buttonvalidated').addEventListener('click', function(event) {
        event.preventDefault(); // Empêcher le comportement par défaut du bouton
    
        // Récupérer les informations du nouveau projet depuis les champs de saisie
        const title = document.getElementById('inputtitle').value;
        const category = parseInt(document.getElementById('dropdown').value);
    
        // Récupérer l'image téléchargée
        const fileInput = document.getElementById('upload');
        //vérifie si aucun fichier n'a était sélectionné, si true ERROR
        const imageFile = fileInput.files[0];
        
        if (!imageFile) {
            console.error("Aucune image sélectionnée");
            return;
        }
    
        // Créer un objet FormData pour envoyer les données, y compris le fichier image
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('title', title);
        formData.append('category', category);

        let myHeaders = new Headers();
  
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    
        // Envoyer les informations du nouveau projet au serveur via une requête POST
        fetch("http://localhost:5678/api/works", {
            method: 'POST',
            headers: myHeaders,
            body: formData
            
        })
        .then(response => response.json())
        .then(result => {
            // Si la requête est réussie, ajout du nouveau projet à la galerie côté client
            worksData.push(result); // Ajout du projet aux données existantes
            displayProjects(worksData, gallery); // Mettre à jour l'affichage de la galerie
            closeModal('#modal2'); // Fermer la modal2 après l'ajout du projet
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi de la requête POST:', error);
            // Gestion des erreurs : afficher un message d'erreur à l'utilisateur, par exemple
            alert('Une erreur est survenue lors de l\'envoi du projet. Veuillez réessayer plus tard.');
        });
    });
    

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

/* Gestion de la fermeture de la modal "1" lors d'un clique à l'ext */
window.addEventListener('click', function(event) {
    if (modal !== null && event.target === modal) {
        closeModal('#' + modal.id);
        window.location.href = 'index.html'; // Redirection vers la page d'accueil après la fermeture de la modal
    }
});

/* Gestionnaire d'événements pour la fermeture de la modal "2" lors d'un clique à l'ext */
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

////// Dynamic Select ////////

/* Création d'un tableau contenant les options du select */
const categories = [
    { value: "", text: "Sélectionner la catégorie" },
    { value: "1", text: "Objet" },
    { value: "2", text: "Appartement" },
    { value: "3", text: "Hotels & Restaurants" }
];

/* Création du select */
const select = document.createElement("select");
select.classList.add("categoriesproject");
select.id = "dropdown";

/* Ajout des options au select */
categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.value;
    option.text = category.text;
    select.appendChild(option);
});

/* Sélection de l'élément après lequel le select doit être inséré (le h3) */
const h3Categorie = document.querySelector('#modal2 h3');

/* Insertion du select après le titre "Catégorie" */
h3Categorie.insertAdjacentElement('afterend', select);
