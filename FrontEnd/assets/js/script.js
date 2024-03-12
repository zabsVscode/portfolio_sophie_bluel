/*Variables*/
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
let worksData = [];
let set1 = new Set([0, 1, 2, 3]);

// Création de la div pour le bandeau d'édition
const bandeauEditionDiv = document.createElement("div");
bandeauEditionDiv.classList.add("bandeau-edition");

// Définir le style pour positionner le bandeau d'édition
bandeauEditionDiv.style.position = "absolute";
bandeauEditionDiv.style.top = "0";
bandeauEditionDiv.style.left = "0";
bandeauEditionDiv.style.width = "100%";

// Ajoutez le bandeau d'édition au body ou à un autre élément parent
document.body.appendChild(bandeauEditionDiv);

// Création de l'icône pour le mode édition
const penIcon = document.createElement("i");
penIcon.classList.add("fa-regular", "fa-pen-to-square", "bandeau-edition_colorIcon");

// Création du p pour le texte "Mode édition"
const modeEditionText = document.createElement("p");
modeEditionText.textContent = "Mode édition";
modeEditionText.classList.add("bandeau-edition_text");

// Ajout de l'icône et du texte dans la div bandeau d'édition
bandeauEditionDiv.appendChild(penIcon);
bandeauEditionDiv.appendChild(modeEditionText);

// Ajouter un event à "bandeauEditionDiv" pour ouvrir la modal
bandeauEditionDiv.addEventListener('click', openModalEdition);

// Fonction pour ouvrir la modal lorsque "Mode édition" est cliqué
function openModalEdition(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du lien

    if (checkLoginStatus()) { // Vérifier si l'utilisateur est connecté
        const modal = document.getElementById('modal1');
        modal.style.display = 'block';

        // Ajouter un event pour fermer la modal en cliquant en dehors
        window.addEventListener('click', closeModalEdition);
    } else {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        window.location.href = "login.html";
    }
}

// Fonction pour fermer la modal si clique en dehors
function closeModalEdition(event) {
    const modal = document.getElementById('modal1');
    if (event.target === modal) {
        modal.style.display = 'none'; // Fermer la modal si clique en dehors
        window.removeEventListener('click', closeModalEdition); // Supprimer l'écouteur d'événements
    }
}

// Sélection du body
const bodyElement = document.querySelector("body");

// Sélection du header
const headerElement = document.querySelector("header");

///////VERIFICATION SI L'USER EST CONNECTEE ET MODIFICATION EN FONCTION DE

// Fonction pour vérifier si l'utilisateur est connecté
function checkLoginStatus() {
    const token = localStorage.getItem('token'); // Vérifie si un jeton d'authentification est présent dans le stockage local
    return token !== null && token !== undefined; // Retourne true si un jeton est trouvé, sinon false
}

// Masquer le bandeau d'édition si l'utilisateur n'est pas connecté
if (!checkLoginStatus()) {
    bandeauEditionDiv.style.display = 'none';
}

// Fonction pour mettre à jour l'affichage de la barre de navigation en fonction de l'état de connexion
function updateNavbar() {
    const loginElement = document.querySelector('nav ul li:nth-child(3)');

    // Modifier le texte en fonction de l'état de connexion
    loginElement.textContent = checkLoginStatus() ? 'logout' : 'login';

    // Ajouter un gestionnaire d'événements au clic sur l'élément login/logout
    loginElement.addEventListener('click', function() {
        if (!checkLoginStatus()) {
            // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
            window.location.href = "login.html";
        } else {
            // Si l'utilisateur est connecté, basculer entre l'état de connexion et de déconnexion
            toggleLogin();
        }
    });

    // Masquer ou afficher les filtres en fonction de l'état de connexion
    if (checkLoginStatus()) {
        filters.style.display = 'none'; // Masquer les filtres si l'utilisateur est connecté
    } else {
        filters.style.display = 'block'; // Afficher les filtres si l'utilisateur n'est pas connecté
    }

    // Ajouter la classe par défaut à toutes les balises <li> de la liste
    const navItems = document.querySelectorAll('nav ul li');
    navItems.forEach(item => {
        item.classList.add('cursor-pointer'); // Remplacez 'votre-classe-par-defaut' par le nom de votre classe CSS par défaut
    });
}

// Appeler la fonction updateNavbar() pour initialiser correctement l'affichage au chargement de la page
updateNavbar();

// Fonction pour basculer entre l'état de connexion et de déconnexion
function toggleLogin() {
    const isLoggedIn = checkLoginStatus(); // Vérifie si l'utilisateur est connecté

    if (isLoggedIn) {
        // Si l'utilisateur est connecté, supprimer le jeton d'authentification
        localStorage.removeItem('token');
        // Rediriger vers la page de connexion
        window.location.href = "login.html";
    }

    updateNavbar(); // Mettre à jour l'affichage de la barre de navigation
}




/*Récupération des données du back-end*/
let requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

