let works = [];

/**
 * Retrieves a list of categories from the API.
 * @returns {Promise<Array>} A promise containing an array of categories.
 */
async function fetchCategories() {
  const response = await fetch('http://localhost:5678/api/categories');
  const categories = await response.json();
  return categories;
}

/**
 * Retrieves a list of works from the API.
 * @returns {Promise<Array>} A promise containing an array of works.
 */
async function fetchWorks() {
  const response = await fetch('http://localhost:5678/api/works');
  const works = await response.json();
  return works;
}

/**
 * Generates a gallery of projects using the provided array of works.
 * @param {Array} works - An array of work objects to display in the gallery.
 */
function generateProjects(works) {
  const dynamicGallery = document.querySelector("#dynamicGallery");
  dynamicGallery.innerHTML = ""; // Clear the existing gallery content

  for (let i = 0; i < works.length; i++) {
    const articleElement = document.createElement("article");
    const textElement = document.createElement("p");
    textElement.textContent = works[i].title;
    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;

    dynamicGallery.appendChild(articleElement);
    articleElement.appendChild(imageElement);
    articleElement.appendChild(textElement);
  }
}

// Fetch categories and works
Promise.all([fetchCategories(), fetchWorks()])
  .then(([categories, worksData]) => {
    // Assign works to the global variable
    works = worksData;

    // Generate initial projects
    generateProjects(works);

    // Add event listeners to filter buttons
    const filtersSection = document.querySelector('.filters-section');
    const filterButtons = filtersSection.querySelectorAll('button');

    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', () => {
        let filteredWorks = [];

        if (i === 0) {
          // "Tous" button is clicked, show all works
          filteredWorks = works;
        } else {
          // Category button is clicked, filter works based on category ID
          filteredWorks = works.filter((work) => work.categoryId === i);
        }

        generateProjects(filteredWorks);
      });
    }
  });


/**
 * Checks the authentication status and updates the UI accordingly.
 * @returns {void}
 */
function checkAuth() {
  const token = localStorage.getItem('token');
  const editButtons = document.querySelectorAll('.modification');
  const loginLink = document.getElementById('login-link');

  if (token) {
    // editButtons.forEach(button => button.style.display = 'block');
    loginLink.innerHTML = '<a href="#">logout</a>';
    loginLink.querySelector('a').addEventListener('click', function () {
      // remove the token to logout the user
      localStorage.removeItem('token');
      // Refresh the window
      location.reload();
    });

    const filtersSection = document.querySelector('.filters-section');
    if (token) {
      // If the user is authenticated
      // Remove the filters section from the page
      filtersSection.parentNode.removeChild(filtersSection);
    }
  }

  else {
    // If the user is not authenticated
    // hide the buttons "modifier" and show the login link
    editButtons.forEach(button => button.style.display = 'none');
    loginLink.innerHTML = '<a href="login.html">login</a>';
  }
}

// call the fonction "CheckAuth" when the window is refreshed
window.addEventListener('load', checkAuth);
