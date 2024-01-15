const db = require('./../models');
const Categories = db.categories

exports.findAll = async (req, res) =>  {
	try{
		const works = await Categories.findAll();
		return res.status(200).json(works);
	}catch(err){
		return res.status(500).json({ error: new Error('Something went wrong')})
	}

}

exports.create = async (req, res) => {

	const category = await Categories.create({
		name : req.body.name
	})
	return res.status(201).json(category)
}



const content = document.querySelector(".gallery");
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
fetchFiles();

  