// Récupération des données des projets et des catégories depuis l'API
fetch("http://localhost:5678/api/works", requestOptions)
    .then(response => response.json())
    .then(result => {
        worksData = result;
        displayProjects(result, gallery); // Affichage des projets dans l'accueil/index
        displayProjects(result, document.getElementById('galleryPictures')); // Affichage des projets dans la modale
        displayCategorysButtons(result);
    })
    .catch(error => console.log('error', error));


// Fonction pour récupérer les catégories via une requête HTTP
function fetchCategories() {
    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(categories => {
            console.log(categories); 
            generateDropdownOptions(categories); 
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des catégories:', error);
        });
}

// Fonction pour générer les options du menu déroulant
function generateDropdownOptions(categories) {
    const dropdown = document.getElementById('dropdown'); // Sélectionnez le menu déroulant
    dropdown.innerHTML = ''; // Videz le contenu actuel du menu déroulant

    // Créez une option par catégorie et ajoutez-la au menu déroulant
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id; // Utilisez l'ID de la catégorie comme valeur
        option.textContent = category.name; // Utilisez le nom de la catégorie comme texte de l'option
        dropdown.appendChild(option); // Ajoutez l'option au menu déroulant
    });
}

// Appelez la fonction fetchCategories() pour récupérer les catégories au chargement de la page ou lorsque vous en avez besoin
fetchCategories();



/*Fonction pour afficher les projets*/
function displayProjects(arrayWorks, container) {
    container.innerHTML = ""; // Videz le contenu précédent
    arrayWorks.forEach((work) => {
        const figure = document.createElement("figure");
        const containerImg = document.createElement("div");
        const img = document.createElement("img");
        const icon = document.createElement("i");

        // Ajoutez l'attribut work-id avec la valeur de l'ID du projet à l'élément figure
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

    // Ajoutez l'affichage des projets dans l'accueil en utilisant la


    
    // Ajoutez l'affichage des projets dans l'accueil en utilisant la fonction displayWorks
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

// Fonction pour créer et insérer les options du select
function createSelectOptions(select, categories) {
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.value;
        option.text = category.text;
        select.appendChild(option);
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
    let categories = new Set(["Tous"]);

    arrayWokrs.forEach((work) => {
        categories.add(work.category.name);
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
        if (categoryName === "Tous") {
            btn.classList.add("checkedfilter"); // Ajouter la classe checkedfilter uniquement au bouton "Tous"
        }
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
    }
});

// Sélectionnez le formulaire dans la modal2
const modal2Form = document.querySelector('#modal2 form');

// Créez et insérez le menu déroulant dans le formulaire
const categoryDropdown = document.createElement('select');
categoryDropdown.classList.add('categoriesproject');
categoryDropdown.id = 'dropdown'; // Définissez l'ID pour une référence facile
categoryDropdown.name = 'category'; // Définissez le nom pour l'envoi du formulaire
categoryDropdown.required = true;

// Créez une option par défaut pour le menu déroulant
const defaultOption = document.createElement('option');
defaultOption.value = ''; // Laissez la valeur vide pour que l'utilisateur soit obligé de choisir une option
defaultOption.textContent = 'Sélectionner une catégorie...'; // Texte par défaut pour guider l'utilisateur
defaultOption.disabled = true; // Désactivez l'option par défaut pour qu'elle ne soit pas sélectionnable
defaultOption.selected = true; // Sélectionnez l'option par défaut par défaut
categoryDropdown.appendChild(defaultOption); // Ajoutez l'option par défaut au menu déroulant

// Ajoutez des options supplémentaires dynamiquement en JavaScript lorsque les catégories sont chargées
// Utilisez la fonction generateDropdownOptions(categories) pour cela

// Insérez le menu déroulant dans le formulaire
modal2Form.insertBefore(categoryDropdown, modal2Form.querySelector('.decoration-ligne-modal2'));


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

    if (target.id === 'modal2') {
        fetchCategories();
    }
}

/* Gestionnaire d'événements pour le bouton de fermeture de la première modal */
document.querySelector('#modal1 .js-close-modal').addEventListener('click', function(event) {
    event.preventDefault();
    closeModal('#modal1');
});

/* Gestionnaire d'événements pour le bouton de fermeture de la deuxième modal */
document.querySelector('#modal2 .js-close-modal').addEventListener('click', function(event) {
    event.preventDefault();
    closeModal('#modal2');
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





// Fonction pour mettre à jour l'affichage des éléments en fonction de l'état de connexion
function updateElementVisibility() {
    const loggedIn = checkLoginStatus(); // Vérifie si l'utilisateur est connecté
    const modifierLink = document.querySelector('.custom-portfolio.js-modal');

    if (loggedIn) {
        modifierLink.style.display = 'block'; // Afficher le lien de modification
    } else {
        modifierLink.style.display = 'none'; // Masquer le lien de modification
    }
}

// Appeler la fonction pour mettre à jour l'affichage au chargement de la page
updateElementVisibility();


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