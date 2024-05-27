async function searchNutrients() {
    const food = document.getElementById('foodInput').value;
    const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY&ingr=${food}`);
    const data = await response.json();
    displayNutrients(data);
}

function displayNutrients(data) {
    const nutrientResults = document.getElementById('nutrientResults');
    nutrientResults.innerHTML = '';
    const nutrients = data.totalNutrients;

    for (let key in nutrients) {
        const nutrient = nutrients[key];
        nutrientResults.innerHTML += `<p>${nutrient.label}: ${nutrient.quantity} ${nutrient.unit}</p>`;
    }
}