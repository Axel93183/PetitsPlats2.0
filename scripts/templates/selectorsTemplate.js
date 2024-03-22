const ingredientsSelector = document.getElementById("ingredients");
const ingredientSearchInput = document.getElementById("ingredients-choice");
const appliancesSelector = document.getElementById("appliances");
const applianceSearchInput = document.getElementById("appliances-choice");
const ustensilsSelector = document.getElementById("ustensils");
const ustensilSearchInput = document.getElementById("ustensils-choice");

function updateSelectorsList(recipes) {
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

  function getAllIngredients() {
    const allIngredients = new Set();
    recipesElements.forEach((recipe) => {
      recipe.ingredients.forEach((ingredientData) => {
        allIngredients.add(ingredientData.ingredient.toLowerCase());
      });
    });
    return allIngredients;
  }

  function filterIngredients(searchTerm, allIngredients) {
    const filteredIngredients = new Set();
    allIngredients.forEach((ingredient) => {
      if (ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
        filteredIngredients.add(ingredient);
      }
    });
    return filteredIngredients;
  }

  function updateIngredientList(ingredients) {
    ingredientsSelector.innerHTML = "";
    ingredients.forEach((ingredient) => {
      const capitalizedIngredient =
        ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase();
      const ingredientToSelect = document.createElement("li");
      ingredientToSelect.textContent = capitalizedIngredient;
      ingredientsSelector.appendChild(ingredientToSelect);
    });
  }

  updateIngredientList(getAllIngredients());

  // Ingredient Search Function
  function handleIngredientSearchInput() {
    const searchTerm = ingredientSearchInput.value;
    const allIngredients = getAllIngredients();
    const filteredIngredients = filterIngredients(searchTerm, allIngredients);
    updateIngredientList(filteredIngredients);
  }

  // Ingredient Input Event
  ingredientSearchInput.addEventListener("input", handleIngredientSearchInput);

  /* Appliance Selector */

  function getAllAppliances() {
    const allAppliances = new Set();
    recipesElements.forEach((recipe) => {
      const appliance = recipe.appliance;
      allAppliances.add(appliance.toLowerCase());
    });
    return allAppliances;
  }

  function filterAppliances(searchTerm, allAppliances) {
    const filteredAppliances = new Set();
    allAppliances.forEach((appliance) => {
      if (appliance.toLowerCase().includes(searchTerm.toLowerCase())) {
        filteredAppliances.add(appliance);
      }
    });
    return filteredAppliances;
  }

  function updateApplianceList(appliances) {
    appliancesSelector.innerHTML = "";
    appliances.forEach((appliance) => {
      const capitalizedAppliance =
        appliance.charAt(0).toUpperCase() + appliance.slice(1).toLowerCase();
      const applianceToSelect = document.createElement("li");
      applianceToSelect.textContent = capitalizedAppliance;
      appliancesSelector.appendChild(applianceToSelect);
    });
  }

  updateApplianceList(getAllAppliances());

  // Appliance Search Function
  function handleApplianceSearchInput() {
    const searchTerm = applianceSearchInput.value;
    const allAppliances = getAllAppliances();
    const filteredAppliances = filterAppliances(searchTerm, allAppliances);
    updateApplianceList(filteredAppliances);
  }

  // Appliance Input Event
  applianceSearchInput.addEventListener("input", handleApplianceSearchInput);

  /* Ustensils Selector */

  function getAllUstensils() {
    const allUstensils = new Set();
    recipesElements.forEach((recipe) => {
      recipe.ustensils.forEach((ustensilData) => {
        allUstensils.add(ustensilData.toLowerCase());
      });
    });
    return allUstensils;
  }

  function filterUstensils(searchTerm, allUstensils) {
    const filteredUstensils = new Set();
    allUstensils.forEach((ustensil) => {
      if (ustensil.toLowerCase().includes(searchTerm.toLowerCase())) {
        filteredUstensils.add(ustensil);
      }
    });
    return filteredUstensils;
  }

  function updateUstensilList(ustensils) {
    ustensilsSelector.innerHTML = "";
    ustensils.forEach((ustensil) => {
      const capitalizedUstensil =
        ustensil.charAt(0).toUpperCase() + ustensil.slice(1);

      const ustensilToSelect = document.createElement("li");
      ustensilToSelect.textContent = capitalizedUstensil;
      ustensilsSelector.appendChild(ustensilToSelect);
    });
  }

  updateUstensilList(getAllUstensils());

  // Ustensils Search Function
  function handleUstensilSearchInput() {
    const searchTerm = ustensilSearchInput.value;
    const allUstensils = getAllUstensils();
    const filteredUstensils = filterUstensils(searchTerm, allUstensils);
    updateUstensilList(filteredUstensils);
  }

  // Ustensils Input Event
  ustensilSearchInput.addEventListener("input", handleUstensilSearchInput);
}

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

      hideSearchComponent(event);
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

  selector
    .querySelector(".label-selector")
    .addEventListener("click", displaySelector);
  chevronIconSelector.addEventListener("click", displaySelector);
  chevronIconSelector.addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    displaySelector(e);
  });
});

/* Hide Selector */

function hideSearchComponent(event) {
  const searchingComponent = event.target.parentNode.parentNode;
  const chevronIconSelector =
    event.target.parentNode.parentNode.parentNode.querySelector("i");
  searchingComponent.style.display = "none";
  searchingComponent.querySelector("input").value = "";
  chevronIconSelector.classList.remove("fa-chevron-up");
  chevronIconSelector.classList.add("fa-chevron-down");
}
