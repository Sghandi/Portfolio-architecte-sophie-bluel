
let works = [];

// Calling the API with fetch to retrieve the works
async function fetchCategories() {
    const response = await fetch('http://localhost:5678/api/categories')
    const categories = await response.json();
    return categories;
}
fetchCategories().then(categories => { console.log(categories);
});

// Calling the API with fetch to retrieve the categories
async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    return works;
}
fetchWorks().then(works => { console.log(works);
});

fetchWorks().then(works => { 
    generateProjects(works);
});

// Adding the dynamic gallery 
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
const sectionGallery = document.querySelector(".gallery");
sectionGallery.innerHTML = "";

console.log(works);

// filters creation
fetchWorks().then(worksData => { 
    works = worksData;
});

const buttonFilter1 = document.querySelector(".btn-filter1");
const buttonFilter2 = document.querySelector(".btn-filter2");
const buttonFilter3 = document.querySelector(".btn-filter3");
const buttonFilter4 = document.querySelector(".btn-filter4");


buttonFilter1.addEventListener("click", function () {
    const catFiltring = works.filter(function (work) {
        return work.categoryId === 1, 2, 3;
    });
    sectionGallery.innerHTML = "";
    generateProjects(catFiltring);
});
buttonFilter2.addEventListener("click", function () {
    const catFiltring = works.filter(function (work) {
        return work.categoryId === 1;
    });
    sectionGallery.innerHTML = "";
    generateProjects(catFiltring);
});
buttonFilter3.addEventListener("click", function () {
    const catFiltring = works.filter(function (work) {
        return work.categoryId === 2;
    });
    sectionGallery.innerHTML = "";
    generateProjects(catFiltring);
});
    buttonFilter4.addEventListener("click", function () {
        const catFiltring = works.filter(function (work) {
            return work.categoryId === 3;
        });
    sectionGallery.innerHTML = "";
    generateProjects(catFiltring);
});


