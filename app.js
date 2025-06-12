const listSection = document.getElementById('cocktail-list');
const detailSection = document.getElementById('cocktail-detail');
const detailTitle = document.getElementById('detail-title');
const detailImg = document.getElementById('detail-img');
const ingredientsList = document.getElementById('ingredients-list');
const glassType = document.getElementById('glass-type');
const ingredientsThumbnails = document.getElementById('ingredients-thumbnails');

// Fetch cocktails from the API
async function fetchCocktails() {
    const cocktails = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m');
    const data = await cocktails.json();
    displayCocktails(data.drinks);
}

// Display cocktails
function displayCocktails(drinks) {
    listSection.innerHTML = '';
    drinks.slice(0, 6).forEach((drink) => {
        const card = document.createElement('div');
        card.className = 'bg-[#5c1d3b] p-4 rounded-lg text-center cursor-pointer hover:bg-[#7a2c54]';

        const imageUrl = drink.strDrinkThumb || 'https://via.placeholder.com/300x300?text=No+Image';

        card.innerHTML = `
      <img src="${imageUrl}" alt="${drink.strDrink}" class="rounded mb-2 w-full" />
      <p class="text-white font-medium">${drink.strDrink}</p>
    `;

        card.onclick = () => showDetails(drink);
        listSection.appendChild(card);
    });
}

// Show cocktail detail
function showDetails(drink) {
    listSection.classList.add('hidden');
    detailSection.classList.remove('hidden');

    detailTitle.textContent = drink.strDrink;
    detailImg.src = drink.strDrinkThumb || 'https://via.placeholder.com/300x300?text=No+Image';
    detailImg.alt = drink.strDrink;

    glassType.textContent = drink.strGlass || 'N/A';
    ingredientsList.innerHTML = '';
    ingredientsThumbnails.innerHTML = '';

    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];

        if (ingredient) {
            const li = document.createElement('li');
            li.textContent = `${measure || ''} ${ingredient}`;
            ingredientsList.appendChild(li);

            const thumb = document.createElement('img');
            thumb.src = `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
            thumb.alt = ingredient;
            thumb.className = 'h-16';
            ingredientsThumbnails.appendChild(thumb);
        }
    }
}

// Back button to cocktail list
function backToList() {
    detailSection.classList.add('hidden');
    listSection.classList.remove('hidden');
}

// Load on page start
fetchCocktails();
