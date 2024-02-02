let modal = null;

/* Function d'ouverture de la modal */
const openModal = function(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = 'block'; // Correction : Affiche la modal en définissant son style sur 'block'
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
    modal.style.display = 'none'; // Correction : Cache la modal en définissant son style sur 'none'
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal'); // Correction : Utilise removeAttribute au lieu de setAttribute
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;

    window.location.href = 'index.html';
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

/* Focus des éléments */
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});