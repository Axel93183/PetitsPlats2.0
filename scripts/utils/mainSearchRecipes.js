const mainSearchInput = document.getElementById("mainSearchInput");
const searchResultsDiv = document.getElementById("recipes-section");
const btnSearch = document.getElementById("btnSearch");
const mainDOMTag = document.getElementById("main");

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

// Global Filter Function
function filterRecipesByTerm(recipes, term) {
  const filtered = [];
  recipes.forEach((recipe) => {
    if (
      recipe.name.toLowerCase().includes(term) ||
      recipe.description.toLowerCase().includes(term) ||
      recipe.appliance.toLowerCase().includes(term) ||
      recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(term)
      ) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(term)
      )
    ) {
      filtered.push(recipe);
    }
  });
  return filtered;
}

// Filter Recipes Function
function filterRecipes() {
  let filteredRecipes = recipesRecovery.slice();

  // Filter by Tag
  selectedTags.forEach((tag) => {
    filteredRecipes = filterRecipesByTerm(filteredRecipes, tag);
  });

  // Filter by Query
  const query = mainSearchInput.value.trim().toLowerCase();
  if (query.length >= 3) {
    filteredRecipes = filterRecipesByTerm(filteredRecipes, query);
  }

  return filteredRecipes;
}

// Initializing Error Message Display
let errorMessageDisplayed = false;

// Search by Query Function
function searchByQuery() {
  const query = mainSearchInput.value.trim().toLowerCase();

  if (query.length >= 3) {
    if (errorMessageDisplayed) {
      const errorMessage = document.querySelector(".error-message");
      errorMessage.parentNode.removeChild(errorMessage);
      errorMessageDisplayed = false;
    }

    const filteredRecipes = filterRecipes();

    displayRecipesResults(filteredRecipes);
  } else {
    const filteredRecipes = filterRecipes();

    displayRecipesResults(filteredRecipes);

    if (!errorMessageDisplayed) {
      const errorMessage = document.createElement("p");
      errorMessage.className = "error-message";
      errorMessage.textContent =
        "La recherche doit contenir au moins 3 caractères.";
      mainDOMTag.insertBefore(errorMessage, mainDOMTag.children[1]);
      errorMessageDisplayed = true;
    }
  }
}

// Search by Query Event
mainSearchInput.addEventListener("input", searchByQuery);
btnSearch.addEventListener("click", searchByQuery);

// Initializing Search Tags Array
let selectedTags = [];

// Search by Tag Function
function searchByTag(event) {
  const tag = event.target.textContent.trim().toLowerCase();
  if (!selectedTags.includes(tag)) {
    selectedTags.push(tag);
  }
  const filteredRecipes = filterRecipes();
  displayRecipesResults(filteredRecipes);
}

// Remove Tag Function
function removeTag(tag) {
  selectedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
  const filteredRecipes = filterRecipes();
  displayRecipesResults(filteredRecipes);
}

// Display Recipes Results Function
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
