
let modal = null

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
  

function generateModalProjects(works) {
    const modalGalleryContainer = document.querySelector("#modalGalleryContainer");
  
    modalGalleryContainer.innerHTML = ''; 
  
    for (let i = 0; i < works.length; i++) {
      const articleElement = document.createElement("article");
      const textElement = document.createElement("p");
      textElement.textContent = "éditer";
  
      const buttonElement = document.createElement("button");
      buttonElement.classList.add("delete-button");
      buttonElement.dataset.imageId = works[i].id; 
      buttonElement.addEventListener('click', async function (event) {
        event.preventDefault();
        const imageId = parseInt(event.target.dataset.imageId); 
  
        const token = localStorage.getItem('token');
        if (token) {
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
  
                // Retire l'élément du DOM correspondant au travail supprimé
                const workElement = event.target.parentNode;
                if (workElement) {
                  workElement.remove();
                } else {
                  console.log("L'élément du travail à supprimer n'a pas été trouvé dans le DOM");
                }
              } else {
                console.log('Erreur lors de la suppression du travail');
              }
            } catch (error) {
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
  
      modalGalleryContainer.appendChild(articleElement);
    }
  }
  
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
