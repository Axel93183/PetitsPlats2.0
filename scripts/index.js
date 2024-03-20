function main() {
  // Input Field and Clear Field
  const mainSearchInput = document.getElementById("mainSearchInput");
  const clearIcon = document.getElementById("clearIcon");

  function resetMainSearchInput() {
    mainSearchInput.value = "";
    mainSearchInput.classList.remove("has-text");
    const filteredRecipes = filterRecipes();
    displayRecipesResults(filteredRecipes);
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

  // Display Recipes Cards
  for (let i = 0; i < recipesRecovery.length; i++) {
    const recipe = recipesRecovery[i];
    const recipeCardDom = recipesTemplate(recipe).getRecipeCardDom();
    document.getElementById("recipes-section").appendChild(recipeCardDom);
  }

  updateSelectorsList(recipesRecovery);
}

main();
