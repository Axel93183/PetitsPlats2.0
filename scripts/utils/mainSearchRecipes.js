const mainSearchInput = document.getElementById("mainSearchInput");
const searchResultsDiv = document.getElementById("recipes-section");
const btnSearch = document.getElementById("btnSearch");

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

// Search by Query Function
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

// Search by Query Start Function
function startSearch() {
  const query = mainSearchInput.value.trim().toLowerCase();

  if (query.length >= 3) {
    const searchResults = searchRecipes(query);

    displayRecipesResults(searchResults);
  } else {
    searchResultsDiv.textContent =
      "La recherche doit contenir au moins 3 caractères.";
    document.querySelector("#search-div h2").textContent = "0 recette";
  }
}

mainSearchInput.addEventListener("input", startSearch);
btnSearch.addEventListener("click", startSearch);

// Initializing Search Tags Array
let selectedTags = [];

// Search by Tag Function
function searchByTag(event) {
  const tag = event.target.textContent.trim().toLowerCase();
  if (!selectedTags.includes(tag)) {
    selectedTags.push(tag);
  }

  const filteredRecipes = filterRecipesByTag();

  displayRecipesResults(filteredRecipes);
}

function filterRecipesByTag() {
  let filteredRecipes = recipesRecovery.slice();

  for (let i = 0; i < selectedTags.length; i++) {
    const tag = selectedTags[i];
    filteredRecipes = filteredRecipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(tag) ||
        recipe.description.toLowerCase().includes(tag) ||
        recipe.appliance.toLowerCase().includes(tag) ||
        recipe.ustensils.some((ustensils) =>
          ustensils.toLowerCase().includes(tag)
        ) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(tag)
        )
      );
    });
  }

  return filteredRecipes;
}

function removeTag(tag) {
  selectedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);

  const filteredRecipes = filterRecipesByTag();

  displayRecipesResults(filteredRecipes);
}

function displayRecipesResults(recipesResults) {
  searchResultsDiv.innerHTML = "";
  const query = mainSearchInput.value.trim().toLowerCase();

  if (recipesResults.length === 0) {
    searchResultsDiv.style.display = "flex";
    searchResultsDiv.textContent = `Aucune recette ne contient "${query}". Vous pouvez rechercher "tarte aux pommes", "poisson", etc...`;
  } else {
    searchResultsDiv.style.display = "grid";
    recipesResults.forEach((result) => {
      const recipeCardDom = recipesTemplate(result).getRecipeCardDom();
      searchResultsDiv.appendChild(recipeCardDom);
    });

    document.querySelector("#search-div h2").textContent =
      recipesResults.length + " recette(s)";
  }
  updateSelectorsList(recipesResults);
}

// Search by Tag Event
SelectElementsUL.forEach((selectElement) => {
  selectElement.addEventListener("click", searchByTag);
});

// Remove Tag Event
searchTagsDiv.addEventListener("click", (event) => {
  if (event.target.classList.contains("close-tag")) {
    const tag = event.target.parentNode
      .querySelector("p")
      .textContent.trim()
      .toLowerCase();
    removeTag(tag);
  }
});
