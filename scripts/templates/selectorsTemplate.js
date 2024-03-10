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
recipesElements.forEach((recipe) => {
  const ingredients = recipe.ingredients;
  ingredients.forEach((ingredientsData) => {
    const ingredient = new Ingredient(
      ingredientsData.ingredient,
      ingredientsData.quantity,
      ingredientsData.unit
    );

    const capitalizedIngredient =
      ingredient.ingredient.charAt(0).toUpperCase() +
      ingredient.ingredient.slice(1).toLowerCase();

    const ingredientToSelect = document.createElement("li");
    ingredientToSelect.textContent = capitalizedIngredient;
    const existingOptions = ingredientsSelector.querySelectorAll("li");
    let optionExists = false;

    existingOptions.forEach((option) => {
      if (option.textContent === capitalizedIngredient) {
        optionExists = true;
        return;
      }
    });

    if (!optionExists) {
      ingredientsSelector.appendChild(ingredientToSelect);
    }
  });
});

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
