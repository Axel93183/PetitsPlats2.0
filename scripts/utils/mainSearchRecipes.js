const mainSearchInput = document.getElementById("mainSearchInput");
const searchResultsDiv = document.getElementById("recipes-section");
const btnSearch = document.getElementById("btnSearch");

// Main Search Function
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
    document.querySelector("#search-div h2").textContent = "0 recette";
  }
}

// Search by Tag Function

SelectElementsUL.forEach((selectElement) => {
  selectElement.addEventListener("click", function (event) {
    const query = event.target.textContent;
    const searchResults = searchRecipes(query);
    // Affiche les résultats de la recherche dans la console
    console.log(searchResults);
    displayResults(searchResults);
  });
});

// Display Results Function
function displayResults(results) {
  searchResultsDiv.innerHTML = "";
  const query = mainSearchInput.value.trim().toLowerCase();

  if (results.length === 0) {
    searchResultsDiv.style.display = "flex";
    searchResultsDiv.textContent = `Aucune recette ne contient "${query}". Vous pouvez rechercher "tarte aux pommes", "poisson", etc...`;
  } else {
    searchResultsDiv.style.display = "grid";
    results.forEach((result) => {
      const recipeCardDom = recipesTemplate(result).getRecipeCardDom();
      searchResultsDiv.appendChild(recipeCardDom);
    });
    document.querySelector("#search-div h2").textContent =
      results.length + " recette(s)";
  }
}

mainSearchInput.addEventListener("input", startSearch);
btnSearch.addEventListener("click", startSearch);