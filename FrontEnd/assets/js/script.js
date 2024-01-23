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

    
/*Fonction qui retourne le tableau works*/

// async function getWorks() {
//     const response = await fetch("http://localhost:5678/api/works");
//     return await response.json();
    
// }

// getWorks();

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

// async function displayWorks() {
//   const arrayWorks = await getWorks();
//   arrayWorks.forEach((work) => {
//     const figure = document.createElement("figure");
//     const img = document.createElement("img");
//     const figcaption = document.createElement("figcaption");
//     img.src = work.imageUrl;
//     figcaption.textContent = work.title;
//     figure.classList.add("galleryimg");
//     figure.appendChild(img);
//     figure.appendChild(figcaption);
//     gallery.appendChild(figure);
//   });
// }

// displayWorks();

/******Affichages des boutons par catégories******/

// récupérer le tableau des catégories

// async function getCategorys() {
// const response = await fetch("http://localhost:5678/api/categories");
// return await response.json();
// console.log(responseJson);
// }

    
function displayCategorysButtons(arrayWokrs) {
    //set ->>>a voir

    let tous = {0: "Tous"}
    let objet = { 1: "Objet" };
    let appartements = { 2: "Appartements" };
    let hotelsRestaurants = { 3: "HotelsRestaurants" };
    
    

    let categories = [{name:'Tous', id: 0}];
    arrayWokrs.forEach(
        (work) => {
           categories.push(work.category);
        }
    );
    categories.forEach((category) => {

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
        })
      filters.appendChild(btn);
    });
}
   


    /*******Filtrer les éléments au click ******/
    // function filterCategory() {

    //     const buttons = document.querySelectorAll(".filters button");

    //     buttons.forEach((button) => {
    //     button.addEventListener("click", (e) =>{
    //     btnId= e.target.id;
    //     gallery.innerHTML="";

    //     if(btnId !== "0") {
    //     const worksTriCategory = works.filters((work) => {
    //     return work.categoryId == btnId;
    //     })

    //     worksTriCategory.forEach( work => {
    //     displayWorks(work);
    //     });
    //     }else {
    //     displayWorks();
    //     }
    //     console.log(btnId);
    //     })
    //     }     
    // )}
    // filterCategory();

    