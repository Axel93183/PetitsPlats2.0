// Initializing Recipe Objects from Recipe Data
const recipesRecovery = recipes.map((recipeData) => {
  return new Recipe(
    recipeData.id,
    recipeData.image,
    recipeData.name,
    recipeData.servings,
    recipeData.ingredients,
    recipeData.time,
    recipeData.description,
    recipeData.appliance,
    recipeData.ustensils
  );
});

// Display Recipes Cards
recipesRecovery.forEach((recipe) => {
  const recipeCardDom = recipesTemplate(recipe).getRecipeCardDom();
  document.getElementById("recipes-section").appendChild(recipeCardDom);
});
