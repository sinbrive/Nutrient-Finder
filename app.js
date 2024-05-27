async function searchNutrients() {
    const food = document.getElementById('foodInput').value;
    const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${food}`);
    console.log(`https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${food}`)
    const data = await response.json();
    displayNutrients(data);
}

function displayNutrients(data) {
    const nutrientResults = document.getElementById('nutrientResults');
    nutrientResults.innerHTML = '';
    const nutrients = data.totalNutrients;

    const selectedNutrients = {
        'ENERC_KCAL': 'Energy',
        'CHOCDF': 'Carbohydrates',
        'FIBTG': 'Fiber',
        'CA': 'Calcium',
        'PROCNT': 'Protein',
        'NA': 'Sodium',
        'K': 'Potassium',
        'P': 'Phosphorus',
        'MG': 'Magnesium',
        'CHOLE': 'Cholesterol',
        'SUGAR': 'Sugars'
    };

    let html = '<div class="nutrient-columns">';

    for (let key in nutrients) {
        if (selectedNutrients[key]) {
            const nutrient = nutrients[key];
            let roundedQuantity = parseFloat(nutrient.quantity);

            if (nutrient.unit === 'g') {
                roundedQuantity = roundedQuantity.toFixed(2); // Round to 2 decimal places for g
            } else if (nutrient.unit === 'mg') {
                roundedQuantity = Math.round(roundedQuantity); // Round to 0 decimal places for mg
            }

            html += `<div class="nutrient-item">
                        <div class="nutrient-label">${selectedNutrients[key]}:</div>
                        <div class="nutrient-quantity">${roundedQuantity} ${nutrient.unit}</div>
                     </div>`;
        }
    }

    html += '</div>';
    nutrientResults.innerHTML = html;
}
