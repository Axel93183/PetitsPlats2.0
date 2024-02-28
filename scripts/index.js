function main() {
  // Input Field and Clear Field
  const inputField = document.getElementById("inputField");
  const clearIcon = document.getElementById("clearIcon");

  inputField.addEventListener("input", function () {
    if (inputField.value.trim() !== "") {
      inputField.classList.add("has-text");
    } else {
      inputField.classList.remove("has-text");
    }
  });

  clearIcon.addEventListener("click", function () {
    inputField.value = "";
    inputField.classList.remove("has-text");
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
