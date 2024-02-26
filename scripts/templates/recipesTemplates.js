function getRecipeCardDom() {
  const article = document.createElement("article");
  article.className = "recipe-card";

  const imgDiv = document.createElement("div");
  imgDiv.className = "img";

  const img = document.createElement("img");
  img.src = "images/Recette01.jpg";
  img.alt = "verres de limonade avec leur paille";

  const timeDiv = document.createElement("div");
  timeDiv.className = "time";
  timeDiv.textContent = "10min";

  imgDiv.appendChild(img);
  imgDiv.appendChild(timeDiv);

  const recipeDiv = document.createElement("div");
  recipeDiv.className = "recipe";

  const recipeTitle = document.createElement("h3");
  recipeTitle.className = "recipe-title";
  recipeTitle.textContent = "Limonade de Coco";

  const recipeSubtitle = document.createElement("h4");
  recipeSubtitle.className = "recipe-subtitle";
  recipeSubtitle.textContent = "RECETTE";

  const recipeText = document.createElement("p");
  recipeText.className = "recipe-text";
  recipeText.textContent =
    "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée";

  const ingredientsSubtitle = document.createElement("h4");
  ingredientsSubtitle.className = "recipe-subtitle";
  ingredientsSubtitle.textContent = "INGRÉDIENTS";

  const ingredientsList = document.createElement("div");
  ingredientsList.className = "ingredients-list";

  const ingredientDiv = document.createElement("div");
  ingredientDiv.className = "ingredient";

  const ingredientName = document.createElement("p");
  ingredientName.className = "ingredient-name";
  ingredientName.textContent = "Lait de coco";

  const ingredientQuantity = document.createElement("p");
  ingredientQuantity.className = "ingredient-quantity";
  ingredientQuantity.textContent = "400ml";

  ingredientDiv.appendChild(ingredientName);
  ingredientDiv.appendChild(ingredientQuantity);
  ingredientsList.appendChild(ingredientDiv);

  recipeDiv.appendChild(recipeTitle);
  recipeDiv.appendChild(recipeSubtitle);
  recipeDiv.appendChild(recipeText);
  recipeDiv.appendChild(ingredientsSubtitle);
  recipeDiv.appendChild(ingredientsList);

  article.appendChild(imgDiv);
  article.appendChild(recipeDiv);

  document.getElementById("recipes-section").appendChild(article);
}

getRecipeCardDom();
