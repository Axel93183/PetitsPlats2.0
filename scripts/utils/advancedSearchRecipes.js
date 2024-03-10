console.log(SelectElementsUL);
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
function tagSearch() {
  console.log(inputsTagChoice);

  for (let i = 0; i < inputsTagChoice.length; i++) {
    const inputTagSearch = inputsTagChoice[i];
    const query = inputTagSearch.value.trim().toLowerCase();

    const ListUL = SelectElementsUL[i];

    const tagsResults = optionsListSearch(query, ListUL);

    for (let j = 0; j < tagsResults.length; j++) {
      console.log(tagsResults[j].textContent);
      updateTagsList(tagsResults, ListUL);
    }
  }
}

function updateTagsList(results, ListUL) {
  ListUL.innerHTML = "";

  results.forEach(function (result) {
    ListUL.appendChild(result);
  });
}

inputsTagChoice.forEach((input) => {
  input.addEventListener("input", tagSearch);
});
