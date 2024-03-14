const ingredientsSelector = document.getElementById("ingredients");
const ingredientSearchInput = document.getElementById("ingredients-choice");
const appliancesSelector = document.getElementById("appliances");
const applianceSearchInput = document.getElementById("appliances-choice");
const ustensilsSelector = document.getElementById("ustensils");
const ustensilSearchInput = document.getElementById("ustensils-choice");

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

function getAllItems(recipeElements, key) {
  const allItems = new Set();
  recipeElements.forEach((recipe) => {
    const items = recipe[key];
    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (typeof item === "string") {
          allItems.add(item.toLowerCase());
        } else if (typeof item === "object" && "ingredient" in item) {
          allItems.add(item.ingredient.toLowerCase());
        }
      });
    } else {
      allItems.add(items);
    }
  });
  return allItems;
}

function filterItems(searchTerm, allItems) {
  const filteredItems = new Set();
  allItems.forEach((item) => {
    if (item.toLowerCase().includes(searchTerm.toLowerCase())) {
      filteredItems.add(item);
    }
  });
  return filteredItems;
}

function updateItemList(items, itemsSelector) {
  itemsSelector.innerHTML = "";
  items.forEach((item) => {
    const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
    const itemToSelect = document.createElement("li");
    itemToSelect.textContent = capitalizedItem;
    itemsSelector.appendChild(itemToSelect);
  });
}

function handleItemSearchInput(
  searchInput,
  allItems,
  updateItemListFunction,
  itemsSelector
) {
  const searchTerm = searchInput.value;
  const filteredItems = filterItems(searchTerm, allItems);
  updateItemListFunction(filteredItems, itemsSelector);
}

/* Ingredient Selector*/
const allIngredients = getAllItems(recipesElements, "ingredients");
updateItemList(allIngredients, ingredientsSelector);
ingredientSearchInput.addEventListener("input", () =>
  handleItemSearchInput(
    ingredientSearchInput,
    allIngredients,
    updateItemList,
    ingredientsSelector
  )
);

/* Appliance Selector */
const allAppliances = getAllItems(recipesElements, "appliance");
updateItemList(allAppliances, appliancesSelector);
applianceSearchInput.addEventListener("input", () =>
  handleItemSearchInput(
    applianceSearchInput,
    allAppliances,
    updateItemList,
    appliancesSelector
  )
);

/* Ustensils Selector */
const allUstensils = getAllItems(recipesElements, "ustensils");
updateItemList(allUstensils, ustensilsSelector);
ustensilSearchInput.addEventListener("input", () =>
  handleItemSearchInput(
    ustensilSearchInput,
    allUstensils,
    updateItemList,
    ustensilsSelector
  )
);

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
