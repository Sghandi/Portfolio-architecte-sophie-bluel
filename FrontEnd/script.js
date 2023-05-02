
let works = [];

/**
 * Retrieves a list of categories from the API.
 * @returns {Promise<Array>} A promise containing an array of categories.
 */
async function fetchCategories() {
    const response = await fetch('http://localhost:5678/api/categories')
    const categories = await response.json();
    return categories;
}
fetchCategories().then(categories => { console.log("categories : " + categories);
});

/**
 * Retrieves a list of works from the API.
 * @returns {Promise<Array>} A promise containing an array of works.
 */
async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works;
}
fetchWorks().then(works => { console.log("works : " + works );
});

fetchWorks().then(works => { 
    generateProjects(works);
});

/**
 * Generates a gallery of projects using the provided array of works.
 * @param {Array} works - An array of work objects to display in the gallery.
 */
function generateProjects(works) {
    const dynamicGallery = document.querySelector("#dynamicGallery");
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

// Clear the existing gallery content
const sectionGallery = document.querySelector(".gallery");
sectionGallery.innerHTML = "";

// filters creation
fetchWorks().then(worksData => { 
    works = worksData;
});

const filters = [
  [1, 2, 3],
  [1],       
  [2],       
  [3]        
];
console.log("filters: " + filters);

for (let i = 0; i < filters.length; i++) {
  const buttonFilter = document.querySelector(`.btn-filter${i+1}`);
  buttonFilter.addEventListener("click", function () {
    const catFiltering = works.filter(function (work) {
      return filters[i].includes(work.categoryId);
    });
    sectionGallery.innerHTML = "";
    generateProjects(catFiltering);
  });
}