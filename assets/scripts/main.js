// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);
let main = document.querySelector('main');
// Starts the program, all function calls trace back here
function init() {
	console.log("entered init()");//this is a test
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	// A9. TODO - Complete the functionality as described in this function
	//           header. It is possible in only a single line, but should
	//           be no more than a few lines.
	let myArray = [];
	let keys = Object.keys(localStorage);
	console.log(keys.length);
	for(let index = 0; index < keys.length; index += 1){
		//console.log("This is one element:"+localStorage.getItem(keys[index]));
		myArray.push(localStorage.getItem(keys[index]));

	}
	let fixedArray = JSON.parse(myArray);
	//console.log(fixedArray);
	return fixedArray;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// A10. TODO - Get a reference to the <main> element
	//let main = document.querySelector('main'); //&&& check here
	// A11. TODO - Loop through each of the recipes in the passed in array,
	//            create a <recipe-card> element for each one, and populate
	//            each <recipe-card> with that recipe data using element.data = ...
	//            Append each element to <main>
	//console.log(recipes);
	//console.log("This is the length of recipes:", recipes.length);
	for(let index = 0; index < recipes.length; index += 1){
		let current = document.createElement("recipe-card", { is: "recipe-card"});
		current.data = recipes[index];
		//console.log(recipes[index]);
		//console.log("This is current:", current);
		main.appendChild(current);
	}	// let expandingList = document.createElement("ul", { is: "expanding-list" });

}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1. TODO - Complete the functionality as described in this function
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.
	console.log(recipes.toString());
	localStorage.setItem('recipes', recipes.toString());
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2. TODO - Get a reference to the <form> element
	let form = document.getElementById("new-recipe");
	console.log("This is form:", form);
	// B3. TODO - Add an event listener for the 'submit' event, which fires when the
	//            submit button is clicked
	form.addEventListener('submit', (event) => {
		console.log('something was just submitted!');
		// Steps B4-B9 will occur inside the event listener from step B3
	// B4. TODO - Create a new FormData object from the <form> element reference above
		let formData = new FormData(form);
		for (let [key, value] of formData.entries()) {
            console.log(`Key: ${key}, Value: ${value}`);
        }

	// B5. TODO - Create an empty object (we'll refer to this object as recipeObject to
	//            make this easier to read), and then extract the keys and corresponding
	//            values from the FormData object and insert them into recipeObject
		let recipeObject = [];
		let keys = formData.keys(); // keys() returns an iterator
		for (let [key, value] of formData.entries()) {
            //console.log(`Key: ${key}, Value: ${value}`);
			recipeObject.push(`\"${key}\":\"${value}\"`);
        }
		console.log("Length of recipeObject:", recipeObject.length);

		//recipeObject.push("Plain text");
		console.log("this is our filled recipeObject:", recipeObject);
		
	// B6. TODO - Create a new <recipe-card> element
		let recipeCard = document.createElement("recipe-card");
	// B7. TODO - Add the recipeObject data to <recipe-card> using element.data
		recipeCard.data = recipeObject.data;
		console.log("recipieObject.data:", recipeObject);
	// B8. TODO - Append this new <recipe-card> to <main>
		main.appendChild(recipeCard);
		console.log("This is what we just appended to main:",recipeCard);
	// B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
	//            then save the recipes array back to localStorage
		let stringlist = localStorage.getItem('recipes');//this is grabbing that string [{}{}{}]
		
		let modifiedStr = stringlist.split(']')[0];
		console.log("What is the recipe Object:", recipeObject);
		let length = recipeObject.length;
		modifiedStr += ",{";
		for(let i = 0; i < length; i++){
			modifiedStr += recipeObject[i];
			if(i != length -1){
				modifiedStr += ",";
			}
		}
		modifiedStr += "}";
		//modifiedStr += recipeObject.toString();
		//console.log('This is list before the parse:',list);
		modifiedStr += "]";
		console.log(modifiedStr);
		// list = JSON.parse(list);
		// console.log("This is the length of the list:", list.length);
		// list.push(recipeObject);
		// console.log("This is our new list of recipes:", list);
		localStorage.setItem('recipes', modifiedStr);
		//saveRecipesToStorage(list);
	});
	
	// B10. TODO - Get a reference to the "Clear Local Storage" button
	let clearLocal = document.querySelector("button[class='danger']");//may also use .danger if you want to select by class
	// B11. TODO - Add a click event listener to clear local storage button
	clearLocal.addEventListener('click', (event) => {
		// Steps B12 & B13 will occur inside the event listener from step B11
		// B12. TODO - Clear the local storage
		localStorage.clear();
		// B13. TODO - Delete the contents of <main>
		main.clear();
	});
	
}
