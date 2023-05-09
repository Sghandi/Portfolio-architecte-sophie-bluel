
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
    for (let i = 0; i < works.length; i++) {
      const articleElement = document.createElement("article");
      const textElement = document.createElement("p");
      textElement.textContent = "éditer";
      const buttonElement = document.createElement("button");
      buttonElement.classList = "delete-button";
      buttonElement.classList.add("delete-button");
      const imageElement = document.createElement("img");
      imageElement.src = works[i].imageUrl;
  
      modalGalleryContainer.appendChild(articleElement);
      articleElement.appendChild(imageElement);
      articleElement.appendChild(textElement);
      articleElement.appendChild(buttonElement);
  
      articleElement.style.position = "relative";
      buttonElement.style.position = "absolute";
      buttonElement.style.top = "0";
      buttonElement.style.right = "0";
      buttonElement.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    }
  }


const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)

    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()

}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})


// async function Delete(work) {
//     const response = await fetch('http://localhost:5678/api/works/', {
//       method: 'DELETE',
//       headers: {
//         'Authorization': 'Bearer ' + localStorage.getItem('token'),
//         'Accept': '*/*',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     });