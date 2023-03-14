//Récupération des recettes
const recipes = await fetch('../data/recipes.json').then(recipes => recipes.json());

//récupération des ingrédients
// const detailledIngredients = recipes.map(recipe => recipe.ingredients);

//cible du DOM
const $recipesSection = document.querySelector('.all-recipes');

// CREATION RECETTES
function displayRecipes(recipes) {

  for (let i = 0; i < recipes.length; i++) {

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
    recipeTitle.innerText = recipes[i].name;
    recipeHeader.appendChild(recipeTitleContainer);
    recipeTitleContainer.appendChild(recipeTitle);

    //creation temps
    const recipeTime = document.createElement('p');
    recipeTime.classList.add('recipe__content-header__time');
    recipeTime.innerText = `${recipes[i].time} min`;
    recipeHeader.appendChild(recipeTime);

    const recipeTimeIcon = document.createElement('i');
    recipeTimeIcon.classList.add('far');
    recipeTimeIcon.classList.add('fa-clock');
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

    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      const listIng = document.createElement('li');
      // listIng.innerHTML = recipes[i].ingredients[j].ingredient + ':&nbsp;' + recipes[i].ingredients[j].quantity + '&nbsp;' + recipes[i].ingredients[j].unit;
      let quantity = recipes[i].ingredients[j].quantity ?? '&nbsp';
      let unit = recipes[i].ingredients[j].unit ?? '&nbsp';

      listIng.innerHTML = recipes[i].ingredients[j].ingredient + ':&nbsp' + quantity + '&nbsp' + unit;

      recipeListIngredients.appendChild(listIng);
    }
    recipeIngredients.appendChild(recipeListIngredients);

    // Instructions
    const instructionsRecipe = document.createElement('div');
    instructionsRecipe. classList.add('recipe__content__instructions');
    // instructionsRecipe. classList.add('col');
    instructionsRecipe.innerText = recipes[i].description;
    recipeDetails.appendChild(instructionsRecipe);
  }
}

displayRecipes(recipes);


/*

BARRE PRINCIPALE DE RECHERCHE
*/





/*
MISE A JOUR DES RESULTATS
*/

// $recipesSection.innerHTML = "";
// displayRecipes();
