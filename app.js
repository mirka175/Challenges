const listSection = document.getElementById('cocktail-list');
const detailSection = document.getElementById('cocktail-detail');
const detailTitle = document.getElementById('detail-title');
const detailImg = document.getElementById('detail-img');
const ingredientsList = document.getElementById('ingredients-list');
const glassType = document.getElementById('glass-type');
const ingredientsThumbnails = document.getElementById('ingredients-thumbnails');

// Fetch cocktails from API
async function fetchCocktails() {
    try {
        const letters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g',
            'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u',
            'v', 'w', 'x', 'y', 'z'
        ];

        const fetchPromises = letters.map(letter =>
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`).then(res => res.json())
        );

        const results = await Promise.all(fetchPromises);
        const cocktails = results.flatMap(result => result.drinks || []);
        displayCocktails(cocktails);
    } catch (error) {
        console.error("Failed to fetch cocktails:", error);
        listSection.innerHTML = `
            <p class="text-center w-full col-span-full text-red-300 font-semibold">
                Sorry, we couldn't load the cocktails. Please try again later.
            </p>`;
    }
}

// Display cocktails
function displayCocktails(cocktails) {
    listSection.innerHTML = '';
    cocktails.forEach((cocktail) => {
        const card = document.createElement('div');
        card.className = 'bg-[#5c1d3b] p-4 rounded-lg text-center cursor-pointer hover:bg-[#7a2c54]';

        const imageUrl = cocktail.strDrinkThumb || 'https://via.placeholder.com/300x300?text=No+Image';

        card.innerHTML = `
            <img src="${imageUrl}" alt="${cocktail.strDrink}" class="rounded mb-2 w-full" />
            <p class="text-white font-medium">${cocktail.strDrink}</p>
        `;

        card.onclick = () => showDetails(cocktail);
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
