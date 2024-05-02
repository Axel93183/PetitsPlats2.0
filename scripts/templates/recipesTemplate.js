import Ingredient from "../models/ingredient.js";

function recipesTemplate(recipe) {
  function getRecipeCardDom() {
    const article = document.createElement("article");
    article.className = "recipe-card";

    const imgDiv = document.createElement("div");
    imgDiv.className = "img";

    const img = document.createElement("img");
    img.src = `images/${recipe.image}`;
    img.alt = `photo de ${recipe.name}`;

    const timeDiv = document.createElement("div");
    timeDiv.className = "time";
    timeDiv.textContent = `${recipe.time}min`;

    imgDiv.appendChild(img);
    imgDiv.appendChild(timeDiv);

    const recipeDiv = document.createElement("div");
    recipeDiv.className = "recipe";

    const recipeTitle = document.createElement("h3");
    recipeTitle.className = "recipe-title";
    recipeTitle.textContent = recipe.name;

    const recipeSubtitle = document.createElement("h4");
    recipeSubtitle.className = "recipe-subtitle";
    recipeSubtitle.textContent = "RECETTE";

    const recipeText = document.createElement("p");
    recipeText.className = "recipe-text";
    recipeText.textContent = recipe.description;

    const ingredientsSubtitle = document.createElement("h4");
    ingredientsSubtitle.className = "recipe-subtitle";
    ingredientsSubtitle.textContent = "INGRÉDIENTS";

    const ingredientsList = document.createElement("div");
    ingredientsList.className = "ingredients-list";

    const ingredients = recipe.ingredients;

    ingredients.forEach((ingredientData) => {
      const ingredientDiv = document.createElement("div");
      ingredientDiv.className = "ingredient";

      const ingredient = new Ingredient(
        ingredientData.ingredient,
        ingredientData.quantity,
        ingredientData.unit
      );

      const ingredientName = document.createElement("p");
      ingredientName.className = "ingredient-name";
      ingredientName.textContent = ingredient.ingredient;

      const ingredientQuantity = document.createElement("p");
      ingredientQuantity.className = "ingredient-quantity";
      ingredientQuantity.textContent =
        (ingredient.quantity ? ingredient.quantity : "-") +
        (ingredient.unit ? " " + ingredient.unit : "");

      ingredientDiv.appendChild(ingredientName);
      ingredientDiv.appendChild(ingredientQuantity);

      ingredientsList.appendChild(ingredientDiv);
    });

    recipeDiv.appendChild(recipeTitle);
    recipeDiv.appendChild(recipeSubtitle);
    recipeDiv.appendChild(recipeText);
    recipeDiv.appendChild(ingredientsSubtitle);
    recipeDiv.appendChild(ingredientsList);

    article.appendChild(imgDiv);
    article.appendChild(recipeDiv);

    return article;
  }
  return { recipe, getRecipeCardDom };
}

export default recipesTemplate;
