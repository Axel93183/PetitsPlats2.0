const ingredientsSelector = document.getElementById("ingredients");
const applianceSelector = document.getElementById("appliance");
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

    const ingredientToSelect = document.createElement("option");
    ingredientToSelect.value = capitalizedIngredient;
    ingredientToSelect.textContent = capitalizedIngredient;

    const existingOptions = ingredientsSelector.querySelectorAll(
      `option[value="${capitalizedIngredient}"]`
    );

    let optionExists = false;

    existingOptions.forEach((option) => {
      if (option.value === capitalizedIngredient) {
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

  const applianceToSelect = document.createElement("option");
  applianceToSelect.value = appliance;
  applianceToSelect.textContent = appliance;

  const existingOptions = applianceSelector.querySelectorAll(
    `option[value="${appliance}"`
  );

  let optionExists = false;

  existingOptions.forEach((option) => {
    if (option.value === appliance) {
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

    const ustensilToSelect = document.createElement("option");
    ustensilToSelect.value = capitalizedUstensil;
    ustensilToSelect.textContent = capitalizedUstensil;

    const existingOptions = ustensilsSelector.querySelectorAll(
      `option[value="${capitalizedUstensil}"]`
    );

    let optionExists = false;

    existingOptions.forEach((option) => {
      if (option.value === capitalizedUstensil) {
        optionExists = true;
        return;
      }
    });

    if (!optionExists) {
      ustensilsSelector.appendChild(ustensilToSelect);
    }
  });
});
