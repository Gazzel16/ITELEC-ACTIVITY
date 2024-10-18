const apiKey = '8SR7KpXe6TpjFN8Qe0UyDg==nogA8jpzMVuI3VCa'; // API key
const uri = 'https://api.api-ninjas.com/v1/cats'; // API endpoint
const breedSelect = document.getElementById('breed-select');
const breedInfo = document.getElementById('breed-info');
const breedName = document.getElementById('breed-name');
const breedOrigin = document.getElementById('breed-origin');
const breedImage = document.getElementById('breed-image');
const breedDescription = document.getElementById('breed-description'); // Select breed description element

// List of cat breeds and manual image URLs
const catBreeds = [
    "Abyssinian", "American Shorthair", "Bengal", "Birman", 
    "British Shorthair", "Burmese", "Cornish Rex", "Devon Rex", 
    "Egyptian Mau", "Exotic Shorthair", "Maine Coon", "Manx", 
    "Norwegian Forest Cat", "Oriental Shorthair", "Persian", 
    "Ragdoll", "Russian Blue", "Scottish Fold", "Siamese", "Sphynx"
];

// Manually added cat breed images
const catImages = {
    "Abyssinian": "img/Abyssinian.jpg",
    "American Shorthair": "img/AmericanShortHair.jpg",
    "Birman": "img/Birman.jpg",
    "British Shorthair": "img/British Shorthair.jpg",
    "Burmese": "img/Burmese.jpg",
    "Bengal": "img/BengalKitten.jpg"
};

// Manually added descriptions for cat breeds
const catDescriptions = {
    "Abyssinian": "Abyssinians are known for their active, playful nature. They are very curious and enjoy climbing and exploring.",
    "American Shorthair": "The American Shorthair is a breed with a long history, known for its calm temperament and friendly disposition.",
    "Bengal": "Bengals have a wild appearance with large spots and rosettes. They are active, playful, and enjoy climbing.",
    "Birman": "Birmans are gentle, affectionate, and known for their beautiful blue eyes and silky coats.",
    "British Shorthair": "British Shorthairs are known for their dense coat and broad face. They are calm, easy-going, and affectionate.",
    "Burmese": "The Burmese are people-oriented cats, known for their affectionate nature and silky coats.",
    // Add more breed descriptions here
    "default": "Description not available for this breed." // Fallback description
};

// Populate the dropdown with cat breeds
function loadBreeds() {
    catBreeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed;
        breedSelect.appendChild(option);
    });
}

// Fetch and display details of the selected breed
function getCatInfo(breedName) {
    fetch(`${uri}?name=${breedName}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the API response to inspect the structure
        if (data.length > 0) {
            const breed = data[0];
            breedInfo.style.display = 'block';
            breedName.textContent = breed.name;
            breedOrigin.textContent = breed.origin || 'Unknown';

            // Use image from the API if available, otherwise from catImages
            const imageUrl = breed.image_url || catImages[breed.name] || 'img/placeholder.jpg';
            console.log('Image URL:', imageUrl); // Log the image URL
            breedImage.src = imageUrl;
            breedImage.style.display = 'block';
        } else {
            alert('No data found for this breed.');
            breedInfo.style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error: ', error.message);
    });

    // Use manual description or fallback
    const description = catDescriptions[breedName] || catDescriptions["default"];
    breedDescription.textContent = description; // Update description
}

// Event listener for dropdown selection
breedSelect.addEventListener('change', (event) => {
    const selectedBreed = event.target.value;
    if (selectedBreed) {
        getCatInfo(selectedBreed);
    } else {
        breedInfo.style.display = 'none';
    }
});

// Load the breeds when the page loads
window.onload = loadBreeds;
