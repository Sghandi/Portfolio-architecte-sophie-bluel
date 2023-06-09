
document.addEventListener('DOMContentLoaded', function () {

  let modal = null

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
    const imageId = parseInt(works[i].id);


    const token = localStorage.getItem('token');
    if (token) {
      // Async function to delete work
      async function deleteWork() {
        try {
          console.log(imageId)
          const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: 'DELETE',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            
          });
          if (response.ok) {
            // Remove the corresponding work element from the DOM
            const workElement = event.target.parentNode;
            if (workElement) {
              workElement.remove();
              console.log("Le travail a été supprimé avec succès")
              location.reload();
            } else {
              console.log("Le travail à supprimer n'a pas été trouvé dans le DOM");
              
            }
          } 
          else {
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

////////////////////////////////////////////////////////////////////////////////////
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
    addImageButton.classList.add('hidden');
    submitButton.classList.remove('hidden');
    modalGalleryContainer.style.display = "none";

  });
  const modalGallery = document.querySelector('#modalGallery');

  backButton.addEventListener('click', function () {
    formElement.classList.add('hidden');
    modalTitleElement.textContent = "Galerie photo";
    deleteGalleryLink.style.display = "inline";
    backButton.style.display = "none";
    addImageButton.classList.remove('hidden');
    submitButton.classList.add('hidden');
    modalGalleryContainer.style.display = "flex";
  });


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
})

////////////////////////FORM///////////////////////////////////////////////

// Function to handle the file button click
const handleFileButtonClick = function () {
  const fileInput = document.getElementById('file-upload');
  fileInput.click();
};

// Function to handle the file selection
const handleFileSelection = function () {
  const fileInput = document.getElementById('file-upload');
  const selectedFiles = fileInput.files;

  if (selectedFiles) {
    console.log('Fichier sélectionné :', selectedFiles[0].name);
    const formData = new FormData();

    formData.append('image', selectedFiles[0]);

    const reader = new FileReader();
    reader.onload = function (event) {
      const imageURL = event.target.result;
      const imagePreview = document.getElementById('image-preview');
      imagePreview.innerHTML = '<img src="' + imageURL + '" alt="Image preview" />';

      // Pour supprimer l'icone, le paragraph et le button qd une image apparait
      const deleteP = document.getElementById('modal-paragraph');
      deleteP.style.display = 'none';
      const deleteButtonImage = document.querySelector('.modal-form button');
      deleteButtonImage.style.display = 'none';
      const deleteIconeImage = document.querySelector('.fa-image');
      deleteIconeImage.style.display = 'none';
      const DeletePaddingDiv = document.querySelector('.grey-div');
      DeletePaddingDiv.style.padding = '0';
      const DeleteGapDiv = document.querySelector('.grey-div');
      DeleteGapDiv.style.gap = '0';
    };

    reader.readAsDataURL(selectedFiles[0]);
  }
};

// Function to validate the form
const validateForm = function (formData) {
  const title = formData.get('title');
  const category = formData.get('category');
  const image = formData.get('image');

  if (!title || !category || !image) {
    return false; // Les champs obligatoires ne sont pas remplis
  }
  const magicButton = document.querySelector('#submit-button');
  magicButton.style.backgroundColor = '#1D6154';
  return true; // Tous les champs sont remplis
};

const handleSubmit = async function (e) {
  e.preventDefault();

  // Get the form data
  const form = document.querySelector('.modal-form');
  const formData = new FormData(form);

  if (!validateForm(formData)) {
    // Display an error message if the form is not valid
    displayErrorMessage('Veuillez remplir tous les champs obligatoires.');
    return;
  }

  
    const token = localStorage.getItem('token'); // Get the token from local storage

    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
      Authorization: `Bearer ${token}`, // Include the token in the request header
      },
      body: formData,
    });

    if (response.ok) {
      // Display a success message
      displaySuccessMessage('Le projet a été ajouté avec succès.');

      const data = await response.json();

      const newWork = {
        id: data.id, // Assuming the response JSON contains the ID of the new work
        imageUrl: data.imageUrl,
        title: title,
        category: category,
      };

      works.push(newWork); // Add the new work to the works list

      generateModalProjects(works); // Regenerate the modal gallery with the new item
      await updateGallery(); // Update the gallery with the new project
    } else {
      // Display an error message if the request fails
      displayErrorMessage('Une erreur s\'est produite lors de l\'envoi du formulaire.');
    }
  };

// Prevent the page from refreshing on form submission
const form = document.querySelector('.modal-form');
form.addEventListener('submit', handleSubmit);

// Function to display an error message
const displayErrorMessage = function (message) {
  const errorMessageElement = document.querySelector('.error-message');
  errorMessageElement.textContent = message;
  errorMessageElement.style.display = 'block';
};

const displaySuccessMessage = function (message) {
  const successMessageElement = document.querySelector('.success-message');
  successMessageElement.textContent = message;
  successMessageElement.style.display = 'block';
};

// Add event listener to the form submit button
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', handleSubmit);

const updateGallery = async () => {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();

    const galleryHTML = generateGalleryHTML(works);

    const galleryElement = document.getElementById('dynamicGallery');
    galleryElement.innerHTML = galleryHTML;
  } catch (error) {
    console.log('Une erreur s\'est produite lors de la mise à jour de la galerie :', error);
  }
};

const generateGalleryHTML = (works) => {
  
  let galleryHTML = '';

  works.forEach((work) => {
    // Create a gallery item for each work
    const galleryItemHTML = `
      <div class="gallery-item">
        <img src="${work.imageUrl}" alt="${work.title}" />
        <h3>${work.title}</h3>
        <p>${work.category}</p>
      </div>
    `;

    galleryHTML += galleryItemHTML;
  });

  return galleryHTML;
};

