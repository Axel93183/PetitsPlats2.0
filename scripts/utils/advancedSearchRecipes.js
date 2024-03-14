console.log(recipesElements[1]);
console.log(recipes);
const inputsTagChoice = document.querySelectorAll(".tag-choice");

// Option Search Function
function optionsListSearch(query, ListUL) {
  const results = [];
  const OptionElementsLI = ListUL.querySelectorAll("li");

  for (let i = 0; i < OptionElementsLI.length; i++) {
    const optionElement = OptionElementsLI[i];

    if (optionElement.textContent.toLowerCase().includes(query.toLowerCase())) {
      results.push(optionElement);
    }
  }
  return results;
}

// Tag Search Start Function
function tagSearch(e) {
  const inputTagSearch = e.target;
  console.log(inputTagSearch);
  const query = inputTagSearch.value.trim().toLowerCase();

  const grandParent = inputTagSearch.parentNode.parentNode;
  const ListUL = grandParent.querySelector("ul");

  const tagsResults = optionsListSearch(query, ListUL);
  console.log(tagsResults);

  updateTagsList(tagsResults, ListUL);

  for (let j = 0; j < tagsResults.length; j++) {
    console.log(tagsResults[j].textContent);
  }
}

function updateTagsList(results, ListUL) {
  ListUL.innerHTML = "";
  for (let i = 0; i < results.length; i++) {
    ListUL.appendChild(results[i]);
  }
}

inputsTagChoice.forEach((input) => {
  input.addEventListener("input", tagSearch);
});
