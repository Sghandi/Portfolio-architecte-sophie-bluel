
// document.addEventListener('DOMContentLoaded', function() {
  
let modal = null
// const modalGalleryContainer = document.getElementById('modalGalleryContainer');

// Function to open the modal
const openModal = function (e) {
  e.preventDefault()
  const target = document.querySelector(e.target.getAttribute('href'))
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

fetchWorks().then(works => {
  generateModalProjects(works);
});

/**
 * Generates modal projects based on the provided works data.
 * @param {Array} works - An array of works data.
 * @returns {void}
 */
function generateModalProjects(works) {
  const modalGalleryContainer = document.querySelector("#modalGalleryContainer");
  // Clear the existing content of the modal gallery container
  modalGalleryContainer.innerHTML = '';

  if (!formElement.classList.contains('hidden')) { // Vérifiez si le formulaire est affiché
    return; // Si le formulaire est affiché, n'ajoutez pas les éléments de la galerie
  }

  for (let i = 0; i < works.length; i++) {
    // Create elements for each work
    const articleElement = document.createElement("article");
    const textElement = document.createElement("p");
    textElement.textContent = "éditer";

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("delete-button");
    buttonElement.dataset.imageId = works[i].id;

    // Add event listener to handle work deletion
    buttonElement.addEventListener('click', async function (event) {
      event.preventDefault();
      const imageId = parseInt(event.target.dataset.imageId);

      const token = localStorage.getItem('token');
      if (token) {
        // Async function to delete work
        async function deleteWork() {
          try {
            const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
              method: 'DELETE',
              headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            });

            if (response.status === 200) {
              console.log('Le travail a été supprimé avec succès');

              // Remove the corresponding work element from the DOM
              const workElement = event.target.parentNode;
              if (workElement) {
                workElement.remove();
              } else {
                console.log("L'élément du travail à supprimer n'a pas été trouvé dans le DOM");
              }
            } else {
              console.log('Erreur lors de la suppression du travail');
            }
          }
          catch (error) {
            console.log('Une erreur s\'est produite lors de la suppression du travail:', error);
          }
        }

        deleteWork(); // Appelle la fonction deleteWork pour effectuer la requête DELETE
      } else {
        console.log('Token non trouvé. Vous devez être connecté pour supprimer un travail.');
      }
    });

    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;

    articleElement.appendChild(imageElement);
    articleElement.appendChild(textElement);
    articleElement.appendChild(buttonElement);

    // positioning trash buttons
    modalGalleryContainer.appendChild(articleElement);
    articleElement.style.position = "relative";
    buttonElement.style.position = "absolute";
    buttonElement.style.top = "0";
    buttonElement.style.right = "0";
    buttonElement.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  }

}

const addImageButton = document.getElementById('add-image');
const formElement = document.querySelector('.modal-form');
const modalTitleElement = document.getElementById('titlemodal');
const deleteGalleryLink = document.querySelector('a[href="#"]');
const backButton = document.querySelector('.back-to-top-button');
const submitButton = document.getElementById('submit-button');
const modalGalleryContainer = document.getElementById('modalGalleryContainer');

addImageButton.addEventListener('click', function () {
  formElement.classList.remove('hidden');
  modalTitleElement.textContent = "Ajout photo";
  deleteGalleryLink.style.display = "none";
  backButton.style.display = "block";
  // addImageButton.style.display = 'none';
  addImageButton.classList.add('hidden');
  submitButton.classList.remove('hidden');
  modalGalleryContainer.style.display = "none";

});
const modalGallery = document.querySelector('#modalGallery');

backButton.addEventListener('click', function () {
  // modalGallery.scrollIntoView({ behavior: 'smooth' });
  formElement.classList.add('hidden');
  modalTitleElement.textContent = "Galerie photo";
  deleteGalleryLink.style.display = "inline";
  backButton.style.display = "none";
  addImageButton.classList.remove('hidden');
  submitButton.classList.add('hidden');
  // modalGalleryContainer.classList.add('hidden');
  modalGalleryContainer.style.display = "flex";
});

// Function to select file
function handleFileButtonClick() {
  document.getElementById('file-upload').click();
}

function handleFileSelection() {
  const fileInput = document.getElementById('file-upload');
  const selectedFiles = fileInput.files;
  if (selectedFiles.length > 0) {
    console.log('Fichier sélectionné:', selectedFiles[0].name);
  }
}


// Function to close the modal
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);

  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', openModal);
});
// })
