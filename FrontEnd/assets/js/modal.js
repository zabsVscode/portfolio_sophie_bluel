let modal = null


/* function ouverture de la modal */

const openModal = function(e) {
e.preventDefault();
const target = document.querySelector(e.target.getAttribute('href'))
target.style.display = null;
target.removeAttribute('aria-hidden');
target.setAttribute('aria-modal', 'true');
modal = target;
modal.addEventListener('click', closeModal);
modal.querySelector('.js-close-modal').addEventListener('click', closeModal);
modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

/* function fermeture de la modal */

const closeModal = function (e) {
if (modal === null) return;
e.preventDefault();
modal.style.display = null;
modal.setAttribute('aria-hidden', 'true');
target.removeAttribute('aria-modal');
modal = target;
modal.removeEventListener('click', closeModal);
modal.querySelector('.js-close-modal').removeEventListener('click', closeModal);
modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
modal = null;
}

const stopPropagation = function (e) {
e.stopPropagation();
}

/* focus des éléments (peut être le mettre au début */

document.querySelectorAll('.js-modal').forEach(a => {
a.addEventListener('click', openModal)
})