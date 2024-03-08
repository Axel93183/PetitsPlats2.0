console.log(recipes);
const mainSearchInput = document.getElementById("mainSearchInput");
const searchResultsDiv = document.getElementById("recipes-section");
const btnSearch = document.getElementById("btnSearch");

// Search Function
function searchRecipes(query) {
  const results = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    if (
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some((ingredients) =>
        ingredients.ingredient.toLowerCase().includes(query.toLowerCase())
      )
    ) {
      results.push(recipe);
    }
  }
  return results;
}

// Search Start Function
function startSearch() {
  const query = mainSearchInput.value.trim().toLowerCase();

  if (query.length >= 3) {
    const searchResults = searchRecipes(query);

    // Affiche les résultats de la recherche dans la console
    console.log(searchResults);

    displayResults(searchResults);
  } else {
    searchResultsDiv.textContent =
      "La recherche doit contenir au moins 3 caractères.";
  }
}

// Display Results Function
function displayResults(results) {
  searchResultsDiv.innerHTML = "";
  const query = mainSearchInput.value.trim().toLowerCase();

  if (results.length === 0) {
    searchResultsDiv.style.display = "flex";
    searchResultsDiv.textContent = `Aucune recette ne contient "${query}". Vous pouvez rechercher "tarte aux pommes", "poisson", etc...`;
  } else {
    results.forEach((result) => {
      const recipeCardDom = recipesTemplate(result).getRecipeCardDom();
      searchResultsDiv.appendChild(recipeCardDom);
    });
  }
}

mainSearchInput.addEventListener("input", startSearch);
btnSearch.addEventListener("click", startSearch);
