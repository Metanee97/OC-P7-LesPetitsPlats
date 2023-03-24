// Recipes variables
let recipes = [];
const errorRecipesMessage = 'No recipes found'

// Url to Fetch
const urlToFetch = '../data/recipes.json'

// Search & Filter
let filterRecipes = [];
let searchUser = "";
let recipesIngredients = [];
let selectedIngredients = [];
let recipesAppareils = [];
let selectedAppareils = [];
let recipesUstensiles = [];
let selectedUstensiles = [];
const errorSearchMessage = 'Aucune recette ne correspond à votre critère... vous pouvez chercher'

//cible du DOM
const $recipesSection = getQS('.all-recipes');
const searchFiltersSection = getQS('#search-section__filters-container');

// Récupération des recipes
recipes = await fetchRecipesJSON()
      .catch((error) => error.message)

// Init
displayRecipes();


/*
SearchBar : Champ de recherche
*/

//cible input dans le DOM
const input = document.getElementById('search-bar');

input.addEventListener('input', function () {
  searchUser = input.value.trim().toLowerCase();
  // si entrée user >= 3 alors lance la recherche | si champ recherche vide on clear le filtre actif
  if (searchUser.length >= 3 || searchUser.length === 0) {
    getFilterRecipes();
  }
})

/**
 * Function
 */

async function fetchRecipesJSON() {
  const response = await fetch(urlToFetch);
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}




function displayRecipes() {
  // Clear
  $recipesSection.innerHTML = '';
  recipesIngredients = [];
  recipesAppareils = [];
  recipesUstensiles = [];

  // Si ni filter avec
  if (filterRecipes.length === 0) {
    // Pas de recette
    if (recipes.length === 0) {
      displayMessage(errorRecipesMessage);
      return;
    }
    // Au moins un tableau d'une recette
    if (recipes.length > 0) {
      filterRecipes = recipes;
    }
  }

  for (let i = 0; i < filterRecipes.length; i++) {

    // Tableau unique des appareils
    if (recipesAppareils.indexOf(filterRecipes[i].appliance.toLowerCase()) === -1) {
      recipesAppareils[recipesAppareils.length] = filterRecipes[i].appliance.toLowerCase()
    }

    //creation article
    const article = document.createElement('article');
    article.classList.add('article-recipe');
    // article.classList.add('col-4');
    $recipesSection.appendChild(article);

    //creation img
    const recipeImg = document.createElement('div');
    recipeImg.classList.add('recipe__img');
    article.appendChild(recipeImg);

    //creation conteneur de contenu
    const recipeContent = document.createElement('div');
    recipeContent.classList.add('recipe__content');
    article.appendChild(recipeContent);

    //creation header de contenu
    const recipeHeader = document.createElement('div');
    recipeHeader.classList.add('recipe__content-header');
    recipeContent.appendChild(recipeHeader);

    //creation titre
    const recipeTitleContainer = document.createElement('div');
    recipeTitleContainer.classList.add('recipe__content-header-title')
    const recipeTitle = document.createElement('h1');
    recipeTitle.innerText = filterRecipes[i].name;
    recipeHeader.appendChild(recipeTitleContainer);
    recipeTitleContainer.appendChild(recipeTitle);

    //creation temps
    const recipeTime = document.createElement('p');
    recipeTime.classList.add('recipe__content-header__time');
    recipeTime.innerText = `${filterRecipes[i].time} min`;
    recipeHeader.appendChild(recipeTime);

    const recipeTimeIcon = document.createElement('i');
    recipeTimeIcon.classList.add('far', 'fa-clock');
    recipeTime.insertAdjacentElement('afterbegin', recipeTimeIcon);

    //creation contenu texte
    const recipeDetails = document.createElement('div');
    recipeDetails.classList.add('recipe__content__details');
    recipeContent.appendChild(recipeDetails);

    //creation contenu ingrédients
    const recipeIngredients = document.createElement('div');
    recipeIngredients.classList.add('recipe__content__ingredients');
    recipeDetails.appendChild(recipeIngredients);

    //creation liste ingrédients
    const recipeListIngredients = document.createElement('ul');

    for (let j = 0; j < filterRecipes[i].ingredients.length; j++) {
      const listIng = document.createElement('li');
      // listIng.innerHTML = recipes[i].ingredients[j].ingredient + ':&nbsp;' + recipes[i].ingredients[j].quantity + '&nbsp;' + recipes[i].ingredients[j].unit;
      let quantity = filterRecipes[i].ingredients[j].quantity ?? '&nbsp';
      let unit = filterRecipes[i].ingredients[j].unit ?? '&nbsp';
      let ingredient = filterRecipes[i].ingredients[j].ingredient;

      listIng.innerHTML = ingredient + ':&nbsp' + quantity + '&nbsp' + unit;

      recipeListIngredients.appendChild(listIng);

      // Tableau unique des ingrédients
      if (recipesIngredients.indexOf(ingredient.toLowerCase()) === -1) {
        recipesIngredients[recipesIngredients.length] = ingredient.toLowerCase();
      }
    }
    recipeIngredients.appendChild(recipeListIngredients);

    // Instructions
    const instructionsRecipe = document.createElement('div');
    instructionsRecipe.classList.add('recipe__content__instructions');
    // instructionsRecipe. classList.add('col');
    instructionsRecipe.innerText = filterRecipes[i].description;
    recipeDetails.appendChild(instructionsRecipe);

    // Tableau unique des ustensiles
    filterRecipes[i].ustensils.forEach((ustensile) => {
      if (recipesUstensiles.indexOf(ustensile.toLowerCase()) === -1) {
        recipesUstensiles[recipesUstensiles.length] = ustensile.toLowerCase();
      }
    })
  }
}


function getQS(id) {
  return document.querySelector(id);
}

function getFilterRecipes() {
  filterRecipes = recipes
      .filter((recipe) => recipe.name.toLowerCase().includes(searchUser))

  // Si on a une selection d'appareil
  if (selectedAppareils.length > 0) {
    filterRecipes = filterRecipes.filter((recipe) => selectedAppareils.includes(recipe.appliance.toLowerCase()))
  }
  // Si on a une sélection d'ustensiles
  if (selectedUstensiles.length > 0) {
    filterRecipes = filterRecipes.filter((recipe) => selectedUstensiles.some((ustensile) => recipe.ustensils.map((us) => us.toLowerCase()).includes(ustensile.toLowerCase())))
  }

  // Si on a une sélection d'ingrédient
  if (selectedIngredients.length > 0) {
    filterRecipes = filterRecipes.filter((recipe) => selectedIngredients.every((item) => recipe.ingredients.map((ing) => ing.ingredient.toLowerCase()).includes(item.toLowerCase())));
  }


  if (filterRecipes.length > 0) {
    displayRecipes()
  } else {
    const proposalTitles = ` «${recipes[0].name}», «${recipes[1].name}»`
    displayMessage(errorSearchMessage + proposalTitles)
  }
}


function displayMessage(message) {
  $recipesSection.innerHTML = "<div style='display: block'><span>" + message + "</span></div>"
}
