/*Variables*/

const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

/*Récupération des données du back-end*/

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:5678/api/works", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    
/*Fonction qui retourne le tableau works*/

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
    
}

getWorks();

/*Affichage des works dans le DOM*/

async function displayWorks() {
    const arrayWorks = await getWorks();
    arrayWorks.forEach( (work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = work.imageUrl;
        figcaption.textContent = work.title;
        figure.classList.add("galleryimg");
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    })
}

displayWorks();

/******Affichages des boutons par catégories******/

//récupérer le tableau des catégories

async function getCategorys() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
    console.log(responseJson);
    }
    
    
    async function displayCategorysButtons() {
    const categorys = await getCategorys();
    categorys.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.id = category.id;
    filters.appendChild(btn);
    });
    }
    displayCategorysButtons();
    