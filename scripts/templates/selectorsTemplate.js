const ingredientsSelector = document.getElementById("ingredients");
const applianceSelector = document.getElementById("appliances");
const ustensilsSelector = document.getElementById("ustensils");

const recipesElements = recipes.map((recipeData) => {
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

/* Ingredient Selector*/

// Fonction pour récupérer tous les ingrédients des recettes sans doublons
function getAllIngredients() {
  // Crée un ensemble pour stocker tous les ingrédients sans doublons
  const allIngredients = new Set();
  // Parcourt chaque recette
  recipesElements.forEach((recipe) => {
    // Parcourt chaque ingrédient de la recette
    recipe.ingredients.forEach((ingredientData) => {
      // Ajoute l'ingrédient à l'ensemble
      allIngredients.add(ingredientData.ingredient);
    });
  });
  // Retourne l'ensemble de tous les ingrédients
  return allIngredients;
}

// Fonction pour filtrer les ingrédients en fonction du terme de recherche
function filterIngredients(searchTerm, allIngredients) {
  // Crée un ensemble pour stocker les ingrédients filtrés
  const filteredIngredients = new Set();
  // Parcourt tous les ingrédients
  allIngredients.forEach((ingredient) => {
    // Vérifie si l'ingrédient contient le terme de recherche (en ignorant la casse)
    if (ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
      // Ajoute l'ingrédient filtré à l'ensemble
      filteredIngredients.add(ingredient);
    }
  });
  // Retourne l'ensemble des ingrédients filtrés
  return filteredIngredients;
}

// Fonction pour mettre à jour la liste des ingrédients dans le DOM
function updateIngredientList(ingredients) {
  // Vide le contenu actuel de l'élément HTML
  ingredientsSelector.innerHTML = "";
  // Parcourt tous les ingrédients à afficher
  ingredients.forEach((ingredient) => {
    // Met la première lettre de l'ingrédient en majuscule et le reste en minuscules
    const capitalizedIngredient =
      ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase();
    // Crée un élément de liste HTML pour l'ingrédient
    const ingredientToSelect = document.createElement("li");
    // Définit le texte de l'élément de liste comme l'ingrédient formatté
    ingredientToSelect.textContent = capitalizedIngredient;
    // Ajoute l'élément de liste à l'élément HTML parent
    ingredientsSelector.appendChild(ingredientToSelect);
  });
}
// Sélectionne l'élément input de recherche
const searchInput = document.getElementById("ingredients-choice");

// Fonction pour gérer l'événement de saisie dans l'input de recherche
function handleSearchInput() {
  // Récupère le terme de recherche entré par l'utilisateur
  const searchTerm = searchInput.value;
  // Obtient tous les ingrédients disponibles
  const allIngredients = getAllIngredients();
  // Filtre les ingrédients en fonction du terme de recherche
  const filteredIngredients = filterIngredients(searchTerm, allIngredients);
  // Met à jour la liste des ingrédients affichés dans le DOM
  updateIngredientList(filteredIngredients);
}

// Écoute les événements de saisie dans l'input de recherche et appelle handleSearchInput()
searchInput.addEventListener("input", handleSearchInput);

// Appel initial pour afficher tous les ingrédients sans doublons au chargement de la page
updateIngredientList(getAllIngredients());

/* Appliance Selector */
recipesElements.forEach((recipe) => {
  const appliance = recipe.appliance;

  const applianceToSelect = document.createElement("li");
  applianceToSelect.textContent = appliance;

  const existingOptions = applianceSelector.querySelectorAll("li");

  let optionExists = false;

  existingOptions.forEach((option) => {
    if (option.textContent === appliance) {
      optionExists = true;
      return;
    }
  });

  if (!optionExists) {
    applianceSelector.appendChild(applianceToSelect);
  }
});

/* Ustensils Selector */
recipesElements.forEach((recipe) => {
  const ustensils = recipe.ustensils;

  ustensils.forEach((ustensil) => {
    const capitalizedUstensil =
      ustensil.charAt(0).toUpperCase() + ustensil.slice(1);

    const ustensilToSelect = document.createElement("li");
    ustensilToSelect.textContent = capitalizedUstensil;

    const existingOptions = ustensilsSelector.querySelectorAll("li");

    let optionExists = false;

    existingOptions.forEach((option) => {
      if (option.textContent === capitalizedUstensil) {
        optionExists = true;
        return;
      }
    });

    if (!optionExists) {
      ustensilsSelector.appendChild(ustensilToSelect);
    }
  });
});

/* Search Tags */
const searchDiv = document.getElementById("search-div");
const searchSelectorsDiv = document.querySelector(".search-selectors");
const searchTagsDiv = document.getElementById("search-tags");

const SelectElementsUL = searchSelectorsDiv.querySelectorAll("ul");

SelectElementsUL.forEach((selectElement) => {
  selectElement.addEventListener("click", function (event) {
    const selectedOption = event.target.textContent;

    let alreadyExists = false;

    searchTagsDiv.querySelectorAll(".search-tag").forEach((tag) => {
      if (tag.querySelector("p").textContent == selectedOption) {
        alreadyExists = true;
      }
    });

    if (!alreadyExists) {
      const divTag = document.createElement("div");
      divTag.className = "search-tag";

      const textTag = document.createElement("p");
      textTag.textContent = selectedOption;

      const spanTag = document.createElement("span");
      spanTag.textContent = "x";
      spanTag.className = "close-tag";

      spanTag.addEventListener("click", function () {
        divTag.parentNode.removeChild(divTag);
      });

      divTag.appendChild(textTag);
      divTag.appendChild(spanTag);

      searchTagsDiv.appendChild(divTag);

      searchDiv.style.margin = 0;
      searchTagsDiv.style.display = "flex";
    }
  });
});

/* Display Selector */
const selectors = document.querySelectorAll(".selector");

selectors.forEach((selector) => {
  const chevronIconSelector = selector.querySelector("i");
  const searchingComponent = selector.querySelector(".searching-component");

  function displaySelector() {
    if (
      searchingComponent.style.display === "none" ||
      searchingComponent.style.display === ""
    ) {
      searchingComponent.style.display = "block";
      chevronIconSelector.classList.remove("fa-chevron-down");
      chevronIconSelector.classList.add("fa-chevron-up");
    } else {
      searchingComponent.style.display = "none";
      chevronIconSelector.classList.remove("fa-chevron-up");
      chevronIconSelector.classList.add("fa-chevron-down");
    }
  }

  chevronIconSelector.addEventListener("click", displaySelector);
  chevronIconSelector.addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    displaySelector(e);
  });
});
