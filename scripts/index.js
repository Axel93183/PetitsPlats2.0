function main() {
  // Input Field and Clear Field
  const mainSearchInput = document.getElementById("mainSearchInput");
  const clearIcon = document.getElementById("clearIcon");

  function resetMainSearchInput() {
    mainSearchInput.value = "";
    mainSearchInput.classList.remove("has-text");
  }

  window.addEventListener("load", resetMainSearchInput);

  mainSearchInput.addEventListener("input", function () {
    if (mainSearchInput.value.trim() !== "") {
      mainSearchInput.classList.add("has-text");
    } else {
      mainSearchInput.classList.remove("has-text");
    }
  });

  clearIcon.addEventListener("click", function () {
    resetMainSearchInput();
  });

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
}

main();
