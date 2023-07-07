const foodArray = document.getElementById("foodArray"); 

const queryTextBox = document.getElementById("query");
queryTextBox.addEventListener("input", () => {
    searchDictionary['query'] = queryTextBox.value;
});


const includeTextBox = document.getElementById("includeIngredients");
includeTextBox.addEventListener("input", () => {
    searchDictionary['includeIngredients'] = includeTextBox.value;
});

const excludeTextBox = document.getElementById("excludeIngredients");
excludeTextBox.addEventListener("input", () => {
    searchDictionary['excludeIngredients'] = excludeTextBox.value;
});




const searchDictionary = { 
    'query': "",
    'includeIngredients': "",
    'excludeIngrdients': ""
}


const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {

    foodArray.textContent = "";
    const config = fetch('./config.json')
               .then(response => response.json())
               .then(config => {
                const apiKey = config.apiKey;
                fetchRecipes(apiKey);
               });
});




// Function to fetch recipes
async function fetchRecipes(apiKey) {
  try {
    
    
    searchDictionary['query'] == "" ? apiLink = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}` : 
    apiLink = `https://api.spoonacular.com/recipes/complexSearch?query=${searchDictionary['query']}&apiKey=${apiKey}`
    

    for (const [key, value] of Object.entries(searchDictionary)){
        if(value != "" && key != 'query'){
            apiLink += `&${key}=$${value}`;
        }
    }

    const response = await fetch(apiLink);
    
    if (!response.ok) {
      throw new Error('Error fetching recipes');
    }
    
    const data = await response.json();
    const recipes = data.results.forEach(element => {
        console.log(element);

        var foodURL = `https://spoonacular.com/recipes/${element.title.replace(/ /g, "-")}-${element.id}`
        var foodTitle = document.createElement("a"); 
        var foodDisplay = document.createElement("h3");
        foodTitle.href = foodURL; 
        foodTitle.textContent = element.title; 

        foodDisplay.appendChild(foodTitle);
        foodArray.appendChild(foodDisplay);

        foodArray.innerHTML += `<img src="${element.image}">`;
    });
    
  } catch (error) {
    console.log(error);
  }
}
