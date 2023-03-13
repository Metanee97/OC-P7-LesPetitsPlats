//Récupération des recettes
const recipes = await fetch('../data/recipes.json').then(recipes => recipes.json());

//récupération des ingrédients
const detailledIngredients = recipes.map(recipe => recipe.ingredients);

console.log(detailledIngredients);


//cible du DOM
const $recipesSection = document.querySelector('.all-recipes');

// CREATION DOM AVEC APPENDCHILD
for (let i = 0; i < recipes.length; i++) {

  //creation article
  const article = document.createElement('article');
  article.classList.add('article-recipe');
  article.classList.add('col');
  $recipesSection.appendChild(article);

 //creation img
  const recipeImg = document.createElement('div');
  recipeImg.classList.add('recipe__img');
  article.appendChild(recipeImg);

 //creation conteneur de contenu
  const recipeContent = document.createElement('div');
  recipeContent.classList.add('recipe__content');
  article.appendChild(recipeContent);

// //   //creation header de contenu
  const recipeHeader = document.createElement('div');
  recipeHeader.classList.add('recipe__content-header');
  recipeHeader.classList.add('row');
  recipeContent.appendChild(recipeHeader);

// //   //creation titre
  const recipeTitle = document.createElement('h1');
  recipeTitle.classList.add('col-8')
  recipeTitle.innerText = recipes[i].name;
  recipeHeader.appendChild(recipeTitle);

// //   //creation temps
  const recipeTime = document.createElement('p');
  recipeTime.classList.add('recipe__content-header__time');
  recipeTime.classList.add('col');
  recipeTime.innerText = `${recipes[i].time} min`;
  recipeHeader.appendChild(recipeTime);

// //   //creation contenu texte
  const recipeDetails = document.createElement('div');
  recipeDetails.classList.add('recipe__content__details');
  recipeDetails.classList.add('row');
  recipeContent.appendChild(recipeDetails);

// //   //creation contenu ingrédients
  const recipeIngredients = document.createElement('div');
  recipeIngredients.classList.add('recipe__content__ingredients');
  recipeIngredients.classList.add('col');
  recipeDetails.appendChild(recipeIngredients);

// //   //creation liste ingrédients
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

  //description
  const instructionsRecipe = document.createElement('div');
  instructionsRecipe. classList.add('recipe__content__instructions');
  instructionsRecipe. classList.add('col');
  instructionsRecipe.innerText = recipes[i].description;
  recipeDetails.appendChild(instructionsRecipe);
}
