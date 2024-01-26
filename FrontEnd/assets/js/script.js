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
          displayWorks(result);
          displayCategorysButtons(result);
      })
    .catch(error => console.log('error', error));


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
  let categories = [
      { name: 'Tous', id: 0 },
      { name: 'Objets', id: 1 },
      { name: 'Appartements', id: 2 },
      { name: 'Hotels & restaurants', id: 3 }
  ];

  const uniqueButtonIds = new Set(categories.map(category => category.id));

  arrayWokrs.forEach((work) => {
      uniqueButtonIds.add(work.category.id); // Ajouter l'identifiant de la catégorie à l'ensemble
  });

  uniqueButtonIds.forEach((id) => { // Parcourir les identifiants uniques
      const category = categories.find(cat => cat.id === id); // Trouver la catégorie correspondante
      const btn = document.createElement("button");
      btn.textContent = category.name;
      btn.dataset.id = category.id;
      btn.addEventListener("click", (e) => {
          let works = [];
          e.preventDefault();
          if (e.target.dataset.id !== "0") {
              works = worksData.filter(
                  (work) => work.categoryId === parseInt(e.target.dataset.id)
              );
          } else {
              works = worksData;
          }
          displayWorks(works);
      });
      filters.appendChild(btn);
      
      /*btn.classList.add(filtersbutton);*/
  });
}
    