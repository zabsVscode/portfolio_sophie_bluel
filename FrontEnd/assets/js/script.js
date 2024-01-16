/*const content = document.querySelector(".gallery");
let images;

async function fetchFiles() {
    try {
        const response = await fetch("http://localhost:5678/api");
        images = await response.json();
        console.log(images);

        for (let i = 0; i < images.length; i++) {
            const imageElement = document.createElement('img');
            imageElement.src = images[i].url;
            content.appendChild(imageElement);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des images :", error);
    }
}
fetchFiles();*/

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:5678/api/works", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));